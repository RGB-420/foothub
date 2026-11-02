import { methodologySteps, profileContent } from "../content/profileContent"

export const Methodology = () => (
  <section aria-labelledby="method-title" id="method" className="border-b border-border">
    <div className="page-container py-14 sm:py-20">
      <p className="section-label">Metodología</p>
      <h2 id="method-title" className="section-heading mt-3">Del partido a una lectura útil.</h2>
      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {methodologySteps.map((step, index) => (
          <li key={step.title} className="border-t border-border pt-4">
            <span aria-hidden="true" className="font-display text-4xl font-light text-primary">0{index + 1}</span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-text">{step.title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
      <aside aria-label="Tecnología de apoyo" className="mt-10 grid gap-4 border-l-2 border-primary bg-panel p-6 md:grid-cols-[10rem_1fr] md:gap-8">
        <div><p className="font-display text-2xl font-bold tracking-wide text-primary">RGB 420</p><p className="section-label mt-1">Tecnología propia</p></div>
        <p className="max-w-3xl text-sm leading-6 text-muted">{profileContent.technologyContext}</p>
      </aside>
    </div>
  </section>
)
