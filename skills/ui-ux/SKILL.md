---
name: ui-ux
description: Modern, accessible UI/UX gate for web and mobile — screen/flow planning, design tokens, the five data states, WCAG 2.2 AA, Core Web Vitals, and a critique/polish/harden vocabulary that keeps output from looking generic AI-made. Use in phase 4 (design), when building or reviewing UI, or when the user says "giao diện xấu", "làm đẹp", "UX", "responsive", "accessibility".
---

# UI/UX gate

If `hallmark` is installed, use it for visual direction and its own gates; if the project has `design-taste-frontend`, `ui-ux-pro-max` or `emil-design-eng`, use those for taste and motion. **Project constraints always win** over any design skill (e.g. no CDN fonts, no UI library, strict CSP). This skill is the fallback and the acceptance gate.

## 1. Plan before pixels
- One sentence per screen: *what must the visitor do here?* Everything on the screen serves that task, in priority order.
- Flows for each MVP feature, including error and empty paths.
- Content first: real copy (not lorem ipsum) and realistic data lengths (long names, 0 items, 10 000 items).
- Show a throwaway mock and get approval before production UI code.

## 2. Gates (adapted from Hallmark's Floor / Reflex / Finish tiers)

**Floor — never ship if any fails**
- Text contrast ≥ 4.5:1 (≥ 3:1 for ≥ 24px or 18.66px bold, UI components and focus rings).
- Visible focus on every interactive element; full keyboard path; no keyboard trap.
- `prefers-reduced-motion` respected; nothing flashes > 3×/s.
- Touch/click targets ≥ 24×24 CSS px (WCAG 2.2 SC 2.5.8); aim for 44px on mobile.
- Every input has a visible label; errors are text, not color only.
- Images have meaningful `alt` (or `alt=""` if decorative); icons-only buttons have accessible names.
- Works at 320–360px wide without horizontal scroll; zoom to 200% works.
- No invented facts, testimonials, logos, metrics or people.
- No layout shift from late-loading fonts/images (set dimensions).

**Reflex — common AI defaults; avoid unless you state a reason**
- Purple-to-blue gradients, glassmorphism everywhere, emoji as icons, centered hero + three feature cards + CTA template.
- Generic copy ("Unlock the power of…", "Seamless", "Revolutionize").
- Inter/system font with no type scale; every card the same radius + shadow; random accent colors.
- Decorative animation on everything; spinners where a skeleton fits.

**Finish — craft that lifts quality (non-blocking)**
- Type scale with clear hierarchy (≤ 3 sizes per screen region), line length 45–75 characters.
- Spacing on a 4/8px scale; consistent alignment grid.
- Purposeful motion: 150–250ms UI, ease-out for enter, ease-in for exit; animate opacity/transform only.
- Empty states that teach the next action; microcopy in the user's language and voice.
- Dark mode via tokens, not inverted colors.

## 3. Design tokens (CSS custom properties or the framework's theme)
Color roles (bg, surface, text, text-muted, border, primary, primary-contrast, danger, success, warning, focus) · type scale · spacing scale · radius · shadow · motion (durations, easing). Define light + dark; check every text/background pair's contrast.

## 4. The five states for every data view
Loading (skeleton matching final layout) · Empty (why + next action) · Error (human message + retry + no internals) · Partial (some data failed) · Success (incl. confirmation of writes, optimistic UI only with rollback).

## 5. Forms
Label above field · `autocomplete` and correct `type`/`inputmode` · validate on blur and on submit · error summary at top linking to fields · do not clear input on error · disable double submit · clear success feedback.

## 6. Performance (Core Web Vitals, field targets)
LCP < 2.5s · INP < 200ms · CLS < 0.1. Ship less JS; responsive images (`srcset`, AVIF/WebP, width/height set); self-host fonts with `font-display: swap` and subsetting; lazy-load below the fold; no blocking third-party scripts.

## 7. Review vocabulary (ideas borrowed from Impeccable's command set — run them as checklists, no tool install needed)
- **critique:** score 1–5 on hierarchy, clarity of primary action, consistency, accessibility, delight; list top 3 fixes.
- **audit:** run Floor gate + axe-core (via Playwright `@axe-core/playwright` if available) + Lighthouse; report numbers.
- **distill:** remove one element per section that does not serve the screen's task.
- **clarify:** rewrite labels/errors/empty states in plain user language.
- **adapt:** check 360 / 768 / 1280px and touch vs mouse.
- **harden:** long text, missing images, slow network, offline, 0/1/10 000 items, RTL/diacritics (Vietnamese: test "Nguyễn Thị Phương Thảo").
- **polish:** spacing, alignment, type rhythm, focus styles, motion timing — last, after the above pass.

## Output
Phase 4: `docs/sdlc/ui-spec.md` approved. Build/review: Floor gate table (pass/fail + evidence), critique scores, top fixes — in Vietnamese.
