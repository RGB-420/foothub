import { Linkedin, Mail } from "lucide-react"
import { profileContent } from "../content/profileContent"

export const Contact = () => (
  <section aria-labelledby="contact-title" id="contact" className="bg-background">
    <div className="page-container grid gap-6 py-14 sm:py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-10">
      <div>
        <p className="section-label">Contacto</p>
        <h2 id="contact-title" className="mt-3 font-display text-5xl font-semibold leading-tight text-text sm:text-6xl">¿Hablamos de fútbol?</h2>
      </div>
      <div>
        <p className="max-w-xl text-base leading-7 text-muted">
          Si buscas apoyo externo para analizar un rival, estudiar a tu equipo o preparar un partido, estaré encantado de conocer tu proyecto.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">{profileContent.availability}.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {profileContent.emailEnabled ? <a className="button button-primary max-w-full" href={`mailto:${profileContent.email}`}>
            <Mail size={18} className="shrink-0" aria-hidden="true" />
            <span className="break-all">{profileContent.email}</span>
          </a> : <span className="inline-flex min-h-11 max-w-full items-center gap-2 border border-primary bg-primary px-6 py-3 text-sm font-semibold text-background">
            <Mail size={18} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-all">{profileContent.email}</span>
          </span>}
          {profileContent.linkedInUrl ? (
            <a className="button button-secondary" href={profileContent.linkedInUrl} rel="noopener noreferrer" target="_blank" aria-label="LinkedIn de Raúl García Bejarano (se abre en una pestaña nueva)">
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </div>
  </section>
)
