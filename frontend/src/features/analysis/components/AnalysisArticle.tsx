import { CaseStudySections, EvidenceFigure, Observation } from "./CaseStudySections"
import { Link } from "react-router-dom"
import type { Analysis } from "../types"
import { formatPublicationDate } from "../content/analyses"
import { profileContent } from "../../home/content/profileContent"

export const AnalysisArticle = ({ analysis }: { analysis: Analysis }) => (
  <article className={`editorial-article page-container py-10 sm:py-16${analysis.sections ? " case-study" : ""}`}>
    <Link className="editorial-link inline-flex min-h-11 items-center" to="/analisis">← Todos los análisis</Link>
    <header className="editorial-copy mt-6 border-b border-border pb-8">
      <p className="section-label">{analysis.type}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{analysis.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{analysis.summary}</p>
      <p className="mt-5 text-sm text-muted">
        {analysis.author} · <time dateTime={analysis.publishedAt}>{formatPublicationDate(analysis.publishedAt)}</time>
      </p>
      {analysis.objective && <div className="mt-6 leading-7"><h2 className="font-semibold">Objetivo del análisis</h2><p className="text-muted">{analysis.objective}</p></div>}
      <dl className="mt-6 space-y-4 leading-7">
        <div><dt className="font-semibold">Contexto futbolístico</dt><dd className="text-muted">{analysis.context}</dd></div>
        <div><dt className="font-semibold">Alcance de la observación</dt><dd className="text-muted">{analysis.scope}</dd></div>
      </dl>
    </header>

    {analysis.sections ? <CaseStudySections analysis={analysis} /> : <>
    {!!analysis.executiveFindings?.length && (
      <section className="editorial-section editorial-copy">
        <h2 className="section-heading">Conclusiones ejecutivas</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-muted">
          {analysis.executiveFindings.map((finding, index) => <li key={index}>{finding}</li>)}
        </ul>
      </section>
    )}

    {!!analysis.observations?.length && (
      <section className="editorial-section editorial-copy">
        <h2 className="section-heading">Lectura táctica</h2>
        {analysis.observations.map((item) => <div key={item.id} className="mt-6"><Observation item={item} analysis={analysis} /></div>)}
      </section>
    )}

    {!!analysis.evidence?.length && (
      <section className="editorial-section editorial-copy">
        <h2 className="section-heading">Evidencias</h2>
        {analysis.evidence.map((item, index) => <EvidenceFigure key={item.id} item={item} number={index + 1} />)}
      </section>
    )}

    </>}
    {analysis.methodology && (
      <section className="editorial-section editorial-copy">
        <h2 className="section-heading">Metodología</h2>
        <p className="mt-4 text-muted">{analysis.methodology}</p>
      </section>
    )}
    {analysis.limitations && (
      <section className="editorial-section editorial-copy">
        <h2 className="section-heading">Limitaciones</h2>
        <p className="mt-4 text-muted">{analysis.limitations}</p>
      </section>
    )}
    {!!analysis.assets?.filter((asset) => asset.kind === "image").length && (
      <section className="editorial-section editorial-copy">
        <h2 className="section-heading">Material del análisis</h2>
        <ul className="mt-4 space-y-3">
          {analysis.assets.filter((asset) => asset.kind === "image").map((asset) => (
            <li key={asset.href}>
              <a className="editorial-link inline-flex min-h-11 items-center" href={asset.href}>
                {asset.label} ({asset.kind.toUpperCase()})
              </a>
            </li>
          ))}
        </ul>
      </section>
    )}

    <footer className="editorial-section editorial-copy">
      <p className="font-semibold">Análisis de {analysis.author}</p>
      <p className="mt-3 text-muted">Para conversar sobre este trabajo o una posible colaboración:</p>
      <a className="editorial-link inline-flex min-h-11 items-center" href={`mailto:${profileContent.email}`}>{profileContent.email}</a>
    </footer>
  </article>
)
