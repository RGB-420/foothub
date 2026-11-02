import { Link } from "react-router-dom"
import type { Analysis } from "../types"
import { formatPublicationDate } from "../content/analyses"

export const AnalysisEntry = ({ analysis }: { analysis: Analysis }) => (
  <article className="analysis-entry grid gap-5 border-y border-border py-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
    <div>
      {analysis.preview && <img className="mb-4 h-auto w-full" src={analysis.preview.src} alt={analysis.preview.alt} loading="lazy" />}
      <p className="section-label">{analysis.type}</p>
      <time className="mt-2 block text-sm text-muted" dateTime={analysis.publishedAt}>{formatPublicationDate(analysis.publishedAt)}</time>
    </div>
    <div>
      <h2 className="section-heading"><Link className="editorial-link" to={`/analisis/${analysis.slug}`}>{analysis.title}</Link></h2>
      <p className="mt-3 leading-7 text-muted">{analysis.summary}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{analysis.context}</p>
    </div>
  </article>
)
