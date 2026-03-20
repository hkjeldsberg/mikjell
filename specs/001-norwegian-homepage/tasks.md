---

description: "Task list for Norsk Hjemmeside — Spansktimer & COS-P kurs"
---

# Tasks: Norsk Hjemmeside — Spansktimer & COS-P kurs

**Input**: Design documents from `/specs/001-norwegian-homepage/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ui-sections.md ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Include exact file paths in all descriptions

## Path Conventions

- Source: `src/` at repository root
- Components: `src/components/`
- Data: `src/data/`
- Styles: `src/styles/`
- App: `src/app/`

---

## Phase 1: Setup

**Purpose**: Scaffold the Next.js project, configure tooling, and establish the
repository structure before any feature work begins.

- [x] T001 Initialise Next.js 15 project at repo root with TypeScript and App Router: `npx create-next-app@latest . --typescript --app --tailwind --eslint --src-dir --no-turbopack --import-alias "@/*"`
- [x] T002 Configure `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }` for static export compatibility
- [x] T003 [P] Add `.prettierrc` at repo root with `{ "semi": false, "singleQuote": true, "printWidth": 100 }` and add `prettier` to devDependencies
- [x] T004 [P] Create `.env.example` at repo root with `NEXT_PUBLIC_WEB3FORMS_KEY=` and add `.env.local` to `.gitignore`
- [x] T005 [P] Create `public/images/` directory with a `.gitkeep` placeholder; add `public/favicon.ico` (use Next.js default initially)
- [x] T006 Verify dev server starts without errors: `npm run dev` — confirm http://localhost:3000 loads

**Checkpoint**: Project scaffolded and dev server running.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish design tokens, shared layout, static data, and SEO metadata.
These are required before any user story section can be built.

**⚠️ CRITICAL**: All user story phases depend on this phase being complete.

- [x] T007 Create `src/styles/globals.css` with Tailwind v4 `@import "tailwindcss"` and `@theme` block defining all design tokens from `data-model.md`: colors (`--color-beige: #F5F0E8`, `--color-green: #A8C5A0`, `--color-green-dark: #6B9F62`, `--color-gray: #6B7280`, `--color-gray-dark: #1F2937`, `--color-white: #FFFFFF`), typography (`--font-sans`, `--font-display`), spacing scale (base-8: 1–24), and border radius tokens
- [x] T008 Create `src/app/layout.tsx` as the root layout: import Inter and Lora from `next/font/google`, apply fonts via CSS variables, set `lang="no"`, import `globals.css`, and render `{children}` inside `<body>`
- [x] T009 Add Norwegian SEO metadata to `src/app/layout.tsx`: `export const metadata` with `title`, `description` (≤ 160 chars Norwegian), `openGraph` (`title`, `description`, `locale: 'nb_NO'`, `type: 'website'`), and `robots: { index: true, follow: true }`
- [x] T010 Add LocalBusiness JSON-LD structured data to `src/app/layout.tsx` as a `<script type="application/ld+json">` in the root layout — include `@type: "LocalBusiness"`, `name`, `description` (Norwegian), `url`, `areaServed: ["Norge"]`, `telephone`, and service offerings
- [x] T011 [P] Create `src/data/services.ts` exporting a `services` array typed as `Service[]` (from `data-model.md`) with two entries: `id: 'spansktimer'` (name: "Spansktimer", price: `{ amount: 150, unit: "kr/time", note: "Gratis introtime" }`, ctaLabel: "Book en gratis introtime", ctaHref: "#kontakt") and `id: 'cosp'` (name: "COS-P kurs", price: `{ amount: 1000, unit: "kr/familie" }`, format: `{ sessions: 4, durationMinutes: 90, groupSize: "5–7 familier" }`, ctaLabel: "Meld interesse", ctaHref: "#kontakt")
- [x] T012 [P] Create `src/data/testimonials.ts` exporting a `testimonials` array typed as `Testimonial[]` (from `data-model.md`) with 3 placeholder entries: `{ id: "elev-1", quote: "Jeg lærte mer spansk på to måneder enn jeg hadde gjort på et år med app. Veldig personlig og tilpasset meg.", role: "Elev, nybegynner", service: "spansktimer" }`, `{ id: "kursdeltaker-1", quote: "COS-P kurset ga meg helt nye verktøy for å forstå datteren min. Varmt anbefalt til alle foreldre.", role: "Kursdeltaker, COS-P", service: "cosp" }`, `{ id: "elev-2", quote: "Endelig et kurs som passer min hverdag. Fleksibelt, gøy og veldig lærerikt.", role: "Elev, reisende", service: "spansktimer" }`
- [x] T013 Create `src/data/types.ts` exporting the `Service`, `ServiceId`, `Testimonial`, `ContactInquiry`, and `ServiceInterest` TypeScript interfaces exactly as defined in `data-model.md`
- [x] T014 Create `src/app/page.tsx` as the single page composition shell: import and render all section components in order (Hero, About, SpanishLessons, CosP, Testimonials, PracticalInfo, ContactForm, SiteFooter) inside `<main>` — use placeholder `<div>` stubs for components not yet built

**Checkpoint**: `npm run dev` loads with correct fonts, no TypeScript errors, data files importable.

---

## Phase 3: User Story 1 — Spanish Lesson Booking (Priority: P1) 🎯 MVP

**Goal**: Visitor can learn about Spanish lessons, see pricing (150 kr/t), and submit a contact inquiry pre-selected as "Spansktimer".

**Independent Test**: Open http://localhost:3000 → click "Book spansktime" → page scrolls to `#kontakt` with "Spansktimer" pre-selected → fill name + email + consent → submit → Norwegian confirmation appears. Site owner receives email via Web3Forms.

### Implementation for User Story 1

- [x] T015 [P] [US1] Create `src/components/HeroSection.tsx`: render `<section aria-label="Introduksjon">` with `<h1>` headline "Lær spansk eller styrk foreldrerollen — på dine premisser", subheadline "For deg som vil lære spansk, eller som ønsker et tryggere og varmere familiemiljø", and two `<a>` CTAs — "Book spansktime" linking to `#kontakt?interest=spansktimer` and "Meld deg på COS-P kurs" linking to `#kontakt?interest=cosp`; mobile: CTAs stack full-width; desktop (md:): CTAs side-by-side; background `bg-[var(--color-beige)]`
- [x] T016 [P] [US1] Create `src/components/SpanishLessonsSection.tsx`: accept `service: Service` prop; render `<section aria-labelledby="spansk-heading">` with `<h2 id="spansk-heading">Spansktimer</h2>`, service description ("1-til-1 timer tilpasset deg. Vi fokuserer på samtale og praktisk bruk — fra nybegynner til reiseklar."), target audience as `<ul>` ("Nybegynnere", "Deg som skal flytte til eller reise i Spania"), prominently displayed price "150 kr/time", and `<a href="#kontakt?interest=spansktimer">` CTA button "Book en gratis introtime"; background `bg-[var(--color-white)]`
- [x] T017 [US1] Create `src/components/ContactForm.tsx` (US1 scope — basic structure only): render `<section id="kontakt" aria-labelledby="kontakt-heading">` with `<h2 id="kontakt-heading">Ta kontakt</h2>` and a `<form>` containing: name field (`<label htmlFor="name">Navn</label>` + `<input id="name" name="name" required maxLength={100}`), email field (`<label htmlFor="email">E-post</label>` + `<input id="email" name="email" type="email" required maxLength={254}`), interest selector (`<label htmlFor="interest">Jeg er interessert i</label>` + `<select id="interest" name="interest">` with options "Spansktimer" and "COS-P kurs"), and a disabled submit `<button type="submit">Send</button>`; mark component as `'use client'`
- [x] T018 [US1] Add URL param pre-selection to `ContactForm.tsx`: read `searchParams` (or `useSearchParams`) for `?interest=` on mount and pre-select the matching `<select>` option ("Spansktimer" when `interest=spansktimer`, "COS-P kurs" when `interest=cosp`); use `useEffect` with `useSearchParams` from `next/navigation`
- [x] T019 [US1] Wire `HeroSection` and `SpanishLessonsSection` into `src/app/page.tsx` replacing their placeholder stubs; pass `services.find(s => s.id === 'spansktimer')` to `SpanishLessonsSection`

**Checkpoint**: Visitor can see Spanish section with pricing and click CTA — scrolls to contact form with "Spansktimer" pre-selected. Independently testable.

---

## Phase 4: User Story 2 — COS-P Course Sign-up (Priority: P2)

**Goal**: Parent can read about COS-P, see format + pricing (1 000 kr/familie), and submit an inquiry pre-selected as "COS-P kurs" via a fully functional form with GDPR consent and Web3Forms delivery.

**Independent Test**: Open http://localhost:3000 → scroll to COS-P section → click "Meld interesse" → form scrolls to `#kontakt` with "COS-P kurs" pre-selected → fill all fields + check consent → submit → confirmation message in Norwegian. Site owner's email inbox receives the inquiry.

### Implementation for User Story 2

- [x] T020 [P] [US2] Create `src/components/CosPSection.tsx`: accept `service: Service` prop; render `<section aria-labelledby="cosp-heading">` with `<h2 id="cosp-heading">COS-P — Circle of Security Parenting</h2>`, plain-language Norwegian description ("COS-P er et forskningsbasert foreldreveiledningsprogram som hjelper deg å forstå barnets følelsesmessige behov og styrke tilknytningen mellom dere."), format details as `<ul>` ("4 samlinger", "1,5 time per samling", "Små grupper: 5–7 familier"), prominently displayed price "1 000 kr/familie", and `<a href="#kontakt?interest=cosp">` CTA button "Meld interesse"; background `bg-[var(--color-beige)]`
- [x] T021 [US2] Add optional message field to `ContactForm.tsx`: add `<label htmlFor="message">Melding (valgfritt)</label>` + `<textarea id="message" name="message" maxLength={1000} rows={4}>` between the interest selector and submit button
- [x] T022 [US2] Add GDPR consent checkbox to `ContactForm.tsx`: add `<input type="checkbox" id="gdprConsent" required>` with `<label htmlFor="gdprConsent">Jeg godtar at informasjonen min brukes til å besvare henvendelsen min. Ingen data lagres uten samtykke. <a href="#" ...>Les mer</a></label>`; disable submit button unless checkbox is checked (controlled state)
- [x] T023 [US2] Add client-side validation to `ContactForm.tsx`: on submit attempt, validate name (non-empty, ≤ 100), email (valid format via regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, ≤ 254), interest (must be selected); for each invalid field render a `<p role="alert" id="{field}-error">` Norwegian error message associated via `aria-describedby` on the input: "Navn er påkrevd", "Ugyldig e-postadresse", "Velg et alternativ"
- [x] T024 [US2] Integrate Web3Forms into `ContactForm.tsx`: on valid submit, POST to `https://api.web3forms.com/submit` with JSON body `{ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, name, email, interest, message, gdpr_consent: true, subject: \`Ny henvendelse: ${interest}\` }`; set button to loading state during fetch; on `success: true` response hide the form and show `<div role="status" aria-live="polite">Takk! Vi tar kontakt med deg snart.</div>`; on error show `<div role="alert">Noe gikk galt. Prøv igjen eller send e-post direkte.</div>`
- [x] T025 [US2] Wire `CosPSection` into `src/app/page.tsx` replacing its placeholder stub; pass `services.find(s => s.id === 'cosp')`

**Checkpoint**: Both CTA paths (Spanish + COS-P) scroll to a fully functional contact form. GDPR consent gate works. Web3Forms delivers email. Confirmations display in Norwegian.

---

## Phase 5: User Story 3 — Trust / About Section (Priority: P3)

**Goal**: Visitor reads a personal, trustworthy introduction and professional background, then finds a clear CTA to contact.

**Independent Test**: Open http://localhost:3000 → scroll to About section → verify personal bio, credential list, and at least one "Kontakt meg" CTA are visible and accessible via keyboard.

### Implementation for User Story 3

- [x] T026 [P] [US3] Create `src/components/AboutSection.tsx`: render `<section aria-labelledby="om-heading">` with `<h2 id="om-heading">Om meg</h2>`, a 2–3 sentence Norwegian bio ("Jeg er sosionom med erfaring fra psykisk helsevern og arbeid med barn og familier. Jeg er lidenskapelig opptatt av tilknytning, utvikling og å skape trygge rammer — enten det er i undervisning eller veiledning. Til daglig snakker jeg spansk flytende og underviser gjerne deg som vil lære."), credentials as `<ul>` ("Sosionom med videreutdanning", "Erfaring fra psykisk helsevern og barnearbeid", "Flytende spansk"), a `<a href="#kontakt">Kontakt meg</a>` CTA button, and an optional `<Image>` (Next.js) placeholder (400×400 px, `alt="Profilbilde"`, `aria-hidden="true"` if decorative placeholder); background `bg-[var(--color-white)]`
- [x] T027 [P] [US3] Create `src/components/PracticalInfo.tsx`: render `<section aria-labelledby="praktisk-heading">` with `<h2 id="praktisk-heading">Praktisk informasjon</h2>` and a `<dl>` containing: "Undervisningsform" → "Online via video", "Språk" → "Norsk (bokmål)", "Kontakt" → email address (placeholder: `hei@eksempel.no`), "Betaling" → "Vipps (spansktimer) / Faktura via Fiken (COS-P)"; background `bg-[var(--color-beige)]`
- [x] T028 [P] [US3] Create `src/components/SiteFooter.tsx`: render `<footer>` with copyright line "© 2026 [Navn]. Alle rettigheter forbeholdt.", a brief GDPR note "Personopplysninger behandles i henhold til GDPR og slettes etter bruk.", and nav links `<nav aria-label="Bunnavigasjon">` with anchors to `#spansk`, `#cosp`, `#om`, `#kontakt`
- [x] T029 [US3] Wire `AboutSection`, `PracticalInfo`, and `SiteFooter` into `src/app/page.tsx` replacing their placeholder stubs; add matching `id` attributes to section elements (`id="spansk"`, `id="cosp"`, `id="om"`, `id="kontakt"`) for anchor navigation

**Checkpoint**: About section, Practical Info, and Footer are visible. Keyboard navigation from top to bottom works. "Kontakt meg" CTA scrolls to form.

---

## Phase 6: User Story 4 — Testimonials (Priority: P4)

**Goal**: At least 2 placeholder testimonials are displayed in an accessible, responsive layout that matches the page visual language.

**Independent Test**: Open http://localhost:3000 → scroll to testimonials section → verify 2+ `<blockquote>` elements each with a `<cite>` attribution are visible, readable on mobile (375 px) and desktop (1280 px).

### Implementation for User Story 4

- [x] T030 [US4] Create `src/components/TestimonialsSection.tsx`: accept `testimonials: Testimonial[]` prop; render `<section aria-labelledby="testimonials-heading">` with `<h2 id="testimonials-heading">Hva sier andre?</h2>` and a grid of `<figure>` + `<blockquote>` + `<figcaption>` + `<cite>` elements; mobile: single column; desktop (md:): 2-column grid; background `bg-[var(--color-white)]`; no auto-advancing carousel; render minimum 2 items or throw if `testimonials.length < 2`
- [x] T031 [US4] Wire `TestimonialsSection` into `src/app/page.tsx` replacing its placeholder stub; pass the full `testimonials` array from `src/data/testimonials.ts`

**Checkpoint**: All user stories are independently functional. Full page renders from Hero to Footer.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility audit, performance optimisation, responsive verification, and final validation per `quickstart.md`.

- [x] T032 Add `id` attributes to all section elements in `src/app/page.tsx` if not already present: `id="hero"`, `id="om"`, `id="spansk"`, `id="cosp"`, `id="testimonials"`, `id="praktisk"`, `id="kontakt"` — verify anchor scrolling from Hero CTAs, Footer nav, and About CTA
- [x] T033 [P] Add `prefers-reduced-motion` support: in `src/styles/globals.css` add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`; verify smooth-scroll behaviour is suppressed on reduced-motion devices
- [x] T034 [P] Add `<noscript>` mailto fallback to `ContactForm.tsx`: render `<noscript><p>JavaScript er deaktivert. Send e-post direkte til <a href="mailto:hei@eksempel.no">hei@eksempel.no</a></p></noscript>` above the form element; verify all section content (pricing, about, COS-P) is readable with JS disabled
- [ ] T035 Run Lighthouse audit in Chrome DevTools (Mobile, simulated slow 4G): confirm Performance ≥ 80 and Accessibility ≥ 90; fix any flagged issues before proceeding
- [ ] T036 Run axe DevTools browser extension on http://localhost:3000: resolve all critical and serious violations; target: 0 violations; common fixes — missing `alt` on images, insufficient contrast, missing focus indicators
- [ ] T037 [P] Responsive verification: open DevTools and test at 320 px, 375 px, 768 px, 1280 px, 1440 px — confirm no horizontal scroll, no overlapping elements, touch targets ≥ 44 × 44 px (inspect with DevTools ruler), CTA buttons full-width on mobile
- [x] T038 Run `npm run build` to generate static export to `out/`; serve with `npx serve out` and repeat form submission test — confirm Web3Forms delivers email from the static build
- [ ] T039 Follow `quickstart.md` end-to-end verification checklist step by step; mark each item complete; address any failures
- [ ] T040 Commit all changes with message `feat: implement Norwegian homepage MVP (spansktimer + COS-P)` and push to `origin/001-norwegian-homepage`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Requires Phase 1 complete — BLOCKS all user stories
- **US1 (Phase 3)**: Requires Phase 2 — can start independently of US2/US3/US4
- **US2 (Phase 4)**: Requires Phase 2 + ContactForm from US1 (T017) — extends T017
- **US3 (Phase 5)**: Requires Phase 2 — independent of US1/US2/US4
- **US4 (Phase 6)**: Requires Phase 2 — independent of US1/US2/US3
- **Polish (Phase 7)**: Requires all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Foundational only → no story dependencies
- **US2 (P2)**: Foundational + T017 (ContactForm base) from US1
- **US3 (P3)**: Foundational only → no story dependencies
- **US4 (P4)**: Foundational only → no story dependencies

### Within Each User Story

- Data files before components (T011, T012 before T015–T019)
- `ContactForm.tsx` base (T017) before form extensions (T021–T024)
- Components before wiring into `page.tsx` (T015, T016 before T019)

### Parallel Opportunities

All tasks marked `[P]` within a phase can run simultaneously:

```bash
# Phase 2 — run in parallel:
T011 Create src/data/services.ts
T012 Create src/data/testimonials.ts
T013 Create src/data/types.ts       # (no [P] but no deps on T011/T012)

# Phase 3 — run in parallel:
T015 Create HeroSection.tsx
T016 Create SpanishLessonsSection.tsx
# Then T017 (ContactForm base) sequentially

# Phase 5 — run in parallel:
T026 Create AboutSection.tsx
T027 Create PracticalInfo.tsx
T028 Create SiteFooter.tsx
# Then T029 (wire into page.tsx) sequentially

# Phase 7 — run in parallel:
T033 prefers-reduced-motion CSS
T034 noscript fallback
T037 Responsive verification
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational — CRITICAL
3. Complete Phase 3: US1 (Hero + Spanish section + ContactForm base)
4. **STOP and VALIDATE**: Click "Book spansktime" → form → submit → email received
5. Site is already useful for Spanish lesson bookings

### Incremental Delivery

1. Setup + Foundational → skeleton loads
2. US1 (T015–T019) → Spanish booking path live (MVP!)
3. US2 (T020–T025) → full form with GDPR + COS-P path live
4. US3 (T026–T029) → About + Practical + Footer live
5. US4 (T030–T031) → Testimonials live
6. Polish (T032–T040) → production-ready

### Total Task Count

| Phase | Tasks | Parallelizable |
|-------|-------|----------------|
| Phase 1: Setup | T001–T006 (6) | T003, T004, T005 |
| Phase 2: Foundational | T007–T014 (8) | T011, T012, T013 |
| Phase 3: US1 | T015–T019 (5) | T015, T016 |
| Phase 4: US2 | T020–T025 (6) | T020 |
| Phase 5: US3 | T026–T029 (4) | T026, T027, T028 |
| Phase 6: US4 | T030–T031 (2) | — |
| Phase 7: Polish | T032–T040 (9) | T033, T034, T037 |
| **Total** | **40 tasks** | **13 parallelizable** |

---

## Notes

- `[P]` tasks operate on different files with no shared dependencies
- `[USn]` label maps each task to a specific user story for traceability
- Each user story phase is independently completable and testable
- Commit after each phase or checkpoint — do not batch all work into one commit
- Run `quickstart.md` validation before marking the feature complete
- Avoid: same-file concurrent edits, cross-story coupling, hardcoded hex values outside `globals.css`
