interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaSpanish: { label: string; href: string }
  ctaCosP: { label: string; href: string }
}

export default function HeroSection({
  headline,
  subheadline,
  ctaSpanish,
  ctaCosP,
}: HeroSectionProps) {
  return (
    <section
      aria-label="Introduksjon"
      className="bg-[var(--color-beige)] px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">{headline}</h1>
        <p className="mb-10 text-lg text-[var(--color-gray)] md:text-xl">{subheadline}</p>

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <a
            href={ctaSpanish.href}
            className="w-full rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-[var(--color-green)] md:w-auto"
          >
            {ctaSpanish.label}
          </a>
          <a
            href={ctaCosP.href}
            className="w-full rounded-[var(--radius-md)] border-2 border-[var(--color-green-dark)] px-8 py-4 text-center font-semibold text-[var(--color-green-dark)] transition-colors hover:bg-[var(--color-green)] hover:text-white md:w-auto"
          >
            {ctaCosP.label}
          </a>
        </div>
      </div>
    </section>
  )
}
