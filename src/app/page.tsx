import { Suspense } from 'react'
import { services } from '@/data/services'

import HeroSection from '@/components/HeroSection'
import SpanishLessonsSection from '@/components/SpanishLessonsSection'
import ContactForm from '@/components/ContactForm'

const spanishService = services.find((s) => s.id === 'spansktimer')!
const cospService = services.find((s) => s.id === 'cosp')!

export default function Page() {
  return (
    <main>
      {/* US1 — Hero */}
      <HeroSection
        headline="Lær spansk eller styrk foreldrerollen — på dine premisser"
        subheadline="For deg som vil lære spansk, eller som ønsker et tryggere og varmere familiemiljø."
        ctaSpanish={{ label: 'Book spansktime', href: '#kontakt?interest=spansktimer' }}
        ctaCosP={{ label: 'Meld deg på COS-P kurs', href: '#kontakt?interest=cosp' }}
      />

      {/* US1 — Spanish Lessons */}
      <section id="spansk">
        <SpanishLessonsSection service={spanishService} />
      </section>

      {/* US3 stub — About */}
      <div id="om" />

      {/* US2 stub — COS-P */}
      <div id="cosp" />

      {/* US4 stub — Testimonials */}
      <div id="testimonials" />

      {/* Practical Info stub */}
      <div id="praktisk" />

      {/* US1+US2 — Contact Form */}
      <Suspense>
        <ContactForm />
      </Suspense>
    </main>
  )
}

void cospService // stub — wired in Phase 4
