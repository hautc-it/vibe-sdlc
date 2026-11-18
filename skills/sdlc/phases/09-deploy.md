# Phase 9 — Deploy

**Goal:** running in production with a tested way back. **Production deploy is always a gate.**

## Checklist (`templates/release-checklist.md`)
1. Hosting chosen to fit cost/scale (static/edge host, PaaS, or own server + tunnel). HTTPS everywhere, HSTS.
2. Domain + DNS; `www` and apex both resolve or redirect.
3. Environment variables set in the host's secret store **by the user**; app fails fast if one is missing.
4. Production DB separate from dev; migrations run in a controlled step (backup first → migrate → verify); never `db reset` on prod.
5. Backups on, retention set, restore procedure written (tested in phase 8).
6. Logging + error monitoring (e.g. Sentry or host logs) with PII scrubbing; uptime check; alert to the user's email/phone.
7. Security headers live (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, frame-ancestors) — check with `curl -I`.
8. Rate limits on auth, forms, AI endpoints; cost caps/budgets on paid APIs.
9. Rollback: previous build can be restored in < 10 minutes; DB rollback plan per migration.
10. CI/CD if it fits: deploy from `main` after checks pass; secrets via CI secret store; actions pinned by SHA.
11. Smoke test after deploy: main flows, login, a write, error page, headers.

## Exit criteria
Smoke test passes on production; user confirmed (level 5 → 6).
