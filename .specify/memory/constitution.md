<!--
SYNC IMPACT REPORT
==================
Version change: (unversioned template) → 1.0.0
New constitution — no prior version to diff.

Added sections:
  - Core Principles (5 principles)
  - Design Standards
  - Development Workflow
  - Governance

Removed sections: N/A (initial population)

Templates reviewed:
  ✅ .specify/templates/plan-template.md — Constitution Check section aligned; no updates needed
  ✅ .specify/templates/spec-template.md — Requirements/Success Criteria sections compatible
  ✅ .specify/templates/tasks-template.md — Task phases compatible; no web-specific additions needed
  ✅ .specify/templates/constitution-template.md — Source template, read-only reference

Follow-up TODOs:
  - None. All fields resolved.
-->

# Mikjell Constitution

## Core Principles

### I. Minimalism First

Every feature, dependency, and UI element MUST justify its existence.
The default answer to "should we add this?" is NO unless it demonstrably
improves the user experience or solves a clear problem.

- Third-party dependencies MUST be avoided unless they replace a significant
  amount of hand-written code or provide a capability unavailable otherwise.
- UI MUST be clean, uncluttered, and free of decorative elements that do not
  serve a functional purpose.
- Code MUST do one thing well. Split responsibilities; do not bundle unrelated
  concerns into a single file or component.

**Rationale**: Minimal surface area lowers maintenance cost, improves load
performance, and keeps the codebase approachable for future contributors.

### II. Responsive & Mobile-First

All layouts and interactive elements MUST work correctly across mobile,
tablet, and desktop viewports without a separate mobile site or app.

- Design MUST begin at the smallest reasonable viewport (320 px) and scale up.
- Touch targets MUST be at least 44 × 44 px (WCAG 2.5.5 AAA guidance).
- No layout MUST rely on hover-only interactions as a primary mechanism.
- CSS MUST use relative units (rem, %, vw/vh) rather than fixed px for
  structural sizing.

**Rationale**: The majority of web traffic is mobile. Building mobile-first
ensures the core experience is never an afterthought.

### III. Accessibility (WCAG 2.1 AA)

The site MUST meet WCAG 2.1 Level AA conformance as a baseline.

- All images MUST have descriptive `alt` text or be marked `alt=""` if purely
  decorative.
- Color contrast ratios MUST meet 4.5:1 for normal text and 3:1 for large text.
- All interactive elements MUST be keyboard-navigable and MUST have visible
  focus indicators.
- Page structure MUST use semantic HTML (`<header>`, `<main>`, `<nav>`,
  `<footer>`, heading hierarchy) rather than generic `<div>` wrappers.
- Dynamic content changes MUST be communicated to assistive technologies via
  ARIA live regions or equivalent.

**Rationale**: Accessibility is a legal requirement in many jurisdictions and
a moral obligation. Semantic HTML also improves SEO and maintainability.

### IV. Code Quality & Consistency

Code MUST be readable, consistently formatted, and follow established
conventions throughout the project.

- A single formatter and linter configuration MUST be defined at the repo root
  and applied uniformly — no per-file exceptions.
- Functions and components MUST be small enough to understand at a glance
  (target: ≤ 50 lines; MUST NOT exceed 100 lines without documented justification).
- Variable and function names MUST be descriptive. Abbreviations MUST NOT be
  used unless universally understood (e.g., `id`, `url`, `px`).
- Dead code MUST be removed immediately; commented-out code MUST NOT be
  committed.

**Rationale**: Consistent, readable code reduces onboarding friction and
prevents the accumulation of technical debt.

### V. UX Consistency

The user interface MUST present a consistent visual language and interaction
model throughout all pages and states.

- A single design token file (colors, spacing, typography) MUST be the sole
  source of truth for all visual values. No hardcoded hex codes or magic
  numbers in component styles.
- Interactive states (hover, focus, active, disabled) MUST be defined for
  every interactive element and MUST follow the same visual pattern.
- Navigation MUST behave identically regardless of the current page; no
  page-specific navigation mutations.
- Error and empty states MUST be designed explicitly — they MUST NOT be left
  as unstyled default browser output.

**Rationale**: Consistency reduces cognitive load and builds user trust.
It also makes extending the UI with new features predictable and fast.

## Design Standards

- **Typography**: Use a maximum of 2 typefaces. Body text MUST be at least
  16 px (1 rem). Line height for body copy MUST be ≥ 1.5.
- **Color palette**: Define a constrained palette (primary, neutral, semantic
  states). MUST pass accessibility contrast checks at definition time.
- **Spacing**: Use a base-4 or base-8 spacing scale. No arbitrary spacing
  values outside the scale.
- **Images & media**: MUST be optimized and served in modern formats (WebP/AVIF
  with fallbacks). Decorative images MUST NOT block page rendering.
- **Animations**: MUST respect `prefers-reduced-motion`. No animation MUST be
  required to complete a user task.

## Development Workflow

- Each meaningful change or completed feature MUST be committed with a clear,
  imperative commit message (e.g., `feat: add contact section to homepage`).
- Commits MUST be pushed to the project repository after each major edit or
  feature implementation.
- New pages or components MUST be verified in both mobile (≤ 480 px) and
  desktop (≥ 1280 px) viewports before being considered complete.
- Accessibility MUST be checked with a browser-based tool (e.g., axe DevTools)
  before merging any UI change.
- Dependencies MUST be reviewed for size and necessity before being added.
  Prefer native browser APIs over library solutions when equivalent.

## Governance

This constitution supersedes all informal conventions and prior agreements
about how the project is built and maintained.

**Amendment procedure**: Any principle change requires:
1. A documented reason explaining why the current rule is insufficient.
2. An update to this file with an incremented version number.
3. A corresponding commit pushed to the repository.

**Versioning policy** (semantic):
- MAJOR: Removal or fundamental redefinition of a principle.
- MINOR: New principle or section added.
- PATCH: Clarification, wording improvement, or non-semantic refinement.

**Compliance**: Every implementation task MUST be reviewed against this
constitution before being marked complete. The plan-template Constitution
Check gate enforces this at the feature-planning level.

**Version**: 1.0.0 | **Ratified**: 2026-03-19 | **Last Amended**: 2026-03-19
