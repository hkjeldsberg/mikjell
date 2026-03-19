import type { Testimonial } from './types'

export const testimonials: Testimonial[] = [
  {
    id: 'elev-1',
    quote:
      'Jeg lærte mer spansk på to måneder enn jeg hadde gjort på et år med app. Veldig personlig og tilpasset meg.',
    role: 'Elev, nybegynner',
    service: 'spansktimer',
  },
  {
    id: 'kursdeltaker-1',
    quote:
      'COS-P kurset ga meg helt nye verktøy for å forstå datteren min. Varmt anbefalt til alle foreldre.',
    role: 'Kursdeltaker, COS-P',
    service: 'cosp',
  },
  {
    id: 'elev-2',
    quote: 'Endelig et kurs som passer min hverdag. Fleksibelt, gøy og veldig lærerikt.',
    role: 'Elev, reisende',
    service: 'spansktimer',
  },
]
