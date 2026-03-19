# UI Section Contracts: Norsk Hjemmeside

**Branch**: `001-norwegian-homepage` | **Date**: 2026-03-19

These contracts define the required props, content, and behaviour for each
section component. They are the interface boundary between data and UI.

---

## HeroSection

**File**: `src/components/HeroSection.tsx`

### Props

```typescript
interface HeroSectionProps {
  headline: string;       // Primary value proposition, Norwegian
  subheadline: string;    // Who this is for, Norwegian
  ctaSpanish: {
    label: string;        // "Book spansktime"
    href: string;         // "#kontakt" with ?interest=spansktimer
  };
  ctaCosP: {
    label: string;        // "Meld deg på COS-P kurs"
    href: string;         // "#kontakt" with ?interest=cosp
  };
}
```

### Behaviour contract

- MUST render as `<section>` with `aria-label="Introduksjon"`.
- MUST display headline in `<h1>` — only one `<h1>` on the page.
- Both CTAs MUST be `<a>` tags (not `<button>`) linking to `#kontakt`.
- On mobile (< 768 px): CTAs MUST stack vertically, full-width.
- On desktop (≥ 768 px): CTAs MUST render side-by-side.
- Background: `--color-beige`.

---

## AboutSection

**File**: `src/components/AboutSection.tsx`

### Props

```typescript
interface AboutSectionProps {
  name: string;
  bio: string;             // 2–3 sentence Norwegian personal introduction
  credentials: string[];   // List of background points (Norwegian)
  ctaLabel: string;        // Link to contact, e.g. "Kontakt meg"
  ctaHref: string;         // "#kontakt"
  imageSrc?: string;       // Optional provider photo (WebP, 400×400 px)
  imageAlt?: string;       // Norwegian descriptive alt text
}
```

### Behaviour contract

- Section heading MUST be `<h2>`.
- `imageSrc` MUST use Next.js `<Image>` with explicit `width` and `height`.
- If `imageSrc` is absent, render a decorative placeholder `<div>` with
  `aria-hidden="true"`.
- Credentials MUST render as `<ul>` with `<li>` items.
- CTA MUST be visible as a link button within or immediately below the section.

---

## SpanishLessonsSection

**File**: `src/components/SpanishLessonsSection.tsx`

### Props

```typescript
interface SpanishLessonsSectionProps {
  service: Service;   // See data-model.md, id === 'spansktimer'
}
```

### Behaviour contract

- Section heading MUST be `<h2>`.
- Price (150 kr/t) MUST be prominently displayed — not hidden in body text.
- Target audience list MUST render as `<ul>`.
- CTA button MUST link to `#kontakt` and pre-select "Spansktimer" interest.
- Background: `--color-white`.

---

## CosPSection

**File**: `src/components/CosPSection.tsx`

### Props

```typescript
interface CosPSectionProps {
  service: Service;   // See data-model.md, id === 'cosp'
}
```

### Behaviour contract

- Section heading MUST be `<h2>`.
- Format details (4 sessions × 1.5 t, 5–7 familier) MUST be listed.
- Price (1 000 kr/familie) MUST be prominently displayed.
- CTA button MUST link to `#kontakt` and pre-select "COS-P kurs" interest.
- Background: `--color-beige` (alternates from Spanish section).

---

## TestimonialsSection

**File**: `src/components/TestimonialsSection.tsx`

### Props

```typescript
interface TestimonialsSectionProps {
  testimonials: Testimonial[];   // Minimum 2 items required
}
```

### Behaviour contract

- Section heading MUST be `<h2>`.
- Each testimonial MUST use `<blockquote>` and `<cite>`.
- MUST render at minimum 2 testimonials.
- MUST NOT use a carousel that auto-advances without user control (WCAG 2.2.2).
- On mobile: testimonials stack vertically.
- On desktop (≥ 768 px): testimonials display in a 2-column grid.

---

## ContactForm

**File**: `src/components/ContactForm.tsx`

### Props

```typescript
interface ContactFormProps {
  defaultInterest?: ServiceInterest;  // Pre-selected from URL param
  web3FormsAccessKey: string;         // From environment variable
}
```

### Behaviour contract

- Form MUST have `id="kontakt"` to receive anchor links.
- All field `<label>` elements MUST be explicitly associated with their
  inputs via `htmlFor` / `id` pairs.
- Required fields: name, email, interest. Optional: message.
- Interest selector MUST be a `<select>` with options "Spansktimer" and
  "COS-P kurs".
- GDPR consent: `<input type="checkbox">` linked to a `<label>` that
  explains data usage in Norwegian. MUST be unchecked by default.
- Submit button MUST be disabled while the form is submitting.
- On successful submission: form MUST be hidden; Norwegian confirmation
  `<div role="status" aria-live="polite">` MUST be shown.
- On error: Norwegian error `<div role="alert">` MUST be shown.
- Inline validation errors MUST use `aria-describedby` to associate
  error messages with their fields.

---

## Web3Forms API Contract

**Endpoint**: `https://api.web3forms.com/submit` (POST, application/json)

### Request body

```json
{
  "access_key": "<NEXT_PUBLIC_WEB3FORMS_KEY>",
  "name": "Ola Nordmann",
  "email": "ola@example.no",
  "interest": "Spansktimer",
  "message": "Hei, jeg ønsker å booke en introtime.",
  "gdpr_consent": true,
  "subject": "Ny henvendelse: Spansktimer"
}
```

### Response

```json
{ "success": true, "message": "Email sent successfully." }
```

### Error response

```json
{ "success": false, "message": "<error description>" }
```

**GDPR note**: Web3Forms processes data on EU (AWS Ireland/Frankfurt/Stockholm)
edge nodes. Data is not stored after email delivery. No cookies are set.
