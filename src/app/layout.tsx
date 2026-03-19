import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

// T009 — Norwegian SEO metadata
export const metadata: Metadata = {
  title: 'Spansktimer & COS-P kurs | Online | Norsk',
  description:
    'Private spansktimer på norsk og COS-P foreldreveiledning. 1-til-1 undervisning og trygge kursgruppar online. Book gratis introtime i dag.',
  openGraph: {
    title: 'Spansktimer & COS-P foreldrekurs — online på norsk',
    description:
      'Private spansktimer og COS-P foreldreveiledning. Varm, profesjonell og tilpasset deg.',
    locale: 'nb_NO',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// T010 — LocalBusiness JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Spansktimer & COS-P kurs',
  description:
    'Private spansktimer på norsk og COS-P foreldreveiledning online. Tilpasset deg og din familie.',
  url: 'https://mikjell.no',
  areaServed: ['Norge'],
  availableLanguage: 'Norwegian',
  offers: [
    {
      '@type': 'Offer',
      name: 'Spansktimer',
      price: '150',
      priceCurrency: 'NOK',
      description: 'Private 1-til-1 spansktimer online',
    },
    {
      '@type': 'Offer',
      name: 'COS-P kurs',
      price: '1000',
      priceCurrency: 'NOK',
      description: 'Circle of Security Parenting — foreldreveiledning i gruppe',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
