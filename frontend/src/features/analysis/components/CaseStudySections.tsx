import { Link } from "react-router-dom"
import { useState } from "react"
import type { Analysis } from "../types"

type Evidence = NonNullable<Analysis["evidence"]>[number]

const EvidenceMedia = ({ item }: { item: Evidence }) => {
  const [failed, setFailed] = useState(false)
  const media = item.video ?? item.image
  if (!media) return null
  const style = media.width && media.height ? { aspectRatio: `${media.width} / ${media.height}` } : undefined
  if (failed) return <div className="evidence-unavailable" style={style} role="status">
    <p>{item.video ? "Vídeo no disponible o formato no compatible." : "Imagen no disponible."}</p>
    <p className="text-muted">{item.video?.description ?? item.image?.alt}</p>
  </div>
  if (item.video) return <>
    <video className="evidence-image evidence-video" controls preload="none" playsInline
      width={item.video.width} height={item.video.height} style={style}
      src={item.video.src} poster={item.video.poster} aria-label={item.video.title}
      aria-describedby={`description-${item.id} caption-${item.id}`} onError={() => setFailed(true)}>
      {item.video.captions && <track kind="captions" src={item.video.captions.src}
        srcLang={item.video.captions.srcLang} label={item.video.captions.label} default />}
      Tu navegador no admite vídeo HTML5.
    </video>
    <p id={`description-${item.id}`} className="editorial-copy mt-3 text-muted">{item.video.description}</p>
  </>
  return <img className="evidence-image" loading="lazy" src={item.image!.src} alt={item.image!.alt}
    width={item.image!.width} height={item.image!.height} style={style} onError={() => setFailed(true)} />
}

export const EvidenceFigure = ({ item, number }: { item: NonNullable<Analysis["evidence"]>[number]; number: number }) => (
  <figure id={`evidence-${item.id}`} className="evidence-figure scroll-mt-40" aria-labelledby={`caption-${item.id}`}>
    <EvidenceMedia key={JSON.stringify([item.id, item.image, item.video])} item={item} />
    <figcaption id={`caption-${item.id}`} className="editorial-copy mt-4 text-muted">
      <p className="font-semibold text-text">Figura {number} · {item.label}</p>
      <p className="mt-1">{item.caption}</p>
      {item.matchContext && <p className="mt-2 text-sm">Contexto: {item.matchContext}</p>}
      {item.source && <p className="mt-1 text-sm">Fuente: {item.source}</p>}
      {item.href && <a className="editorial-link inline-flex min-h-11 items-center" href={item.href}>Consultar fuente de la figura {number}</a>}
    </figcaption>
  </figure>
)

export const Observation = ({ item, analysis }: { item: NonNullable<Analysis["observations"]>[number]; analysis: Analysis }) => (
  <div className="editorial-copy">
    <h3 className="text-xl font-semibold">{item.title}</h3>
    <dl className="mt-4 space-y-4">
      <div><dt className="font-semibold">Observación</dt><dd className="text-muted">{item.observation}</dd></div>
      {item.interpretation && <div><dt className="font-semibold">Interpretación</dt><dd className="text-muted">{item.interpretation}</dd></div>}
      {item.implications && <div><dt className="font-semibold">Relevancia práctica</dt><dd className="text-muted">{item.implications}</dd></div>}
    </dl>
    {item.evidenceIds?.map((id) => <Link key={id} className="editorial-link mr-4 inline-flex min-h-11 items-center" to={`#evidence-${id}`}>Ver evidencia: {analysis.evidence?.find((evidence) => evidence.id === id)?.label}</Link>)}
  </div>
)

export const CaseStudySections = ({ analysis }: { analysis: Analysis }) => {
  const figureOrder = analysis.sections?.flatMap((section) =>
    section.blocks.flatMap((block) => block.kind === "evidence" ? [block.evidenceId] : [])) ?? []
  return (
  <>
    {analysis.sections?.map((section) => (
      <section key={section.id} className="editorial-section case-study-section">
        <h2 className="section-heading editorial-copy">{section.title}</h2>
        {section.blocks.map((block, index) => {
          switch (block.kind) {
            case "text": return <p key={index} className="editorial-copy text-muted whitespace-pre-line">{block.text}</p>
            case "findings": return <ul key={index} className="editorial-copy list-disc space-y-3 pl-5 text-muted">{block.items.map((text, i) => <li key={i}>{text}</li>)}</ul>
            case "observation": {
              const item = analysis.observations?.find((item) => item.id === block.observationId)
              return item ? <Observation key={index} item={item} analysis={analysis} /> : null
            }
            case "evidence": {
              const item = analysis.evidence?.find((item) => item.id === block.evidenceId)
              return item ? <EvidenceFigure key={index} item={item} number={figureOrder.indexOf(block.evidenceId) + 1} /> : null
            }
          }
        })}
      </section>
    ))}
  </>
)
}
