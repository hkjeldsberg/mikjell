import type { Service } from './types'

export const services: Service[] = [
  {
    id: 'spansktimer',
    name: 'Spansktimer',
    tagline: 'Lær spansk på dine premisser — 1 til 1',
    description:
      'Private spansktimer tilpasset deg og dine mål. Vi fokuserer på samtale og praktisk bruk av språket — fra første ord til reiseklar. Undervisningen foregår online via video.',
    targetAudience: [
      'Nybegynnere som vil komme i gang',
      'Deg som skal flytte til eller reise i Spania',
      'Alle som vil bli tryggere i hverdagssamtaler',
    ],
    price: {
      amount: 150,
      unit: 'kr/time',
      note: 'Gratis introtime',
    },
    ctaLabel: 'Book en gratis introtime',
    ctaHref: '#kontakt',
    paymentNote: 'Betaling via Vipps etter avtale.',
  },
  {
    id: 'cosp',
    name: 'COS-P kurs',
    tagline: 'Styrk båndet til barnet ditt',
    description:
      'COS-P (Circle of Security Parenting) er et forskningsbasert foreldreveiledningsprogram som hjelper deg å forstå barnets følelsesmessige behov og styrke tilknytningen mellom dere. Kurset foregår i små, trygge grupper online.',
    targetAudience: [
      'Foreldre med barn i alle aldre',
      'Deg som ønsker bedre kommunikasjon med barnet ditt',
      'Familier som vil bygge tryggere relasjoner',
    ],
    price: {
      amount: 1000,
      unit: 'kr/familie',
    },
    format: {
      sessions: 4,
      durationMinutes: 90,
      groupSize: '5–7 familier',
    },
    ctaLabel: 'Meld interesse',
    ctaHref: '#kontakt',
    paymentNote: 'Faktura sendes via Fiken etter påmelding.',
  },
]
