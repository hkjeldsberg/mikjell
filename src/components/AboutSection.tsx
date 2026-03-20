export default function AboutSection() {
  return (
    <section
      id="om"
      aria-labelledby="om-heading"
      className="bg-[var(--color-white)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="om-heading"
          className="mb-6 text-2xl font-bold text-[var(--color-gray-dark)] md:text-3xl"
        >
          Om meg
        </h2>

        <p className="mb-4 text-lg text-[var(--color-gray)]">
          Jeg er sosionom med erfaring fra psykisk helsevern og arbeid med barn og familier.
        </p>
        <p className="mb-4 text-lg text-[var(--color-gray)]">
          Jeg er lidenskapelig opptatt av tilknytning, utvikling og å skape trygge rammer — enten
          det er i undervisning eller veiledning.
        </p>
        <p className="mb-8 text-lg text-[var(--color-gray)]">
          Til daglig snakker jeg spansk flytende og underviser gjerne deg som vil lære.
        </p>

        <ul className="mb-10 space-y-2 text-[var(--color-gray)]">
          <li className="flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            Sosionom med videreutdanning
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            Erfaring fra psykisk helsevern og barnearbeid
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            Flytende spansk
          </li>
        </ul>

        <a
          href="#kontakt"
          className="inline-block rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-8 py-4 font-semibold text-white transition-colors hover:bg-[var(--color-green)]"
        >
          Kontakt meg
        </a>
      </div>
    </section>
  )
}
