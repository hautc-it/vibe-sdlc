# Phase 10 — Maintain & grow

**Goal:** the system stays healthy without constant AI firefighting.

## Routine (write as `docs/sdlc/maintenance.md`)
| Cadence | Task |
|---|---|
| Daily (automatic) | error alerts, uptime, backup success |
| Weekly | read error logs; Dependabot PRs (patch/minor) after CI passes |
| Monthly | `osv-scanner`/audit; check costs vs budget; review access (remove ex-staff, unused keys); restore test from a recent backup (quarterly at least) |
| Quarterly | rotate long-lived API keys; review privacy policy vs reality; re-run `appsec` on changed areas; update threat model |
| Per change | impact check → tier S/M/L → this workflow |

## Feedback & backlog
- Collect user feedback in one place (issues or a simple table).
- Prioritise by impact × effort; security fixes jump the queue.
- Keep README, architecture, ADRs and STATE current — stale docs are bugs.

## Exit criteria
Maintenance plan agreed; owner for each routine task named (user, Claude via scheduled task, or automation).
