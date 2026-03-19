import type { Service } from '@/data/types'

interface SpanishLessonsSectionProps {
  service: Service
}

export default function SpanishLessonsSection({ service }: SpanishLessonsSectionProps) {
  return (
    <section
      aria-labelledby="spansk-heading"
      className="bg-[var(--color-white)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="spansk-heading" className="mb-4 text-2xl font-bold md:text-3xl">
          {service.name}
        </h2>
        <p className="mb-6 text-[var(--color-gray)]">{service.description}</p>

        <div className="mb-8">
          <p className="mb-2 font-semibold">Passer for:</p>
          <ul className="list-inside list-disc space-y-1 text-[var(--color-gray)]">
            {service.targetAudience.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8 rounded-[var(--radius-lg)] bg-[var(--color-beige)] p-6">
          <p className="text-3xl font-bold text-[var(--color-green-dark)]">
            {service.price.amount} {service.price.unit}
          </p>
          {service.price.note && (
            <p className="mt-1 text-sm text-[var(--color-gray)]">{service.price.note}</p>
          )}
          <p className="mt-2 text-sm text-[var(--color-gray)]">{service.paymentNote}</p>
        </div>

        <a
          href={service.ctaHref}
          className="inline-block rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-8 py-4 font-semibold text-white transition-colors hover:bg-[var(--color-green)]"
        >
          {service.ctaLabel}
        </a>
      </div>
    </section>
  )
}
