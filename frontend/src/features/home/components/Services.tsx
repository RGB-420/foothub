import { ScanEye, Clapperboard, ChartNoAxesCombined } from "lucide-react"
import { analysisServices } from "../content/profileContent"

const serviceIcons = [ScanEye, Clapperboard, ChartNoAxesCombined]

export const Services = () => (
  <section aria-labelledby="services-title" id="services" className="border-b border-border bg-surface">
    <div className="page-container py-14 sm:py-20">
      <div className="services-heading">
        <p className="section-label">Servicios · Colaboración externa</p>
        <h2 id="services-title" className="section-heading mt-3">Una mirada externa para tu equipo.</h2>
      </div>
      <ul className="service-cards grid gap-4 md:grid-cols-3">
        {analysisServices.map((service, index) => {
          const Icon = serviceIcons[index]
          return (
          <li key={service.title}>
            <Icon size={28} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
            <h3 className="font-display font-semibold text-text">{service.title}</h3>
            <p className="text-sm leading-6 text-muted">{service.description}</p>
          </li>
          )
        })}
      </ul>
      <p className="services-note text-sm leading-6 text-muted">Cada colaboración se adapta a las necesidades del cuerpo técnico y al material disponible.</p>
    </div>
  </section>
)
