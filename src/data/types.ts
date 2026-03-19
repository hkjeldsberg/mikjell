export type ServiceId = 'spansktimer' | 'cosp'

export type ServiceInterest = 'Spansktimer' | 'COS-P kurs'

export interface Service {
  id: ServiceId
  name: string
  tagline: string
  description: string
  targetAudience: string[]
  price: {
    amount: number
    unit: string
    note?: string
  }
  format?: {
    sessions: number
    durationMinutes: number
    groupSize: string
  }
  ctaLabel: string
  ctaHref: string
  paymentNote: string
}

export interface Testimonial {
  id: string
  quote: string
  role: string
  service: ServiceId
}

export interface ContactInquiry {
  name: string
  email: string
  interest: ServiceInterest
  message?: string
  gdprConsent: boolean
}
