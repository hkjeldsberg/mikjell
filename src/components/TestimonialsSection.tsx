import type { Testimonial } from '@/data/types'

interface Props {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: Props) {
  if (testimonials.length < 2) {
    throw new Error('TestimonialsSection requires at least 2 testimonials')
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-[var(--color-white)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="testimonials-heading"
          className="mb-10 text-2xl font-bold text-[var(--color-gray-dark)] md:text-3xl"
        >
          Hva sier andre?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="rounded-[var(--radius-lg)] border border-gray-100 bg-[var(--color-beige)] p-6"
            >
              <blockquote className="mb-4">
                <p className="text-[var(--color-gray)] italic">"{t.quote}"</p>
              </blockquote>
              <figcaption>
                <cite className="not-italic text-sm font-semibold text-[var(--color-gray-dark)]">
                  — {t.role}
                </cite>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
