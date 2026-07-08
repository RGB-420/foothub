import { HeroProfile } from "../components/HeroProfile"
import { ProfileSummary } from "../components/ProfileSummary"

export const HomePage = () => {
  return (
    <>
      <HeroProfile />
      <section className="border-t border-border bg-background/85" id="work">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="font-display text-base font-semibold uppercase tracking-[0.18em] text-cyan">
            Trabajos
          </p>
          <div className="mt-4 max-w-3xl border-l border-contrast pl-5">
            <p className="text-base font-medium leading-7 text-muted">
              Este espacio queda preparado para enlazar las primeras muestras cuando se
              acuerde su formato en la fase correspondiente.
            </p>
          </div>
        </div>
      </section>
      <ProfileSummary />
    </>
  )
}
