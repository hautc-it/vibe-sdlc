# Phase 4 — UI/UX

**Goal:** approved screens, flows and design tokens before UI code. Load `vibe-sdlc:ui-ux` for the full rules; call `hallmark` (or project design skills) per routing.md.

## Steps
1. Page/screen list from PRD; user flows for each MVP feature (Mermaid flowchart): happy path + error paths.
2. For each screen: purpose (one sentence: what the visitor must do here), content priority, primary action.
3. Layout mobile-first (360px) then tablet/desktop; touch targets ≥ 24px (WCAG 2.2) — aim 44px.
4. Design tokens: color (with contrast-checked pairs), type scale, spacing, radius, shadow, motion durations; dark mode if needed.
5. Every data view designs 5 states: loading (skeleton), empty (with next action), error (human message + retry), partial, success.
6. Forms: labels, inline validation, error summary, keyboard order, autocomplete attributes.
7. Prototype: a throwaway HTML mock or `mattpocock-skills:prototype` — show the user, iterate, get approval.

## Output
`docs/sdlc/ui-spec.md` (`templates/ui-spec.md`): sitemap, flows, screen notes, tokens, component list, approved mock link/path.

## Security & privacy in UI
- Never show full secrets/tokens; mask personal data where not needed.
- Destructive actions: confirm + undo where possible.
- Consent/cookie UI only if you actually set non-essential cookies/trackers.
- Error messages must not leak internals (stack traces, SQL, whether an email exists on login).

## Exit criteria
User approved the mock and flows. WCAG 2.2 AA contrast checked for token pairs.
