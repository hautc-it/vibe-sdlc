# Phase 7 — Security & access control

**Goal:** a filled security checklist and an honest list of residual risks. Load `vibe-sdlc:appsec` (application) and `vibe-sdlc:opsec` (operations, accounts, supply chain).

## Steps
1. Run tools (if installed; else note "chưa chạy"): `gitleaks detect`, `osv-scanner scan -r .` (or `npm audit` / `pip-audit`), `semgrep scan --config p/default --metrics=off`.
2. Built-in `/security-review` on the branch diff.
3. `appsec` checklist (OWASP Top 10 2025 + ASVS L1 core) against the threat model from phase 2.
4. Tier L or anything with payments/sensitive data: offer the Cloudflare `security-audit` full audit (gate — it is long and spawns many agents). Its findings are `confirmed` / `needs_validation` / `rejected`; only `confirmed` count as bugs, `needs_validation` go to residual risks.
5. `opsec` checklist: secrets location, 2FA on every account, least-privilege API keys, backups, logs without PII.
6. Privacy: privacy policy matches what the app really collects; consent where needed; data deletion path works.
7. Fix by severity (Critical/High before launch). Each fix gets a regression test.

## Output
`docs/sdlc/security-checklist.md` (copy from appsec skill) with pass/fail/n-a + evidence; residual risks with owner and date.

## Exit criteria
No open Critical/High. Medium risks accepted by the user in writing (STATE `decisions`).
