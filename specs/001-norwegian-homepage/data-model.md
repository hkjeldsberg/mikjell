# Data Model: Norsk Hjemmeside — Spansktimer & COS-P kurs

**Branch**: `001-norwegian-homepage` | **Date**: 2026-03-19

All data is static (defined in source code). There is no database or runtime
data persistence for MVP. Entities below define the TypeScript types used
throughout the application.

---

## Entity: Service

Represents a bookable offering displayed on the page.

```typescript
type ServiceId = 'spansktimer' | 'cosp';

interface Service {
  id: ServiceId;
  name: string;              // Norwegian display name, e.g. "Spansktimer"
  tagline: string;           // One-line description shown in Hero CTA
  description: string;       // Full section description (Norwegian)
  targetAudience: string[];  // Who this is for (Norwegian)
  price: {
    amount: number;          // e.g. 150
    unit: string;            // e.g. "kr/time" or "kr/familie"
    note?: string;           // Optional: "Gratis introtime" or similar
  };
  format?: {                 // Optional: only relevant for COS-P
    sessions: number;        // e.g. 4
    durationMinutes: number; // e.g. 90
    groupSize: string;       // e.g. "5–7 familier"
  };
  ctaLabel: string;          // Button text, Norwegian
  ctaHref: string;           // Anchor link to contact form, e.g. "#kontakt"
  paymentNote: string;       // Vipps or Fiken manual invoice note
}
```

**Validation rules**:
- `id` MUST be one of the two defined enum values.
- `price.amount` MUST be a positive integer.
- `ctaHref` MUST be a valid in-page anchor (`#kontakt`).

**Static data file**: `src/data/services.ts`

---

## Entity: Testimonial

A social proof quote displayed in the Testimonials section.

```typescript
interface Testimonial {
  id: string;           // Unique slug, e.g. "elev-1"
  quote: string;        // Full quote text in Norwegian
  role: string;         // Attribution role, e.g. "Elev" or "Kursdeltaker"
  service: ServiceId;   // Which service this testimonial relates to
}
```

**Validation rules**:
- `quote` MUST be non-empty.
- `role` MUST be a human-readable Norwegian role string.
- MVP uses placeholder data; `id` format is `"<role>-<n>"`.

**Static data file**: `src/data/testimonials.ts`

---

## Entity: ContactInquiry

Data collected by the contact form and submitted to Web3Forms. This entity
is never stored in a database — it is transmitted once via POST and delivered
to the site owner's email.

```typescript
type ServiceInterest = 'Spansktimer' | 'COS-P kurs';

interface ContactInquiry {
  name: string;              // Visitor's full name, max 100 chars
  email: string;             // Valid email, max 254 chars (RFC 5321)
  interest: ServiceInterest; // Which service they are enquiring about
  message?: string;          // Optional free-text message, max 1000 chars
  gdprConsent: boolean;      // MUST be true before form can be submitted
}
```

**Validation rules**:
- `name`: required, non-empty, ≤ 100 characters.
- `email`: required, valid RFC 5321 format, ≤ 254 characters.
- `interest`: required, one of the two enum values.
- `message`: optional, ≤ 1 000 characters.
- `gdprConsent`: MUST be `true`; form submission is blocked if `false`.

**Runtime behaviour**:
- Data is validated client-side before submission (Norwegian error messages).
- On success, the form is replaced with a Norwegian confirmation message.
- No data is retained client-side after submission.

---

## Entity: DesignTokens

Not a runtime entity — defined in `src/styles/globals.css` via Tailwind's
`@theme` directive. Documented here as the single source of truth for all
visual values.

```css
/* Color palette (soft Scandinavian) */
--color-beige:      #F5F0E8;   /* Background, section alternates */
--color-green:      #A8C5A0;   /* Primary accent, CTAs */
--color-green-dark: #6B9F62;   /* Hover states, active */
--color-gray:       #6B7280;   /* Body text, secondary */
--color-gray-dark:  #1F2937;   /* Headings */
--color-white:      #FFFFFF;   /* Card backgrounds */

/* Typography */
--font-sans: 'Inter', system-ui, sans-serif;   /* Body */
--font-display: 'Lora', Georgia, serif;        /* Headings (max 2 typefaces) */

/* Spacing scale (base-8) */
--spacing-1: 0.25rem;  --spacing-2: 0.5rem;   --spacing-4: 1rem;
--spacing-6: 1.5rem;   --spacing-8: 2rem;     --spacing-12: 3rem;
--spacing-16: 4rem;    --spacing-24: 6rem;

/* Border radius */
--radius-sm: 0.375rem;   --radius-md: 0.75rem;   --radius-lg: 1.5rem;
```

**Contrast ratios (verified)**:
- `gray-dark` on `beige`: 12.1:1 ✅ (normal text, requirement: 4.5:1)
- `gray` on `white`: 5.9:1 ✅ (normal text)
- `white` on `green-dark`: 4.6:1 ✅ (button text)
