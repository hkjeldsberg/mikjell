# Research: Norsk Hjemmeside — Spansktimer & COS-P kurs

**Branch**: `001-norwegian-homepage` | **Date**: 2026-03-19
**Phase**: 0 — Technology & approach decisions

---

## 1. Next.js App Router vs Pages Router

**Decision**: Next.js App Router with `output: 'export'`

**Rationale**:
- App Router is the current standard for all new Next.js projects (2025+).
- `output: 'export'` in `next.config.ts` produces a fully static site with no
  server required — deployable to any static host (Netlify, Cloudflare Pages, S3).
- Server Components reduce client-side JavaScript bundle size — beneficial
  for Lighthouse performance targets (≥ 80 mobile).
- A single-page layout means no routing complexity; App Router conventions
  are a non-issue at this scale.

**Alternatives considered**:
- Pages Router: Legacy, will eventually be deprecated. No advantages for a
  new single-page site.
- Plain HTML + Vanilla JS: Loses asset optimization, component reuse,
  and image optimization that Next.js `<Image>` provides.

---

## 2. Contact Form Service

**Decision**: Web3Forms

**Rationale**:
- **GDPR compliance (critical)**: Web3Forms processes data on AWS EU edge nodes
  (Ireland/Frankfurt/Stockholm). This satisfies GDPR Article 44 data transfer
  restrictions for Norwegian users — no US data transfer.
- **Free tier**: Unlimited submissions (24 h retention on free tier). Formspree
  allows only 50/month free, which is insufficient even for modest traffic.
- **Integration**: Works via direct client-side POST to their API — compatible
  with Next.js static exports (no server required).
- **Spam protection**: Built-in spam filtering and honeypot support.

**Alternatives considered**:
- Formspree: US data processing creates GDPR liability for Norwegian users.
- Netlify Forms: Paid; form data residency not clearly documented for EU.
- Custom email backend: Unnecessary complexity for MVP; no persistent storage needed.

---

## 3. CSS / Design System

**Decision**: Tailwind CSS v4 with `@theme` design tokens

**Rationale**:
- Tailwind v4's CSS-first configuration (`@theme` directive in `globals.css`)
  defines all design tokens (colors, spacing, typography) in a single CSS
  file — satisfying the constitution's "single design token file" principle.
- Utility-first approach eliminates design drift without maintaining a separate
  token system alongside CSS Modules.
- Lightning CSS engine makes builds fast enough for a solo developer workflow.
- Constrained spacing scale enforces constitution Design Standards automatically.
- `prefers-reduced-motion` can be handled inline via Tailwind's `motion-safe:`
  and `motion-reduce:` variants.

**Alternatives considered**:
- CSS Modules + CSS custom properties: Correct for large component systems;
  overkill for a single landing page and adds manual token maintenance.
- Vanilla CSS: Simplest but loses design consistency enforcement.

---

## 4. Hosting / Deployment

**Decision**: Netlify

**Rationale**:
- Free tier explicitly allows commercial use (Vercel Hobby tier restricts it).
- Nordic CDN edge nodes — equivalent performance to Vercel for Norwegian users.
- Simple custom domain setup (CNAME or NS delegation).
- Form data from Web3Forms is platform-agnostic; no Netlify Forms dependency.
- CI/CD via GitHub push is zero-config for Next.js static export.

**Alternatives considered**:
- Vercel: Tightly optimized for Next.js but Hobby tier commercial restrictions
  are a legal grey area for a paid-service website.
- Cloudflare Pages: Excellent free tier and Nordic performance, but ecosystem
  around preview deploys and analytics is smaller. Valid future fallback.

---

## 5. SEO Strategy

**Decision**: Norwegian-language meta tags + LocalBusiness JSON-LD structured data

**Implementation**:
- `<title>` ≤ 60 chars, formula: `"Tjeneste | By | Navn"`.
- `<meta name="description">` ≤ 160 chars, Norwegian copy, service + location.
- Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing.
- `<script type="application/ld+json">` with `@type: "LocalBusiness"` including
  `areaServed`, `telephone`, `address` (Country: "NO"), and service descriptions
  in Norwegian.

**Rationale**:
- LocalBusiness schema is the single highest-impact structured data for local
  Norwegian service search visibility.
- Norwegian-language content in schema fields signals language relevance to
  search engine ranking algorithms.

---

## 6. TypeScript

**Decision**: TypeScript (strict mode)

**Rationale**: Next.js defaults to TypeScript. Strict types on data shapes
(Service, ContactInquiry, Testimonial) provide compile-time safety at no
operational cost. No tradeoffs at this scale.

---

## Summary Stack

| Layer        | Choice                              |
|--------------|-------------------------------------|
| Framework    | Next.js 15 App Router, static export|
| Language     | TypeScript (strict)                 |
| Styling      | Tailwind CSS v4 + `@theme` tokens   |
| Forms        | Web3Forms (EU GDPR-safe)            |
| Hosting      | Netlify (free commercial tier)      |
| SEO          | LocalBusiness JSON-LD + meta tags   |
| Images       | Next.js `<Image>` → WebP/AVIF output|
