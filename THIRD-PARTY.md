# Third-party skills & tools — vet log

vibe-sdlc **does not copy** third-party code. It routes to these projects if you install them yourself (see `skills/sdlc/routing.md`). Vet procedure: `skills/opsec/SKILL.md` §6. Re-vet on every update.

Sources: GitHub trending (daily + monthly) and the projects' READMEs, read 2026-11-18. Repos marked *vetted* were shallow-cloned into a scratch folder, and their SKILL files, hooks, scripts and licences were read. None of their scripts were run.

## Recommended installs (you run these yourself; installing is a gate)

| Project | Licence | Vetted commit (date) | What we use it for | Findings / local rules |
|---|---|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | MIT | `22f0b463e7a5e579904dd6211a520321035526f7` (2026-11-03), v7.0.2 | Phase 6–8 dev loop: brainstorming, worktrees, writing-plans, subagent-driven-development, TDD, systematic-debugging, verification-before-completion, code review, finishing a branch | One **SessionStart hook** that only reads its own `using-superpowers/SKILL.md` (~3 KB) and injects it into every session — local, no network. Costs ~3 KB context per session. `diagnosing-superpowers` can call the public GitHub issues API when you ask it to. |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | MIT | `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8` (2026-09-14) | Phase 2/7 threat-hunting guidance; full 6-phase audit for tier L | No hooks. Two zero-dependency Node validators (`fs`, `path` only). Guidance mode by default; full audit only on explicit request, writes to `~/security-audit-skill/<repo>/run-N`. Wants an OS sandbox with networking off to run target code — without one it keeps runtime leads as `needs_validation`. |
| [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | `04977e15f3dfd6ee4b74c887dac3eb52665d6c92` (2026-11-11), v2.0.0 | Phase 4/8 visual direction, Floor/Reflex/Finish gates, multi-width lint, redesign/audit | **Do not run `install-hook.mjs`** (an edit-time lint hook). `imagegen.mjs` calls `api.together.xyz` **only if `TOGETHER_API_KEY` is set** — leave it unset unless you want paid AI images. `theme.mjs` downloads photos from Wikimedia Commons (own CC licences, credited) — check licence before shipping. Browser lint needs `puppeteer-core` + Chrome (optional). |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (`design-taste-frontend`) | MIT | `f6b76575f949707b4e3c37cd86cb44b0b98643e8` (2026-11-07), v2.5.1 | Phase 4/8 for **marketing / company websites and landing pages**: art direction, one idea per screen, real product UI, copy lint, consistency + performance checks in a real browser | SKILL.md frontmatter declares a **Stop hook** that runs `scripts/gate.mjs` (headless Chrome against your localhost build) whenever Claude stops while the skill is active — local only, but automatic and slow. Keep it if you want the finish gate; remove the `hooks:` block for a lighter run. `icons.mjs` / `photos.mjs` download icons and photos from jsDelivr/GitHub — check each licence; skip them if the project forbids CDN or external assets. Do not use its starter/bundled photos without checking the licence. |
| [anthropics/skills](https://github.com/anthropics/skills) → `example-skills` | Apache-2.0 (per skill) | `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` (2026-11-16) | `webapp-testing` (Playwright E2E), `skill-creator`, `frontend-design`, `mcp-builder` | Official Anthropic repo. `webapp-testing/scripts/with_server.py` starts your dev server locally. |
| [mattpocock/skills](https://github.com/mattpocock/skills) (already installed) | MIT | `49dd158d1076134a641b33efb035946536778336` v1.3.1 | grilling, domain-modeling/ADR, codebase-design, prototype, code-review, diagnosing-bugs, wizard, writing-for-agents | Used in earlier projects. |

Install commands (inside Claude Code; run them yourself):
```
/plugin install superpowers@claude-plugins-official
/plugin marketplace add Nutlope/hallmark           →  /plugin install hallmark@hallmark
/plugin marketplace add Leonxlnx/taste-skill       →  /plugin install taste-skill@taste-skill
/plugin marketplace add anthropics/skills          →  /plugin install example-skills@anthropic-agent-skills
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit --global
```
After installing, check the installed commit matches the table (`/plugin` → details, or the cache folder under `~/.claude/plugins/cache/`). If it is newer, re-vet before use.

## Tools (CLI, run locally / in CI)

| Tool | Licence | Use |
|---|---|---|
| [gitleaks](https://github.com/gitleaks/gitleaks) | MIT | secret scanning — pre-commit + CI (v8.30.1, already installed via Homebrew on this Mac) |
| [osv-scanner](https://github.com/google/osv-scanner) | Apache-2.0 | dependency vulnerabilities (CI reusable workflow pinned) |
| [semgrep](https://github.com/semgrep/semgrep) CE | LGPL-2.1 | SAST, `p/default` ruleset, `--metrics=off` |
| [trivy](https://github.com/aquasecurity/trivy) | Apache-2.0 | containers / IaC if you use Docker |
| [OpenSSF Scorecard](https://github.com/ossf/scorecard) | Apache-2.0 | rate a dependency's security practices before adopting it |
| [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) | Apache-2.0 | vet skills: `quality-check` + `validate --tiers 1` (no API key). Experimental. Commit seen `affe1acc3d0a24877c5d508d96ac69663a7fd92a` (2026-11-18) |
| [Playwright](https://github.com/microsoft/playwright) + [axe-core](https://github.com/dequelabs/axe-core) | Apache-2.0 / MPL-2.0 | E2E + accessibility tests |
| [uv](https://github.com/astral-sh/uv) | MIT/Apache-2.0 | Python env + deps (trending) |
| [ccusage](https://github.com/ryoppippi/ccusage) | MIT | local Claude Code token/cost reports (not vetted yet — vet before first run) |

## Ideas borrowed, not installed

| Project | Why not installed | What we borrowed |
|---|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0) | Telemetry on by default; downloads an engine binary; design hook scans edited files; live mode runs `claude`/`codex` **with approvals and sandbox disabled**; fetches a remote catalog on each new design | Command vocabulary (critique, audit, distill, clarify, adapt, harden, polish) as checklists in `skills/ui-ux` |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) (MIT) | 300+ skills and auto-running hooks (heavy context, broad blast radius); one command sends diffs to OpenAI | strategic compaction, context budget, verification loop, search-first ideas in `skills/token-economy`; its AgentShield scanner is a candidate to vet separately |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) (Apache-2.0) | Hooks capture every tool call; an "observer" model (possibly hosted) summarises them; anonymous analytics on by default — secrets/PII exposure risk | STATE.md handoff + Claude Code's built-in memory instead |

## Claude Code mods

| Item | Decision |
|---|---|
| `mods/vibe-sdlc-status` (this repo) | Optional install. Read-only: band above the prompt with phase/tier/status + `/sdlc-status` (no Claude turn, no tokens). `claude plugin validate` lists hooks `session.start, turn.complete, command.run, ui.render(AbovePrompt)` and calls `$.command.register, $.fs.exists, $.fs.read, $.session.root, $.state.*, $.ui.resolve` only. 3/3 `claude plugin test` pass (2026-11-18). |
| Anthropic sample mods ([claude-code-playground/claude-code/mods](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods)): `token-weather` (context forecast above the prompt), `blast-radius` (holds `rm -rf`/force push and shows impact before you confirm) | Worth trying; not vetted yet. `blast-radius` fits the gates of this workflow. Vet with `claude plugin validate` first (opsec §6). |
| Built-in `cc-plugin-telemetry` | Sends Claude Code's own analytics; disable in `/plugin` or with `DISABLE_TELEMETRY` if you want. |

## Other agent harnesses

| Project | Decision |
|---|---|
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (MIT) | **Not adopted as the main agent** — you work in Claude Code, and running two agents with their own memory doubles cost and attack surface. Its skills follow the same `SKILL.md` / agentskills.io format, so the five skills in `skills/` should work there too (copy them into Hermes' skills folder per its docs — not tested). Idea borrowed: self-improving skills → the human-approved **learning loop** in phase 10. Caution if you try it: it auto-writes skills and memory; review what it writes and run it with its container/sandbox backend. |

## Optional — not vetted yet
- [backnotprop/plannotator](https://github.com/backnotprop/plannotator) — visual plan review/annotation for agent plans.
- [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) — browser automation CLI for agents.
- [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) — UI generation via Stitch MCP.
- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — index only; vet each server.

## Not recommended
- [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) — offensive red-team bundle. Only on systems you own or are authorised to test; the defensive Cloudflare skill covers our needs.
