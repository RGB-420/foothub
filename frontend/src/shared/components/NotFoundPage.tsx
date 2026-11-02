import { Link } from "react-router-dom"

export const NotFoundPage = ({ analysis = false }: { analysis?: boolean }) => (
  <div className="page-container py-16">
    <p className="section-label">Página no encontrada</p>
    <h1 className="section-heading mt-3">{analysis ? "Análisis no disponible" : "No encontramos esta página"}</h1>
    <p className="mt-4 max-w-xl leading-7 text-muted">{analysis ? "Este análisis no está publicado o el enlace no es correcto." : "Revisa la dirección o vuelve al portfolio de Raúl García Bejarano."}</p>
    <div className="mt-8 flex flex-wrap gap-3">
      <Link className="button button-primary" to="/analisis">Ver portfolio</Link>
      <Link className="button button-secondary" to="/">Volver al inicio</Link>
    </div>
  </div>
)
