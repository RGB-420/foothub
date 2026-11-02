const supportingBlocks = [
  {
    title: "Historia y táctica",
    description: "Estudio la evolución de las ideas de juego y me formo en análisis táctico.",
  },
  {
    title: "Ingeniería y análisis",
    description: "Formación en Ingeniería de Sistemas Aeroespaciales y experiencia desarrollando software.",
  },
  {
    title: "RGB 420",
    description: "Desarrollo herramientas propias para trabajar con vídeo, datos y análisis futbolístico.",
  },
]

export const ProfileSummary = () => (
  <section aria-labelledby="profile-title" id="profile" className="border-b border-border bg-surface">
    <div className="page-container py-12 sm:py-14">
      <p className="section-label">SOBRE MÍ</p>
      <div className="mt-3 grid items-start gap-5 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <h2 id="profile-title" className="font-display text-3xl font-semibold leading-tight text-text sm:text-4xl">Entender el juego desde sus raíces.</h2>
        <p className="border-l-2 border-primary pl-4 text-base leading-7 text-text">
          El fútbol me fascina como expresión de la sociedad, la estrategia y la cooperación. Me interesa comprender cómo han evolucionado sus ideas tácticas para interpretar mejor el juego actual.
        </p>
      </div>
      <ul className="author-context mt-6 grid gap-5 border-t border-border pt-6">
        {supportingBlocks.map(({ title, description }) => (
          <li key={title}>
            <div>
              <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
