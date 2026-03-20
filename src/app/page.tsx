import { Suspense } from 'react'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'

import HeroSection from '@/components/HeroSection'
import SpanishLessonsSection from '@/components/SpanishLessonsSection'
import CosPSection from '@/components/CosPSection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import PracticalInfo from '@/components/PracticalInfo'
import ContactForm from '@/components/ContactForm'
import SiteFooter from '@/components/SiteFooter'

const spanishService = services.find((s) => s.id === 'spansktimer')!
const cospService = services.find((s) => s.id === 'cosp')!

export default function Page() {
  return (
    <>
      <main>
        {/* US1 — Hero */}
        <section id="hero">
          <HeroSection
            headline="Lær spansk eller styrk foreldrerollen — på dine premisser"
            subheadline="For deg som vil lære spansk, eller som ønsker et tryggere og varmere familiemiljø."
            ctaSpanish={{ label: 'Book spansktime', href: '#kontakt?interest=spansktimer' }}
            ctaCosP={{ label: 'Meld deg på COS-P kurs', href: '#kontakt?interest=cosp' }}
          />
        </section>

        {/* US3 — About */}
        <AboutSection />

        {/* US1 — Spanish Lessons */}
        <section id="spansk">
          <SpanishLessonsSection service={spanishService} />
        </section>

        {/* US2 — COS-P */}
        <CosPSection service={cospService} />

        {/* US4 — Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* US3 — Practical Info */}
        <PracticalInfo />

        {/* US1+US2 — Contact Form */}
        <Suspense>
          <ContactForm />
        </Suspense>
      </main>

      <SiteFooter />
    </>
  )
}
