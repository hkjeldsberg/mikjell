# Quickstart: Norsk Hjemmeside

**Branch**: `001-norwegian-homepage` | **Date**: 2026-03-19

Use this guide to verify the site works end-to-end after implementation.
Run each step in sequence — stop and report any failure.

---

## Prerequisites

- Node.js ≥ 20 LTS
- A Web3Forms account with a verified access key
- Git (on branch `001-norwegian-homepage`)

---

## 1. Install dependencies

```bash
npm install
```

Expected: no errors, `node_modules/` created.

---

## 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

Get your key at: https://web3forms.com (free, EU data residency selected).

---

## 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000 in a browser.

**Verify**:
- [ ] Page loads without console errors
- [ ] Hero section visible with headline and two CTA buttons
- [ ] Navigation anchors scroll smoothly to sections
- [ ] Correct Norwegian copy throughout

---

## 4. Verify responsive layout

Open browser DevTools → toggle device toolbar.

**Mobile (375 px)**:
- [ ] No horizontal scrollbar
- [ ] Hero CTAs stack vertically
- [ ] All text is ≥ 16 px (1 rem)
- [ ] Touch targets ≥ 44 × 44 px (inspect with DevTools)

**Desktop (1280 px)**:
- [ ] Hero CTAs render side by side
- [ ] Testimonials display in 2-column grid
- [ ] No content overflows container

---

## 5. Test contact form

**Happy path**:
1. Click "Book spansktime" in the Hero → page scrolls to `#kontakt`
2. "Spansktimer" MUST be pre-selected in the interest dropdown
3. Fill in: name `"Test Bruker"`, email `"test@example.no"`, consent checked
4. Submit → spinner on button → success message in Norwegian appears
5. Check site owner's email for the inquiry

**Validation**:
- [ ] Submit with empty name → Norwegian error message appears
- [ ] Submit with invalid email (`"notanemail"`) → Norwegian error message appears
- [ ] Submit without GDPR checkbox checked → button stays disabled or error shown

---

## 6. Accessibility check

Install [axe DevTools browser extension](https://www.deque.com/axe/).

1. Open http://localhost:3000
2. Open axe DevTools → Analyze
3. **Expected**: 0 critical violations, 0 serious violations
4. [ ] All images have alt text (or `alt=""` for decorative)
5. [ ] Tab through page — focus indicator visible on every interactive element
6. [ ] Screen reader (VoiceOver/NVDA): headings navigate correctly (h1 → h2 → h2...)

---

## 7. Performance check

Run Lighthouse from Chrome DevTools → Lighthouse tab → Mobile.

**Expected scores**:
- [ ] Performance ≥ 80
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

---

## 8. Static export

```bash
npm run build
```

Expected: `out/` directory created, no build errors.

```bash
npx serve out
```

Open http://localhost:3000. Repeat steps 3–7 on the static build.
Contact form MUST work (Web3Forms is client-side; no server required).

---

## 9. Deploy to Netlify

```bash
# One-time: connect repo to Netlify via the Netlify dashboard
# Set environment variable in Netlify UI:
#   NEXT_PUBLIC_WEB3FORMS_KEY = <your key>
git push origin 001-norwegian-homepage
```

Netlify auto-deploys on push. Verify on the production URL:
- [ ] Site loads over HTTPS
- [ ] Custom domain resolves (when configured)
- [ ] Contact form delivers email in production

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Form submission fails silently | Wrong Web3Forms access key | Check `.env.local` |
| Hydration error in dev | Client/server HTML mismatch | Check for non-deterministic rendering |
| Images not loading on static export | `unoptimized` not set | Add `unoptimized: true` in next.config.ts for static export |
| WCAG contrast failure | Colour token value drift | Verify tokens against data-model.md contrast table |
