export default function PracticalInfo() {
  return (
    <section
      id="praktisk"
      aria-labelledby="praktisk-heading"
      className="bg-[var(--color-beige)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="praktisk-heading"
          className="mb-8 text-2xl font-bold text-[var(--color-gray-dark)] md:text-3xl"
        >
          Praktisk informasjon
        </h2>

        <dl className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="min-w-48 font-semibold text-[var(--color-gray-dark)]">
              Undervisningsform
            </dt>
            <dd className="text-[var(--color-gray)]">Online via video</dd>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="min-w-48 font-semibold text-[var(--color-gray-dark)]">Språk</dt>
            <dd className="text-[var(--color-gray)]">Norsk (bokmål)</dd>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="min-w-48 font-semibold text-[var(--color-gray-dark)]">Kontakt</dt>
            <dd className="text-[var(--color-gray)]">
              <a href="mailto:hei@eksempel.no" className="underline hover:text-[var(--color-gray-dark)]">
                hei@eksempel.no
              </a>
            </dd>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="min-w-48 font-semibold text-[var(--color-gray-dark)]">Betaling</dt>
            <dd className="text-[var(--color-gray)]">Vipps (spansktimer) / Faktura via Fiken (COS-P)</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
