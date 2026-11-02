import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { readFileSync } from "node:fs"
const fixture = {
  slug: "w4-fixture", status: "published", publishedAt: "2026-10-13",
  title: "Synthetic layout fixture — not football analysis", summary: "Isolated presentation verification only. No match or tactical claims.",
  author: "Test fixture", type: "Layout test", context: "Synthetic image rectangles", scope: "Presentation only", objective: "Verify visual and editorial composition.", featured: true,
  preview: {src:"/analyses/w4-fixture/wide.svg", alt:"Synthetic wide rectangle labelled layout test"},
  evidence: [
    {id:"wide",label:"Wide layout fixture",caption:"Synthetic 1600 × 900 rectangle. No tactical evidence.",image:{src:"/analyses/w4-fixture/wide.svg",alt:"Synthetic navy rectangle with a centred layout test label"},source:"Generated test geometry",matchContext:"No match"},
    {id:"portrait",label:"Portrait layout fixture",caption:"Synthetic 600 × 800 rectangle.",image:{src:"/analyses/w4-fixture/portrait.svg",alt:"Synthetic portrait rectangle labelled layout test"}}
  ],
  observations:[{id:"test",title:"Presentation check",observation:"Test observation copy.",interpretation:"Test interpretation copy.",implications:"Test relevance copy.",evidenceIds:["wide"]}],
  sections:[
    {id:"selected",title:"Selected findings",blocks:[{kind:"findings",items:["Layout verification only."]},{kind:"evidence",evidenceId:"wide"},{kind:"observation",observationId:"test"}]},
    {id:"second",title:"Alternate aspect ratio",blocks:[{kind:"evidence",evidenceId:"portrait"},{kind:"text",text:"Short commentary after the image."}]}
  ], methodology:"Synthetic layout verification.",limitations:"Does not validate real editorial content or publication rights.",
  assets:[{kind:"pdf",label:"Excluded full-report fixture",href:"https://example.com/report.pdf"}]
}
// W4.2 fixtures stay outside the production registry/public tree.
fixture.evidence[0].image.width = 1600
fixture.evidence[0].image.height = 900
fixture.evidence[1].image.width = 600
fixture.evidence[1].image.height = 800
const legacy = {...fixture, slug:"legacy-fixture", featured:false, sections:undefined, preview:undefined,
  observations:structuredClone(fixture.observations),
  evidence:fixture.evidence.map(item => ({...item,image:{...item.image,src:item.image.src.replace("w4-fixture","legacy-fixture")}}))}
for (const item of [
  {id:"video",label:"Native video fixture",caption:"Synthetic moving test pattern, not tactical evidence.",video:{src:"/analyses/w4-fixture/clip.webm",title:"Synthetic test pattern",description:"Twelve-second media control test.",width:640,height:360,poster:"/analyses/w4-fixture/wide.svg",captions:{src:"/analyses/w4-fixture/captions.vtt",srcLang:"en",label:"English"}}},
  {id:"missing-image",label:"Missing image fixture",caption:"Caption survives failed image loading.",image:{src:"/analyses/w4-fixture/missing.svg",alt:"Unavailable synthetic geometry",width:600,height:800}},
  {id:"missing-video",label:"Missing video fixture",caption:"Caption survives missing video.",video:{src:"/analyses/w4-fixture/missing.webm",title:"Unavailable clip",description:"Missing-file test only.",width:640,height:360}},
  {id:"unsupported-video",label:"Unsupported media fixture",caption:"Invalid bytes in an allowed container extension.",video:{src:"/analyses/w4-fixture/unsupported.mp4",title:"Unsupported clip",description:"Decode-failure test only.",width:640,height:360}},
]) {
  fixture.evidence.push(item)
  fixture.sections.push({id:item.id,title:item.label,blocks:[{kind:"evidence",evidenceId:item.id}]})
}
fixture.observations[0].evidenceIds.push("video")
export default defineConfig({
  plugins:[react(),{name:"isolated-w4-fixture",enforce:"pre",load(id){
    if(id.replaceAll("\\", "/").endsWith("/features/analysis/content/analyses.ts")) {
      return readFileSync(id,"utf8").replace("export const analyses: Analysis[] = []",`export const analyses: Analysis[] = ${JSON.stringify([fixture, legacy])}`)
    }
  }}],
  publicDir:"scripts/fixtures/public", build:{outDir:"dist-fixture"},server:{host:"127.0.0.1",port:4174,strictPort:true}
})
