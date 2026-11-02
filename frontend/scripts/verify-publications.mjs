import { readFileSync, existsSync, statSync } from "node:fs"
import { fileURLToPath } from "node:url"
import ts from "typescript"

// Only type imports are erased; the small registry has no runtime imports.
const source = readFileSync(new URL("../src/features/analysis/content/analyses.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { analyses, validateAnalyses } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`)
const publicRoot = new URL("../public/", import.meta.url)
validateAnalyses(analyses, (path) => {
  const file = fileURLToPath(new URL(path.slice(1), publicRoot))
  return existsSync(file) && statSync(file).isFile()
})
console.log(`Publication validation passed (${analyses.length} registered entries).`)
