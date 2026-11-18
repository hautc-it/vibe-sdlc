---
name: appsec
description: Application security review for web/mobile/API code — quick pass on a diff or feature, or full pre-launch checklist (OWASP Top 10 2025, ASVS L1 core, OWASP LLM Top 10, headers/CSP, Supabase RLS). Use after building any feature that touches input, auth, data access, files, payments or AI; before launch; or when the user asks "có an toàn không", "review bảo mật", "security check".
---

# AppSec

Defensive review of the user's own code. Report findings in Vietnamese: severity (Critical/High/Medium/Low), file:line, what an attacker could do, smallest fix, test that proves the fix. Only claim a finding you can trace in source; otherwise list it under "cần xác minh".

## Mode A — Quick pass (every feature / diff, ~5 minutes)

Run on `git diff` of the change. For each item answer yes / no / n-a:

1. **Authz:** every new endpoint/server action checks *who* and *owns this resource* (not just "logged in"). IDs from the client are never trusted for ownership.
2. **Input:** validated on the server with a schema (type, length, range, enum, format). Uploads: size limit, MIME + magic-byte check, random server-side filename, private storage.
3. **Injection:** parameterised SQL/ORM only; no shell exec with user data; no `eval`/`new Function`; templating auto-escapes; no raw HTML from users without DOMPurify.
4. **Secrets:** none in code, client bundle, logs, error messages, URLs. Server-only keys never imported by client code (`NEXT_PUBLIC_`/`VITE_` prefixes are public!).
5. **Errors:** generic message to user; no stack traces; failures fail closed (deny), not open.
6. **SSRF / open redirect:** server-side fetches of user-given URLs use an allowlist; redirects only to relative paths or allowlisted hosts.
7. **State-changing requests:** POST/PUT/DELETE only, CSRF-protected (SameSite cookies + token or framework protection); idempotent where retried.
8. **Rate limit / cost:** auth, forms, search, AI and email endpoints rate-limited; paid APIs capped.
9. **Data exposure:** API returns only needed fields (no `select *` to client); no PII in logs/analytics.
10. **New dependency?** → `vibe-sdlc:opsec` supply-chain check.

Then run built-in `/security-review` if available.

## Mode B — Full checklist (phase 7, tier L, before launch)

Copy the table into `docs/sdlc/security-checklist.md` and fill status + evidence.

### OWASP Top 10 — 2025
| ID | Category | Check |
|---|---|---|
| A01 | Broken Access Control | deny by default; per-resource ownership checks; RLS on every exposed table; no IDOR (test user A → user B ids); admin routes server-guarded; CORS not `*` with credentials |
| A02 | Security Misconfiguration | security headers (below); debug off; default creds removed; storage buckets private; directory listing off; verbose errors off |
| A03 | Software Supply Chain Failures | lockfile; osv-scanner/npm audit clean of High; CI actions pinned by SHA; no `curl \| sh`; third-party skills/MCP vetted (opsec) |
| A04 | Cryptographic Failures | HTTPS + HSTS; passwords only via managed auth or argon2id/bcrypt; secrets in secret store; sensitive fields encrypted; no home-made crypto |
| A05 | Injection | SQL, NoSQL, OS command, template, LDAP, header, log injection; XSS (reflected/stored/DOM) |
| A06 | Insecure Design | threat model exists; abuse cases handled (enumeration, spam, cost abuse); business-rule limits server-side (price, quantity, quota) |
| A07 | Authentication Failures | managed auth; MFA available for admins; rate limit + lockout/backoff; session rotation on login; secure/HttpOnly/SameSite cookies; password reset tokens single-use + short expiry; no user enumeration |
| A08 | Software or Data Integrity Failures | webhooks verify signature; no unsafe deserialisation; updates/CI artifacts from trusted, pinned sources |
| A09 | Security Logging & Alerting Failures | log auth events, permission denials, admin actions (no secrets/PII); alerts reach a human |
| A10 | Mishandling of Exceptional Conditions | errors fail closed; timeouts on external calls; partial failures don't leave inconsistent state; no sensitive data in error paths |

### ASVS L1 core extras (OWASP ASVS 5.0, level 1 subset)
- Session timeout + logout invalidates server session.
- File upload: type/size limits, stored outside web root or private bucket, served with `Content-Disposition` + correct type.
- Every API documented with its auth requirement.
- Sensitive data not cached by browsers/CDN (`Cache-Control: no-store` on private pages/APIs).

### Security headers (check with `curl -sI`)
`Strict-Transport-Security: max-age=31536000; includeSubDomains` · `Content-Security-Policy` (start: `default-src 'self'; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`; nonces for inline scripts; no `unsafe-eval`) · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy` (disable camera/mic/geolocation unless used).

### Supabase / Postgres specifics
- RLS enabled on every table in `public` (and any exposed schema); test with the anon key that unauthorised selects return 0 rows.
- `service_role` key only on the server; never in the browser, mobile app or repo.
- Policies use `auth.uid()`; `security definer` functions set `search_path` and check the caller.
- Storage buckets private by default; signed URLs with short expiry.

### AI / LLM features — OWASP Top 10 for LLM Applications 2025
| ID | Risk | Check |
|---|---|---|
| LLM01 | Prompt injection (direct & indirect via web pages, files, emails) | treat all model input from users/content as hostile; model cannot change its own permissions; human confirm for impactful actions |
| LLM02 | Sensitive information disclosure | no secrets/PII in prompts unless needed; redact logs; tenant data never mixed in one context |
| LLM03 | Supply chain | pinned model/provider; vetted plugins/MCP |
| LLM04 | Data & model poisoning | trusted sources for RAG/fine-tune data |
| LLM05 | Improper output handling | model output escaped/validated before HTML, SQL, shell, URLs, tool args |
| LLM06 | Excessive agency | least-privilege tools; read-only by default; allowlist actions; per-user scoping |
| LLM07 | System prompt leakage | no secrets or authz logic in system prompts |
| LLM08 | Vector & embedding weaknesses | per-tenant filtering on retrieval; access check on retrieved docs |
| LLM09 | Misinformation | cite sources; show uncertainty; human review for high-stakes output |
| LLM10 | Unbounded consumption | per-user rate limits, max tokens, budget alerts, timeouts |

### APIs — OWASP API Security Top 10 (2023) extras
Object-level authz on every ID in path/body (BOLA) · property-level: clients cannot set `role`, `owner_id`, `price` (mass assignment — allowlist writable fields) · pagination + max page size · business-flow abuse limits (sign-ups, coupons, OTP sends) · inventory of all endpoints incl. old versions and debug routes · validate third-party API responses like user input.

### Mobile apps — OWASP MASVS (if building iOS/Android/React Native/Flutter)
No secrets in the app bundle (it can be decompiled — anything shipped is public) · tokens in Keychain/Keystore, not plain storage · TLS only, no cleartext exceptions · deep links validated (no auth bypass via URL) · WebViews: no JS bridges to untrusted pages · server re-checks everything the app checks · minimal permissions · logs stripped of PII in release builds.

### Payments & webhooks
Hosted checkout (Stripe Checkout / PayOS / VNPay page) so card data never touches your server · amounts computed server-side from product IDs, never trusted from client · webhooks: verify signature, check timestamp, idempotency key, process once · reconcile order state from the provider, not from the redirect URL.

### Privacy (VN + international — cần kiểm tra bản hiện hành)
Privacy policy matches real collection · consent recorded where required · user can export/delete data · cross-border transfer documented (VN: Luật 91/2025/QH15 + Nghị định 356/2025/NĐ-CP — Nghị định 13/2023 no longer applies from 01/01/2026; GDPR if EU users).

## Mode C — Deep audit (escalation)

For tier L with payments, sensitive personal data, multi-tenant data, or AI agents with tools: offer the Cloudflare `security-audit` skill in **full audit mode** (gate: ask — it runs six phases with many sub-agents and writes to `~/security-audit-skill/<repo>/`). Without an OS sandbox it will not execute target code and keeps runtime leads as `needs_validation` — that is expected. Only `confirmed` findings are bugs; copy `needs_validation` into residual risks.

## Output

Vietnamese summary: counts by severity, top 3 fixes, residual risks needing the user's acceptance. Fixes for Critical/High before launch, each with a regression test.
