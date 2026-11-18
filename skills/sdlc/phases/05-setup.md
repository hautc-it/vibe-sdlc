# Phase 5 — Project setup

**Goal:** a skeleton that runs, is versioned, and has security tooling from the first commit. Copy what fits from the plugin `kit/` folder (`../../kit/` relative to this skill directory).

## Steps
1. `git init` (or verify repo). Default branch `main`; work on feature branches.
2. Folder structure by feature/module; separate frontend, server, db (migrations), tests, docs. No 1000-line files.
3. `README.md` (what, how to run, how to test, how to deploy), `.gitignore` (kit), `.env.example` with **names only**, `SECURITY.md` (how to report a vuln).
4. Lint + format + type check (e.g. ESLint/Prettier/TypeScript strict, or Ruff/mypy for Python, `uv` for Python deps). One command to run all checks (`npm run check` / `make check`).
5. Lockfile committed; exact or caret versions per ecosystem norm; no packages younger than ~2 weeks unless needed.
6. Security tooling:
   - `gitleaks` pre-commit hook (kit `.pre-commit-config.yaml`) — blocks committing secrets.
   - CI: kit `.github/workflows/security.yml` (gitleaks + osv-scanner + semgrep) — actions pinned by commit SHA.
   - Dependabot/Renovate (kit `.github/dependabot.yml`).
   - Claude Code project guard: kit `.claude/settings.json` (deny reading `.env*`, deny `rm -rf`, force push, `curl | sh`).
7. Naming conventions written in CLAUDE.md (files, components, DB snake_case, API routes).
8. First commit: "chore: project skeleton". Connect GitHub **only with permission** (gate); repo private by default.

## Exit criteria
`check` command passes on a clean clone; app starts; gitleaks hook blocks a fake key (test it with an obviously fake string, then remove it).
