# vibe-sdlc

**English** · [Tiếng Việt](README.vi.md)

A security-first, 10-phase software delivery workflow for **builders who are not professional developers** working with Claude Code: understand → design → build in small pieces → verify → secure → ship → maintain. Security (AppSec + OpSec) is built into every phase, reports to the user are in plain Vietnamese, and the deep work is routed to the best open-source skills available instead of rewriting them.

## What's inside

| Skill | Invoke | Use it for |
|---|---|---|
| `sdlc` | `/vibe-sdlc:sdlc` or just say "I want to build…" | Orchestrates the 10 phases, phase gates, the STATE file and phase reports |
| `appsec` | `/vibe-sdlc:appsec` | 5-minute security pass per feature, or the full pre-launch checklist (OWASP Top 10 2025, ASVS L1, LLM Top 10, API Top 10, MASVS, Supabase RLS) |
| `opsec` | `/vibe-sdlc:opsec` | Secrets, 2FA, backups, logging, hardening Claude Code itself, **vetting plugins/skills/MCP/mods before installing** |
| `ui-ux` | `/vibe-sdlc:ui-ux` | Screens and flows, WCAG 2.2 AA, the five data states, Core Web Vitals, avoiding "AI-generated" looks |
| `token-economy` | `/vibe-sdlc:token-economy` | Cutting token use and cost without lowering quality |

Also included:
- `kit/` — starter files for new projects: `.gitignore`, `.env.example`, Claude Code settings that block reading `.env` and enable the sandbox, gitleaks pre-commit, SHA-pinned security CI (gitleaks + osv-scanner + semgrep), Dependabot, `SECURITY.md`.
- `mods/vibe-sdlc-status` — optional read-only Claude Code mod: a band above the prompt with the current phase/tier/status, and `/sdlc-status` (no Claude turn, no tokens).
- `THIRD-PARTY.md` — vetted open-source picks with commit SHAs, and what was rejected and why.
- `PROJECT-INSTRUCTIONS.vi.md` — a Vietnamese version to paste into Claude.ai Project instructions.

## The phases

```
0 Intake → 1 Requirements → 2 Architecture → 3 Database → 4 UI/UX → 5 Setup
→ 6 Build → 7 Security → 8 Testing → 9 Deploy → 10 Maintain
```

- **Risk tiers:** S (small fix: fast path), M (feature: one-page spec), L (new product, auth, payments, personal data: all phases).
- **Autonomy:** `ask` (confirm every decision) or `delegate` (Claude decides small product details and logs them).
- **Always-ask gates:** deleting data, production DB or deploy, push/publish, paid services, installing third-party code, creating or rotating secrets.
- **Six verification levels:** code written · syntax checked · ran it · tests passed · deployed · accepted by the user. Claude must state which level it reached.
- **`docs/sdlc/STATE.md`** in each project lets a new session pick up where the last one stopped without re-explaining.
- **Legal (Vietnam):** Personal Data Protection Law 91/2025/QH15 and Decree 356/2025/NĐ-CP (in force 1 Jan 2026, replacing Decree 13/2023); GDPR/CCPA prompts when users are abroad. Not legal advice.

## Routing to open-source skills

| Phase | Specialist skill (if installed) |
|---|---|
| 1 Requirements | superpowers `brainstorming`, mattpocock `grilling` |
| 2 Architecture | mattpocock `domain-modeling`, `codebase-design`; Cloudflare `security-audit` (threat model) |
| 4 UI/UX | Apps/dashboards: `hallmark` · Marketing sites/landing pages: `taste-skill` (one per project) · motion: Emil Kowalski's skills |
| 6 Build | superpowers: worktree → writing-plans → TDD → subagent-driven-development → code review |
| 7 Security | built-in `/security-review`; Cloudflare `security-audit` (deep audit) |
| 8 Testing | Anthropic `webapp-testing` (Playwright), hallmark audit |

If a skill is missing, the plugin falls back to its own instructions. Details: `skills/sdlc/routing.md`.

## Install

In Claude Code:
```
/plugin marketplace add hautc-it/vibe-sdlc
/plugin install vibe-sdlc@vibe-sdlc
/plugin install vibe-sdlc-status@vibe-sdlc      # optional status mod
```
Recommended companions (read `THIRD-PARTY.md` first — installing runs third-party code):
```
/plugin install superpowers@claude-plugins-official
/plugin marketplace add Nutlope/hallmark
/plugin install hallmark@hallmark
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit --global
```
Optional CLI tools: `brew install gitleaks pre-commit osv-scanner semgrep`.

Other agents (Hermes Agent, Codex, Cursor…): the five skills in `skills/` are standard `SKILL.md` files and should work when copied into that agent's skills folder (not tested).

## Getting started

- **New project:** open an empty folder and say *"I want to build …"* (or run `/vibe-sdlc:sdlc`). Claude starts at phase 0–1, asks short groups of questions, creates `docs/sdlc/STATE.md`, and writes **no code yet**.
- **Existing project:** `/vibe-sdlc:sdlc` — Claude maps what exists to the phases and does not redo finished work.
- **Quick fix:** just ask; Claude classifies it as tier S and takes the short path.

## Example prompts

| You want to | Say to Claude |
|---|---|
| Start a new product | "I want to build an app for … Follow vibe-sdlc." |
| Continue yesterday's work | "Read STATE and continue." |
| Add a feature | "Add feature … (tier M)." |
| Fix something small | "The … button is misaligned on mobile, fix it." |
| Let Claude decide details | "Switch autonomy to delegate." |
| Security check | "/vibe-sdlc:appsec on the feature we just built" · before launch: "run the full security checklist" |
| Vet a new plugin/library | "/vibe-sdlc:opsec vet repo … before I install it" |
| UI looks generic | "/vibe-sdlc:ui-ux critique page …" |
| Context is long / costly | "/vibe-sdlc:token-economy", then `/usage`, `/context` |
| Where are we? | "Give me the phase report." |

## Updating

Run `/plugin marketplace update vibe-sdlc` in Claude Code. For local development: clone the repo, then `/plugin marketplace add ./vibe-sdlc`.

## License

MIT. Third-party projects keep their own licenses (see `THIRD-PARTY.md`); this plugin contains none of their code.
