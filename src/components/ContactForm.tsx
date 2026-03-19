'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { ServiceInterest } from '@/data/types'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  name?: string
  email?: string
  interest?: string
}

export default function ContactForm() {
  const searchParams = useSearchParams()
  const [interest, setInterest] = useState<ServiceInterest>('Spansktimer')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [gdprConsent, setGdprConsent] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  // T018 — URL param pre-selection
  useEffect(() => {
    const param = searchParams.get('interest')
    if (param === 'cosp') setInterest('COS-P kurs')
    else setInterest('Spansktimer')
  }, [searchParams])

  // Focus success message for screen readers
  useEffect(() => {
    if (formState === 'success') successRef.current?.focus()
  }, [formState])

  function validate(data: FormData): FieldErrors {
    const errs: FieldErrors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const selectedInterest = String(data.get('interest') ?? '').trim()

    if (!name) errs.name = 'Navn er påkrevd'
    else if (name.length > 100) errs.name = 'Navn kan ikke være lengre enn 100 tegn'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) errs.email = 'E-postadresse er påkrevd'
    else if (!emailRegex.test(email)) errs.email = 'Ugyldig e-postadresse'
    else if (email.length > 254) errs.email = 'E-postadressen er for lang'

    if (!selectedInterest) errs.interest = 'Velg et alternativ'

    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const errs = validate(data)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setFormState('submitting')

    // T024 — Web3Forms integration
    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
        name: data.get('name'),
        email: data.get('email'),
        interest: data.get('interest'),
        message: data.get('message') ?? '',
        gdpr_consent: true,
        subject: `Ny henvendelse: ${data.get('interest')}`,
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (json.success) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <section
        id="kontakt"
        aria-labelledby="kontakt-heading"
        className="bg-[var(--color-beige)] px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-xl text-center">
          <div
            ref={successRef}
            role="status"
            aria-live="polite"
            tabIndex={-1}
            className="rounded-[var(--radius-lg)] bg-[var(--color-white)] p-10 shadow-sm"
          >
            <p className="mb-2 text-4xl">✓</p>
            <h2 className="mb-4 text-2xl font-bold">Takk for din henvendelse!</h2>
            <p className="text-[var(--color-gray)]">Vi tar kontakt med deg snart.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="bg-[var(--color-beige)] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-xl">
        <h2 id="kontakt-heading" className="mb-2 text-2xl font-bold md:text-3xl">
          Ta kontakt
        </h2>
        <p className="mb-8 text-[var(--color-gray)]">
          Fyll ut skjemaet, så hører du fra oss innen kort tid.
        </p>

        {/* T034 — No-JS mailto fallback */}
        <noscript>
          <p className="mb-6 rounded-[var(--radius-md)] bg-[var(--color-white)] p-4 text-[var(--color-gray)]">
            JavaScript er deaktivert. Send e-post direkte til{' '}
            <a href="mailto:hei@eksempel.no" className="underline">
              hei@eksempel.no
            </a>
          </p>
        </noscript>

        {formState === 'error' && (
          <div role="alert" className="mb-6 rounded-[var(--radius-md)] bg-red-50 p-4 text-red-700">
            Noe gikk galt. Prøv igjen eller send e-post direkte til{' '}
            <a href="mailto:hei@eksempel.no" className="underline">
              hei@eksempel.no
            </a>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Navn <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
              className="w-full rounded-[var(--radius-md)] border border-gray-300 px-4 py-3 focus:border-[var(--color-green-dark)] focus:outline-none"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              E-post <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              className="w-full rounded-[var(--radius-md)] border border-gray-300 px-4 py-3 focus:border-[var(--color-green-dark)] focus:outline-none"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Interest */}
          <div>
            <label htmlFor="interest" className="mb-1 block font-medium">
              Jeg er interessert i <span aria-hidden="true">*</span>
            </label>
            <select
              id="interest"
              name="interest"
              required
              value={interest}
              onChange={(e) => setInterest(e.target.value as ServiceInterest)}
              aria-describedby={errors.interest ? 'interest-error' : undefined}
              aria-invalid={!!errors.interest}
              className="w-full rounded-[var(--radius-md)] border border-gray-300 bg-white px-4 py-3 focus:border-[var(--color-green-dark)] focus:outline-none"
            >
              <option value="Spansktimer">Spansktimer</option>
              <option value="COS-P kurs">COS-P kurs</option>
            </select>
            {errors.interest && (
              <p id="interest-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.interest}
              </p>
            )}
          </div>

          {/* Message — T021 */}
          <div>
            <label htmlFor="message" className="mb-1 block font-medium">
              Melding <span className="font-normal text-[var(--color-gray)]">(valgfritt)</span>
            </label>
            <textarea
              id="message"
              name="message"
              maxLength={1000}
              rows={4}
              className="w-full rounded-[var(--radius-md)] border border-gray-300 px-4 py-3 focus:border-[var(--color-green-dark)] focus:outline-none"
            />
          </div>

          {/* GDPR consent — T022 */}
          <div className="flex items-start gap-3">
            <input
              id="gdprConsent"
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded accent-[var(--color-green-dark)]"
            />
            <label htmlFor="gdprConsent" className="text-sm text-[var(--color-gray)]">
              Jeg godtar at informasjonen min brukes til å besvare henvendelsen min. Ingen
              personopplysninger lagres uten samtykke, og data slettes etter bruk.{' '}
              <span aria-hidden="true">*</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!gdprConsent || formState === 'submitting'}
            className="w-full rounded-[var(--radius-md)] bg-[var(--color-green-dark)] px-8 py-4 font-semibold text-white transition-colors hover:bg-[var(--color-green)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formState === 'submitting' ? 'Sender…' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  )
}
