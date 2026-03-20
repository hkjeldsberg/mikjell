export default function SiteFooter() {
  return (
    <footer className="bg-[var(--color-gray-dark)] px-6 py-10 text-[var(--color-white)]">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Bunnavigasjon" className="mb-6 flex flex-wrap gap-4">
          <a href="#spansk" className="text-sm underline hover:text-[var(--color-green)]">
            Spansktimer
          </a>
          <a href="#cosp" className="text-sm underline hover:text-[var(--color-green)]">
            COS-P kurs
          </a>
          <a href="#om" className="text-sm underline hover:text-[var(--color-green)]">
            Om meg
          </a>
          <a href="#kontakt" className="text-sm underline hover:text-[var(--color-green)]">
            Kontakt
          </a>
        </nav>

        <p className="mb-2 text-sm text-gray-400">
          Personopplysninger behandles i henhold til GDPR og slettes etter bruk.
        </p>
        <p className="text-sm text-gray-400">© 2026 [Navn]. Alle rettigheter forbeholdt.</p>
      </div>
    </footer>
  )
}
