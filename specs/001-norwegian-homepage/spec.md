# Feature Specification: Norsk Hjemmeside — Spansktimer & COS-P kurs

**Feature Branch**: `001-norwegian-homepage`
**Created**: 2026-03-19
**Status**: Draft
**Input**: User description: Personal service website for Norwegian-language Spanish lessons and COS-P parenting courses

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor books a Spanish lesson intro (Priority: P1)

A Norwegian adult curious about learning Spanish lands on the homepage.
They read about 1-on-1 lessons, see the price (150 kr/t), and click
"Book en gratis introtime" to send a contact inquiry.

**Why this priority**: Primary revenue-generating conversion path. The lesson
offering is simpler to explain and targets the broadest audience.

**Independent Test**: Navigate to the homepage, scroll to the Spanish section,
submit the contact form with "Spansktimer" selected. Delivers an on-screen
confirmation and notifies the site owner.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they scroll to the Spanish
   section, **Then** they see a clear description, pricing (150 kr/t), and a
   "Book en gratis introtime" button.
2. **Given** a visitor who clicks "Book en gratis introtime", **When** they
   fill in name, email, and select "Spansktimer", **Then** they receive an
   on-screen Norwegian confirmation message and the site owner receives an email.
3. **Given** a visitor on a 320 px mobile viewport, **When** they view the
   Spanish section, **Then** all text, pricing, and CTA are readable and
   tappable without horizontal scrolling.

---

### User Story 2 - Parent signs up for COS-P course (Priority: P2)

A Norwegian parent visits the site to learn about the COS-P program. They
read the plain-language description, the format (4 sessions × 1.5 h,
5–7 families), and the price (1 000 kr/familie), then click "Meld interesse"
to express interest in the next course.

**Why this priority**: COS-P targets a specific audience and has a higher
price point — filling each cohort is critical for the business.

**Independent Test**: Visit the COS-P section, read the program description,
submit the contact form with "COS-P kurs" selected. Delivers a Norwegian
confirmation and notifies the site owner.

**Acceptance Scenarios**:

1. **Given** a parent on the homepage, **When** they scroll to the COS-P
   section, **Then** they see a plain-language explanation of COS-P, course
   format, pricing (1 000 kr/familie), and a "Meld interesse" button.
2. **Given** a parent who clicks "Meld interesse", **When** they submit the
   contact form, **Then** they receive a Norwegian confirmation that the site
   owner will follow up with available dates.
3. **Given** a parent using a screen reader, **When** they navigate the COS-P
   section, **Then** all content is accessible and logically ordered.

---

### User Story 3 - Visitor reads the About section and builds trust (Priority: P3)

A visitor wants to know who they are contacting before booking. They read
the About section to understand the provider's background (social work,
mental health care, Spanish fluency) and feel confident enough to reach out.

**Why this priority**: Trust is essential for both services. The About section
supports conversion for US1 and US2 but is not itself a booking step.

**Independent Test**: Navigate to the About section and confirm that a personal
introduction, professional background, and at least one CTA link are present
and accessible.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they scroll to the About
   section, **Then** they see a short personal bio, relevant credentials, and
   a warm, professional Norwegian tone.
2. **Given** a visitor who reads the About section, **When** they are ready to
   act, **Then** at least one CTA (contact or booking link) is visible within
   or immediately below the section.

---

### User Story 4 - Visitor reads testimonials and gains confidence (Priority: P4)

A skeptical visitor reads placeholder quotes from previous students or
course participants before deciding to reach out.

**Why this priority**: Social proof reinforces trust. Placeholder quotes are
sufficient for MVP; real quotes are gathered over time.

**Independent Test**: The testimonials section is visible on the page with at
least two placeholder quotes attributed to a role (e.g., "Elev" or
"Kursdeltaker"). The section is accessible and responsive.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they reach the testimonials
   section, **Then** they see at least 2 quotes with role attribution in a
   design consistent with the page visual language.

---

### Edge Cases

- What happens when the contact form is submitted with an invalid email?
  → Inline validation MUST prevent submission and display a Norwegian error message.
- What happens when the form is submitted successfully?
  → The form MUST be replaced by a Norwegian confirmation message without a full page reload.
- How does the site handle very long input?
  → Fields MUST enforce character limits: name ≤ 100, email ≤ 254, message ≤ 1 000 chars.
- What if JavaScript is disabled?
  → All content sections, pricing, and contact information MUST be visible without JS.
  → The contact form MAY degrade to a mailto fallback.
- What if the visitor is on a slow mobile connection?
  → Images MUST be optimized; the page MUST be usable before all images load.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display a Hero section with a Norwegian headline,
  subheadline, and two primary CTA buttons: "Book spansktime" and
  "Meld deg på COS-P kurs".
- **FR-002**: The site MUST display an About section with a personal
  introduction and professional background (social work, mental health,
  Spanish fluency) in Norwegian.
- **FR-003**: The site MUST display a Spanish Lessons section with a service
  description, target audience (beginners, people moving/traveling to Spain),
  pricing (150 kr/t), and a "Book en gratis introtime" CTA.
- **FR-004**: The site MUST display a COS-P section explaining the program in
  plain Norwegian, the course format (4 sessions × 1.5 h, 5–7 families),
  pricing (1 000 kr/familie), and a "Meld interesse" CTA.
- **FR-005**: The site MUST display a Testimonials section with at least 2
  placeholder quotes attributed to a participant role.
- **FR-006**: The site MUST display a Practical Info section stating online
  delivery, Norwegian as primary language, and contact details.
- **FR-007**: The site MUST include a Contact/Booking section with a form
  collecting name, email, and service interest (Spansktimer / COS-P kurs).
- **FR-008**: The contact form MUST validate inputs client-side and display
  Norwegian-language error messages for invalid or missing fields.
- **FR-009**: On successful form submission, the form MUST display a Norwegian
  confirmation message without a full page reload.
- **FR-010**: Form submission data MUST be delivered to the site owner via
  email using a serverless form service. No database storage of form data
  is required for MVP.
- **FR-011**: The site MUST include a GDPR-compliant notice (Norwegian) on the
  contact form explaining how data is used and that no data is stored
  without consent.
- **FR-012**: The site MUST be fully functional on mobile viewports from 320 px
  to 1440 px wide without horizontal scrolling.
- **FR-013**: The site MUST meet WCAG 2.1 Level AA accessibility requirements:
  semantic HTML, visible focus indicators, keyboard navigability, sufficient
  colour contrast (≥ 4.5:1 normal text, ≥ 3:1 large text), descriptive alt text.
- **FR-014**: The site MUST include Norwegian-language SEO metadata: page title,
  meta description, and Open Graph tags.
- **FR-015**: All user-facing copy MUST be written in Norwegian Bokmål.
- **FR-016**: Payment for Spanish lessons MUST be directed to the provider's
  personal Vipps (link or QR code displayed on the site or sent after booking).
  Invoicing for COS-P courses MUST be done manually via Fiken or equivalent.
  No automated payment processing is in scope for MVP.
- **FR-017**: The site MUST respect the `prefers-reduced-motion` media query;
  no motion-based animation MUST be required to complete any user task.

### Key Entities

- **Service**: A bookable offering. Attributes: name (Norwegian), short
  description, price, format details, target audience, primary CTA label,
  Vipps/payment note.
- **ContactInquiry**: Submitted by a visitor via the contact form. Attributes:
  name, email, service interest (Spansktimer | COS-P kurs), optional message,
  GDPR consent flag.
- **Testimonial**: Social proof item. Attributes: quote text (Norwegian),
  attribution role (e.g., "Elev", "Kursdeltaker").

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor MUST be able to identify both services,
  their prices, and how to contact the provider within 60 seconds of landing.
- **SC-002**: A visitor on mobile MUST be able to complete the contact form
  in under 2 minutes.
- **SC-003**: All pages MUST achieve a Lighthouse accessibility score of ≥ 90.
- **SC-004**: All pages MUST achieve a Lighthouse performance score of ≥ 80
  on a simulated slow mobile connection.
- **SC-005**: The site MUST have zero WCAG 2.1 AA violations as reported by
  an automated accessibility checker (e.g., axe DevTools).
- **SC-006**: The site MUST render without horizontal scroll or overlapping
  elements on viewports from 320 px to 1440 px.
- **SC-007**: Core content (sections, pricing, contact details) MUST remain
  readable and accessible with JavaScript disabled.

---

## Assumptions

- The service provider is a single individual operating without a registered
  company. No formal payment integration is required; Vipps personal transfer
  links and manual Fiken invoicing are sufficient.
- "Form submission" means the data is forwarded to the site owner's email via
  a serverless form service (e.g., Formspree). No server or database is needed.
- Real testimonials are not available at launch; 2–3 placeholder quotes with
  fictional roles will be used until real ones are available.
- A Calendly or similar booking integration is optional for MVP; the contact
  form is the primary booking mechanism.
- The site is a single-page layout — no multi-page routing is required for MVP.
- Provider photos are not available at spec time; tasteful placeholder imagery
  consistent with the design palette (beige, light green, warm gray) will be used.
- Norwegian Bokmål is used for all copy. No multilingual support is in scope
  for MVP.
- The design palette is: soft beige, light green, warm gray; rounded elements;
  ample whitespace consistent with Scandinavian minimalism.
