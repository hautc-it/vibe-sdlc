# Routing — which specialist skill per phase

Check the session's available-skills list. Use the first available option; if none is installed, follow the fallback (the instructions in this plugin are enough on their own). Never install a missing skill yourself — tell the user the install line from `THIRD-PARTY.md` and that it is a gate.

| Phase | Need | 1st choice | 2nd choice | Fallback |
|---|---|---|---|---|
| 1 | Clarify intent, one question at a time | `superpowers:brainstorming` | `mattpocock-skills:grilling` | Ask 3–5 short grouped questions yourself (phase file lists them) |
| 1 | Stress-test a plan | `mattpocock-skills:grilling` | — | List top 5 assumptions + how each could be wrong |
| 2 | Glossary, ADRs | `mattpocock-skills:domain-modeling` | — | `templates/ADR.md` |
| 2 | Module boundaries, testable seams | `mattpocock-skills:codebase-design` | — | Keep modules by feature; one public entry per module |
| 2/7 | Threat model, deep security review | `security-audit` (Cloudflare) in **guidance mode** | `vibe-sdlc:appsec` | `templates/threat-model.md` |
| 4 | Visual direction for **apps / dashboards / tools** | `hallmark` | `ui-ux-pro-max` (if project has it) | `vibe-sdlc:ui-ux` |
| 4 | Visual direction for **marketing / company sites / landing pages** | `design-taste-frontend` (taste-skill) | `hallmark` | `vibe-sdlc:ui-ux` |
| 4 | Motion | `emil-design-eng` and animation skills (if project has them) | — | `vibe-sdlc:ui-ux` motion rules |
| 4 | Throwaway UI/state prototype | `mattpocock-skills:prototype` | `example-skills:frontend-design` | Static HTML mock in scratch dir |
| 6 | Isolated workspace | `superpowers:using-git-worktrees` | — | New branch |
| 6 | Break work into small verified tasks | `superpowers:writing-plans` | plan mode | `templates/` feature section + checklist |
| 6 | Execute plan | `superpowers:subagent-driven-development` (L) / `superpowers:executing-plans` (M) | — | Do tasks in order, test after each |
| 6 | Test-first | `superpowers:test-driven-development` | `mattpocock-skills:tdd` | Write failing test → code → green → refactor |
| 6 | Bug / failing test | `superpowers:systematic-debugging` | `mattpocock-skills:diagnosing-bugs` | Reproduce → hypothesise → prove → fix → regression test |
| 6/8 | Before claiming done | `superpowers:verification-before-completion` | — | Section 6 of SKILL.md |
| 6/8 | Code review | `superpowers:requesting-code-review` | `mattpocock-skills:code-review` / built-in `/code-review` | Re-read diff against spec + appsec quick pass |
| 7 | Diff-level security review | built-in `/security-review` | `vibe-sdlc:appsec` | — |
| 7 | Full audit (tier L, before launch) | `security-audit` (Cloudflare) **full audit mode** — only when user asks/approves | — | `vibe-sdlc:appsec` full checklist |
| 8 | E2E browser tests | `example-skills:webapp-testing` (Playwright) | built-in `run` skill | Manual test script in test report |
| 8 | UI quality audit | `hallmark` audit | `vibe-sdlc:ui-ux` audit | — |
| 6/8 | Merge / finish branch | `superpowers:finishing-a-development-branch` | `mattpocock-skills:pr` | Gate: ask before merge/push |
| any | Steps only the user can do (dashboards, keys, DNS) | `mattpocock-skills:wizard` | — | `operator_todo` list in STATE |
| any | Write or edit a skill | `superpowers:writing-skills` | `example-skills:skill-creator` / `mattpocock-skills:writing-for-agents` | — |
| any | Context getting large / cost | `vibe-sdlc:token-economy` | — | — |
| any | Installing anything third-party | `vibe-sdlc:opsec` (supply chain section) | — | — |

## Overlaps — decided once, do not re-debate

- Design taste: use **one** aesthetic skill per project (hallmark *or* taste-skill), recorded in STATE `decisions` — two taste skills pull the design in different directions. `vibe-sdlc:ui-ux` Floor gate applies on top of either.
- TDD: superpowers first (stricter red-green). Debugging: superpowers first.
- Clarifying: superpowers brainstorming for new features; mattpocock grilling when the user explicitly wants to be challenged.
- Code review: superpowers for plan-vs-code; built-in `/code-review` for correctness bugs; `/security-review` for security.
- When superpowers' own flow and this workflow disagree on *gates*, this workflow wins (gates are the user's rules). On *how to code/test*, superpowers wins.
