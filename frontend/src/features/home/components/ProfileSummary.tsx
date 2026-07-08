import { Linkedin, Mail, MapPin } from "lucide-react"
import { profileContent } from "../content/profileContent"

export const ProfileSummary = () => {
  return (
    <section className="border-t border-border bg-surface/70" id="contact">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <p className="font-display text-base font-semibold uppercase tracking-[0.18em] text-cyan">
            Perfil
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-wide text-text">
            Claridad, juego y utilidad practica.
          </h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-4 text-base font-medium leading-7 text-muted">
            <p>{profileContent.profileText}</p>
            <p>{profileContent.professionalMessage}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-text">
                <MapPin className="text-primary" size={18} aria-hidden="true" />
                Base
              </div>
              <p className="mt-2 text-sm font-medium text-muted">
                {profileContent.baseLocation}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background/70 p-4">
              <div className="text-sm font-semibold text-text">Disponibilidad</div>
              <p className="mt-2 text-sm font-medium text-muted">
                {profileContent.availability}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              aria-label="Enviar correo"
              className="inline-flex items-center gap-2 rounded-md bg-contrast px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan hover:text-background"
              href={`mailto:${profileContent.email}`}
            >
              <Mail size={18} aria-hidden="true" />
              Correo
            </a>

            {profileContent.linkedInUrl ? (
              <a
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-text transition hover:border-cyan hover:text-cyan"
                href={profileContent.linkedInUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Linkedin size={18} aria-hidden="true" />
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
