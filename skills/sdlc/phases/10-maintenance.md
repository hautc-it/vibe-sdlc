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

## Learning loop (idea from Hermes Agent's self-improving skills, with a human in the loop)
After a hard bug, a near-miss, or a task that took several wrong turns, write 3–5 lines in `docs/sdlc/lessons.md` (what happened, root cause, the rule that would have prevented it). Then **propose** — do not apply silently — the smallest durable fix: a line in CLAUDE.md, a check in a phase file, a test, or a lint rule. Apply only after the user agrees. Review lessons quarterly; delete ones that no longer apply.

## Feedback & backlog
- Collect user feedback in one place (issues or a simple table).
- Prioritise by impact × effort; security fixes jump the queue.
- Keep README, architecture, ADRs and STATE current — stale docs are bugs.

## Exit criteria
Maintenance plan agreed; owner for each routine task named (user, Claude via scheduled task, or automation).
