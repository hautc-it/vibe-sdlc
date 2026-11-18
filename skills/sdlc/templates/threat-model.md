# Threat model (STRIDE-lite) — <product>
- date / version:

## Assets (what an attacker wants)
| Asset | Class | Where stored |
|---|---|---|

## Actors
Anonymous visitor · registered user · other tenant/user · admin · compromised dependency · malicious content fed to AI · insider with a leaked key

## Entry points & trust boundaries
<browser → API; API → DB; API → third parties; webhooks in; file upload; AI prompts/tool calls; admin panel; CI/CD>

## Threats
| # | Entry point | STRIDE | Threat | Likelihood | Impact | Mitigation | Phase | Status |
|---|---|---|---|---|---|---|---|---|
| T1 | login | S (Spoofing) | credential stuffing | M | H | managed auth, rate limit, MFA option | 6/9 | open |

STRIDE = Spoofing · Tampering · Repudiation · Information disclosure · Denial of service · Elevation of privilege.
Add for AI features: prompt injection, sensitive data in prompts/logs, excessive tool permissions, cost exhaustion.

## Top mitigations (must ship before launch)
1.
