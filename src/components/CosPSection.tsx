import type { Service } from '@/data/types'

interface Props {
  service: Service
}

export default function CosPSection({ service }: Props) {
  return (
    <section
      id="cosp"
      aria-labelledby="cosp-heading"
      className="bg-[var(--color-beige)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="cosp-heading"
          className="mb-4 text-2xl font-bold text-[var(--color-gray-dark)] md:text-3xl"
        >
          COS-P — Circle of Security Parenting
        </h2>

        <p className="mb-8 text-lg text-[var(--color-gray)]">
          COS-P er et forskningsbasert foreldreveiledningsprogram som hjelper deg å forstå barnets
          følelsesmessige behov og styrke tilknytningen mellom dere.
        </p>

        {service.format && (
          <ul className="mb-8 space-y-2 text-[var(--color-gray)]">
            <li className="flex items-center gap-2">
              <span aria-hidden="true">•</span>
              {service.format.sessions} samlinger
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">•</span>
              {service.format.durationMinutes / 60} time per samling
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">•</span>
              Små grupper: {service.format.groupSize}
            </li>
          </ul>
        )}

        <p className="mb-8 text-3xl font-bold text-[var(--color-gray-dark)]">
          {service.price.amount.toLocaleString('nb-NO')} {service.price.unit}
        </p>

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