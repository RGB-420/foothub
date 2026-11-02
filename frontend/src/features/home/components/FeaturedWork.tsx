import { Link } from "react-router-dom"
import { featuredAnalysis } from "../../analysis/content/analyses"
import { AnalysisEntry } from "../../analysis/components/AnalysisEntry"

export const FeaturedWork = () => (
  <section aria-labelledby="work-title" id="work" className="border-b border-border">
    <div className="page-container py-8 sm:py-10">
      <p className="section-label">Trabajos</p>
      <h2 id="work-title" className="section-heading mt-2">Análisis destacado</h2>
      {featuredAnalysis ? <div className="mt-6"><AnalysisEntry analysis={featuredAnalysis} /></div> : <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div className="flex min-h-36 flex-col justify-center border-y border-border bg-surface px-5 py-6">
          <p className="text-lg font-medium text-text">Sin muestra publicada</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            El primer análisis aparecerá aquí cuando esté listo para compartir.
          </p>
        </div>
        <div>
          <p className="max-w-lg text-base leading-7 text-muted">
            Cada trabajo se presentará con su contexto, su lectura táctica y las
            evidencias que la sostienen.
          </p>
          <dl className="mt-4 space-y-3 text-sm leading-6">
            <div>
              <dt className="font-semibold text-text">Contexto</dt>
              <dd className="text-muted">Qué partido observo y qué pregunta guía el análisis.</dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Lectura táctica</dt>
              <dd className="text-muted">Qué comportamientos identifico y cómo los interpreto.</dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Evidencias</dt>
              <dd className="text-muted">Imágenes o secuencias del partido que apoyan las conclusiones.</dd>
            </div>
          </dl>
        </div>
      </div>}
      <Link className="editorial-link mt-5 inline-flex min-h-11 items-center" to="/analisis">Ver portfolio de análisis →</Link>
    </div>
  </section>
)
