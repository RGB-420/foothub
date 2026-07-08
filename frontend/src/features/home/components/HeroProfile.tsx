import { ArrowRight, Mail } from "lucide-react"
import { profileContent } from "../content/profileContent"

export const HeroProfile = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pitch-markings" />

      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="font-display text-6xl font-bold uppercase leading-[0.88] tracking-wide text-[#F8FAFC] drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:text-7xl md:text-8xl">
                {profileContent.name}
              </h1>
              <p className="max-w-2xl text-xl font-semibold leading-8 text-[#E2E8F0] sm:text-2xl">
                {profileContent.shortMessage}
              </p>
              <p className="max-w-xl text-base font-medium leading-7 text-[#CBD5E1]">
                {profileContent.secondaryMessage}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-md bg-contrast px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.24)] transition hover:bg-cyan hover:text-background"
                href={profileContent.primaryAction.href}
              >
                {profileContent.primaryAction.label}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/80 px-5 py-3 text-sm font-semibold text-text transition hover:border-cyan hover:text-cyan"
                href={profileContent.secondaryAction.href}
              >
                <Mail size={18} aria-hidden="true" />
                {profileContent.secondaryAction.label}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden rounded-xl border border-border bg-panel p-3 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
              <img
                alt={`Foto de ${profileContent.name}`}
                className="aspect-[4/5] w-full rounded-lg object-cover"
                src={profileContent.profileImage}
              />
            </div>

            <div className="field-panel relative overflow-hidden rounded-xl border border-border p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/80 to-transparent" />
              <div className="space-y-5">
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                    Lectura de partido
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-6 text-[#F8FAFC]">
                    Informacion util para preparar mejor.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border-l border-primary/70 pl-3">
                    <p className="font-display text-2xl font-bold text-[#F8FAFC]">01</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
                      Rival
                    </p>
                  </div>
                  <div className="border-l border-cyan/70 pl-3">
                    <p className="font-display text-2xl font-bold text-[#F8FAFC]">02</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
                      Claves
                    </p>
                  </div>
                </div>

                <div className="rounded-md border border-border/90 bg-background/70 p-4">
                  <p className="text-sm font-medium leading-6 text-[#E2E8F0]">
                    {profileContent.availability}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
