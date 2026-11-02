import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import ts from "typescript"

const source = readFileSync(new URL("../src/features/analysis/content/analyses.ts", import.meta.url), "utf8")
const load = async (text) => {
  const { outputText } = ts.transpileModule(text, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`)
}
const { validateAnalyses } = await load(source)
// Isolated synthetic data; never registered or served by the public application.
const fixture = {
  slug: "fixture-report", status: "published", publishedAt: "2024-02-29",
  title: "Test fixture", summary: "Test only", author: "Test author", type: "Test",
  context: "Test context", scope: "Test scope", featured: true,
  preview: { src: "/analyses/fixture-report/preview.png", alt: "Test image" },
  evidence: [{ id: "one", label: "Test evidence", caption: "Test caption", href: "https://example.com/evidence" }],
  observations: [{ id: "one", title: "Test observation", observation: "Test text", evidenceIds: ["one"] }],
  assets: [{ kind: "pdf", label: "Test asset", href: "/analyses/fixture-report/report.pdf" }],
}
let checks = 0
const reject = (change, message) => {
  const entry = structuredClone(fixture)
  change(entry)
  assert.throws(() => validateAnalyses([entry]), message)
  checks++
}
validateAnalyses([])
validateAnalyses([fixture], () => true)
checks += 2
assert.throws(() => validateAnalyses([fixture, fixture]), /slug must be unique/)
assert.throws(() => validateAnalyses([fixture], () => false), /missing public file/)
checks += 2
assert.throws(() => validateAnalyses([fixture, { ...fixture, slug: "another-report", preview: undefined, assets: undefined }]), /Only one published analysis may be featured/)
checks++
for (const slug of ["Bad Slug", "../report", "report%20", "report--one", "report/one"]) reject((e) => { e.slug = slug }, /slug must use/)
for (const date of ["2023-02-29", "2024-04-31", "2024-13-01", "2024-1-1", "invalid"]) reject((e) => { e.publishedAt = date }, /real calendar date/)
for (const field of ["title", "summary", "author", "type", "context", "scope"]) reject((e) => { e[field] = "  " }, /must be non-empty/)
reject((e) => { e.status = "ready" }, /status must be/)
reject((e) => { e.evidence.push(e.evidence[0]) }, /evidence\[1\].id/)
reject((e) => { e.observations[0].evidenceIds = ["missing"] }, /unknown evidence ID/)
reject((e) => { e.observations[0].evidenceIds = ["one", "one"] }, /duplicate references/)
reject((e) => { e.observations.push(e.observations[0]) }, /observations\[1\].id/)
reject((e) => { e.preview.alt = "" }, /preview.alt/)
reject((e) => { e.preview.src = "https://example.com/image.png" }, /preview.src must be a safe/)
for (const path of ["//evil.test/a", "javascript:alert(1)", "/analyses/fixture-report/../secret.pdf", "/analyses/fixture-report/%2e%2e/secret.pdf", "/analyses/fixture-report/a.pdf?query", "/analyses/other/a.pdf", "/analyses/fixture-report/a\\b.pdf", "https://user:pass@example.com/a"]) {
  reject((e) => { e.assets[0].href = path }, /must be a safe/)
}
const draft = { ...fixture, slug: "draft-report", status: "draft", preview: undefined, assets: undefined }
const older = { ...fixture, slug: "older-report", publishedAt: "2023-01-01", featured: false, preview: undefined, assets: undefined }
const injected = await load(source.replace("export const analyses: Analysis[] = []", `export const analyses: Analysis[] = ${JSON.stringify([draft, older, fixture])}`))
assert.deepEqual(injected.publishedAnalyses.map((e) => e.slug), ["fixture-report", "older-report"])
assert.equal(injected.featuredAnalysis.slug, "fixture-report")
const draftsOnly = await load(source.replace("export const analyses: Analysis[] = []", `export const analyses: Analysis[] = ${JSON.stringify([draft])}`))
assert.equal(draftsOnly.publishedAnalyses.length, 0)
assert.equal(draftsOnly.featuredAnalysis, undefined)
checks += 4
console.log(`Publication fixture checks passed (${checks} assertions). No registry content changed.`)

const ordered = structuredClone(fixture)
ordered.sections = [{ id: "selected", title: "Selected evidence", blocks: [
  { kind: "evidence", evidenceId: "one" }, { kind: "observation", observationId: "one" },
  { kind: "text", text: "Test commentary" }, { kind: "findings", items: ["Test finding"] },
] }]
validateAnalyses([ordered])
let sectionChecks = 1
for (const change of [
  e => { e.sections = [] },
  e => { e.sections[0].blocks = [] },
  e => { e.sections[0].blocks[0].evidenceId = "missing" },
  e => { e.sections[0].blocks[1].observationId = "missing" },
  e => { e.sections[0].blocks.push(e.sections[0].blocks[0]) },
  e => { e.sections.push(e.sections[0]) },
  e => { e.sections[0].blocks[2].text = " " },
  e => { e.sections[0].blocks[3].items = [] },
  e => { e.sections[0].blocks[0].kind = "video" },
  e => { e.objective = " " },
  e => { e.evidence[0].source = " " },
  e => { e.evidence[0].matchContext = " " },
]) {
  const invalid = structuredClone(ordered)
  change(invalid)
  assert.throws(() => validateAnalyses([invalid]), /Publication validation failed/)
  sectionChecks++
}
console.log(`W4 editorial validation passed (${sectionChecks} additional assertions).`)

const media = structuredClone(ordered)
media.evidence[0].video = {
  src: "/analyses/fixture-report/clip.mp4", title: "Fixture clip", description: "Test geometry only",
  width: 640, height: 360, poster: "/analyses/fixture-report/poster.svg",
  captions: { src: "/analyses/fixture-report/captions.vtt", srcLang: "es", label: "Español" },
}
const visited = []
validateAnalyses([media], path => { visited.push(path); return true })
for (const name of ["clip.mp4", "poster.svg", "captions.vtt"]) assert(visited.some(path => path.endsWith(name)))
let mediaChecks = 4
for (const change of [
  e => { e.evidence[0].video.src = "/analyses/fixture-report/clip.mov" },
  e => { e.evidence[0].video.src = "https://example.com/clip.mp4" },
  e => { e.evidence[0].video.src = "/analyses/fixture-report/../clip.mp4" },
  e => { e.evidence[0].video.src = "/analyses/other/clip.mp4" },
  e => { e.evidence[0].video.title = " " },
  e => { e.evidence[0].video.description = "" },
  e => { e.evidence[0].video.poster = "/analyses/fixture-report/poster.pdf" },
  e => { e.evidence[0].video.captions.src = "/analyses/fixture-report/captions.srt" },
  e => { e.evidence[0].video.captions.srcLang = "" },
  e => { e.evidence[0].video.captions.label = "" },
  e => { e.evidence[0].video.height = undefined },
  e => { e.evidence[0].video.width = -1 },
  e => { e.evidence[0].image = {src:"/analyses/fixture-report/image.png",alt:"Test"} },
  e => { delete e.evidence[0].video; e.evidence[0].image = {src:"/analyses/fixture-report/image.png",alt:"Test",width:640} },
]) {
  const invalid = structuredClone(media)
  change(invalid)
  assert.throws(() => validateAnalyses([invalid]), /Publication validation failed/)
  mediaChecks++
}
for (const filename of ["clip.mp4", "poster.svg", "captions.vtt"]) {
  assert.throws(() => validateAnalyses([media], path => !path.endsWith(filename)), /missing public file/)
  mediaChecks++
}
const webm = structuredClone(media)
webm.evidence[0].video = {src:"/analyses/fixture-report/clip.webm",title:"Test",description:"Test"}
validateAnalyses([webm])
mediaChecks++
console.log(`W4.2 media validation passed (${mediaChecks} additional assertions).`)
