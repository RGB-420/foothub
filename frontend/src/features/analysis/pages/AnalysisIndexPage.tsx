import { Link } from "react-router-dom"
import { publishedAnalyses } from "../content/analyses"
import { AnalysisEntry } from "../components/AnalysisEntry"
import { profileContent } from "../../home/content/profileContent"

export const AnalysisIndexPage = () => (
  <div className="page-container py-10 sm:py-16">
    <header className="max-w-2xl">
      <p className="section-label">Portfolio · {profileContent.name}</p>
      <h1 className="section-heading mt-3">Análisis de fútbol</h1>
      <p className="mt-4 leading-7 text-muted">Lecturas tácticas con contexto, observaciones y evidencias para entender el juego.</p>
    </header>
    <div className="mt-8">
      {publishedAnalyses.length ? publishedAnalyses.map((analysis) => <AnalysisEntry key={analysis.slug} analysis={analysis} />) : (
        <section aria-labelledby="publication-status" className="border-y border-border py-8">
          <h2 id="publication-status" className="text-lg font-medium">Todavía no hay análisis publicados</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted">El primer trabajo aparecerá aquí cuando esté listo para compartir, con su contexto y las evidencias que sostienen su lectura táctica.</p>
        </section>
      )}
    </div>
    <Link className="button button-secondary mt-8" to="/">Volver al inicio</Link>
  </div>
)
