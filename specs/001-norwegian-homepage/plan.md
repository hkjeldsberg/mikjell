# Implementation Plan: Norsk Hjemmeside — Spansktimer & COS-P kurs

**Branch**: `001-norwegian-homepage` | **Date**: 2026-03-19 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-norwegian-homepage/spec.md`

---

## Summary

Build a single-page static Norwegian landing page that converts visitors into
Spanish lesson bookings (150 kr/t) and COS-P course sign-ups (1 000 kr/familie).
The site is built with Next.js 15 App Router (static export), Tailwind CSS v4,
and Web3Forms for GDPR-safe contact form delivery. Deployed to Netlify.
No backend, no database, no login — pure static with client-side form submission.

---

## Technical Context

**Language/Version**: TypeScript 5 / Node.js 20 LTS
**Primary Dependencies**: Next.js 15 (App Router, `output: 'export'`), Tailwind CSS v4, Web3Forms API
**Storage**: N/A — no database; form data delivered by email via Web3Forms
**Testing**: Lighthouse (performance, accessibility), axe DevTools (WCAG), manual responsive testing
**Target Platform**: Static site — Netlify (free commercial tier), Nordic CDN edge nodes
**Project Type**: Single-page static marketing site
**Performance Goals**: Lighthouse Performance ≥ 80 (mobile), Accessibility ≥ 90
**Constraints**: WCAG 2.1 AA; GDPR-compliant (EU data residency); no-JS content visible; 320 px min viewport
**Scale/Scope**: Single page, single service provider, 2 services, 1 contact form

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Minimalism First | No unnecessary dependencies; each dep justifies existence | ✅ Next.js + Tailwind + Web3Forms only. No auth, no DB, no CMS. |
| II. Responsive & Mobile-First | Design from 320 px up; touch targets ≥ 44 × 44 px; relative CSS units | ✅ Mobile-first layout required by spec; Tailwind enforces relative units |
| III. Accessibility (WCAG 2.1 AA) | Semantic HTML; contrast ≥ 4.5:1; keyboard nav; visible focus | ✅ Colour tokens pre-verified; semantic section contracts defined |
| IV. Code Quality & Consistency | Single formatter/linter; components ≤ 50 lines; no dead code | ✅ ESLint + Prettier at repo root; components scoped to one section each |
| V. UX Consistency | Single design token file; all interactive states defined; explicit error states | ✅ `globals.css` `@theme` block is sole token source; form error/success states in contracts |

**Post-Phase 1 re-check**: All gates still pass. No violations requiring justification.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-norwegian-homepage/
├── plan.md              # This file
├── research.md          # Phase 0 — tech decisions
├── data-model.md        # Phase 1 — TypeScript types + design tokens
├── quickstart.md        # Phase 1 — end-to-end verification guide
├── contracts/
│   └── ui-sections.md   # Phase 1 — component prop contracts + Web3Forms API
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 — /speckit.tasks command output (not yet created)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, fonts, global CSS
│   └── page.tsx            # Single page: composes all section components
├── components/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SpanishLessonsSection.tsx
│   ├── CosPSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── PracticalInfo.tsx
│   ├── ContactForm.tsx
│   └── SiteFooter.tsx
├── data/
│   ├── services.ts         # Static Service data (2 entries)
│   └── testimonials.ts     # Static Testimonial data (2–3 placeholder entries)
└── styles/
    └── globals.css         # Tailwind v4 @theme tokens + base resets

public/
├── images/                 # Optimized WebP placeholder images
└── favicon.ico

next.config.ts              # output: 'export', images: { unoptimized: true }
tailwind.config.ts          # (v4: minimal; token config in globals.css)
.env.example                # NEXT_PUBLIC_WEB3FORMS_KEY=
.env.local                  # (gitignored) actual key
.eslintrc.json              # ESLint config
.prettierrc                 # Prettier config
```

**Structure Decision**: Single Next.js project at the repo root. No monorepo,
no backend directory, no separate frontend/backend split. This is the simplest
structure that satisfies all requirements.

---

## Phase 0: Research

*Complete.* See [`research.md`](research.md).

Key decisions:
- **Framework**: Next.js 15 App Router + `output: 'export'`
- **Styling**: Tailwind CSS v4 with `@theme` design tokens
- **Forms**: Web3Forms (EU GDPR-safe, free tier)
- **Hosting**: Netlify
- **SEO**: LocalBusiness JSON-LD + Norwegian meta tags

---

## Phase 1: Design & Contracts

*Complete.* See:
- [`data-model.md`](data-model.md) — TypeScript interfaces + design tokens
- [`contracts/ui-sections.md`](contracts/ui-sections.md) — Component prop contracts + Web3Forms API
- [`quickstart.md`](quickstart.md) — End-to-end verification guide

Key design decisions:
- **Single page, 7 sections**: Hero → About → Spanish Lessons → COS-P → Testimonials → Practical Info → Contact
- **Design palette**: Beige (`#F5F0E8`), light green (`#A8C5A0`), warm gray — all contrast-verified
- **Fonts**: Lora (headings) + Inter (body) — max 2 typefaces per constitution
- **Form flow**: CTA buttons deep-link to `#kontakt` with `?interest=` pre-selection
- **No JS fallback**: All sections are static HTML; form degrades to mailto

---

## Complexity Tracking

> No constitution violations. This section intentionally empty.

---

## Implementation Order

When `/speckit.tasks` is run, tasks will be organised into these phases:

1. **Setup**: Repo init, Next.js + Tailwind install, ESLint/Prettier config,
   env variable scaffolding, Netlify connection.

2. **Foundational**: Design token file (`globals.css`), base layout
   (`layout.tsx`), static data files (`services.ts`, `testimonials.ts`),
   SEO metadata + JSON-LD in `layout.tsx`.

3. **US1 — Spanish lesson booking**: `HeroSection` (with Spanish CTA),
   `SpanishLessonsSection`, `ContactForm` (Spansktimer pre-selection path).

4. **US2 — COS-P sign-up**: `CosPSection`, `ContactForm` (COS-P pre-selection
   path), full form validation + GDPR consent + Web3Forms integration.

5. **US3 — Trust/About**: `AboutSection`, `PracticalInfo`, `SiteFooter`.

6. **US4 — Testimonials**: `TestimonialsSection` with 2 placeholder entries.

7. **Polish**: Lighthouse audit pass, axe DevTools zero-violation pass,
   responsive testing 320–1440 px, `prefers-reduced-motion` check,
   quickstart.md validation, final commit + push.
