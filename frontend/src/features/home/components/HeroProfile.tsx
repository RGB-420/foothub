import { ArrowRight, Mail } from "lucide-react"
import { profileContent } from "../content/profileContent"

export const HeroProfile = () => (
  <section aria-labelledby="introduction-title" className="border-b border-border">
    <div className="page-container grid items-center gap-10 py-10 sm:py-16 md:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div>
        <p className="section-label">{profileContent.name} · {profileContent.role}</p>
        <h1 id="introduction-title" className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[1.02] text-text sm:text-6xl lg:text-7xl">{profileContent.headline}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{profileContent.introduction}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button button-primary" href={profileContent.primaryAction.href}>{profileContent.primaryAction.label}<Mail size={18} aria-hidden="true" /></a>
          <a className="button button-secondary" href={profileContent.secondaryAction.href}>{profileContent.secondaryAction.label}<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="relative mx-auto w-full max-w-sm md:max-w-none">
        <img alt={`Retrato de ${profileContent.name}`} className="relative aspect-[4/5] w-full border border-border object-cover" src={profileContent.profileImage} width="400" height="500" fetchPriority="high" />
      </figure>
    </div>
  </section>
)
