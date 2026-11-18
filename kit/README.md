# kit — starter files for a new project

**English** · [Tiếng Việt](README.vi.md)

Copy what fits into your project (phase 5). Nothing here installs itself.

| File | Purpose |
|---|---|
| `.gitignore` | Keeps secrets, builds and `node_modules` out of commits |
| `.env.example` | Environment variable names only, no values |
| `.claude/settings.json` | Stops Claude reading `.env`/keys, blocks dangerous commands, asks before push/deploy/package installs, turns on the sandbox |
| `.pre-commit-config.yaml` | gitleaks blocks commits that contain secrets (`pre-commit install`) |
| `.github/workflows/security.yml` | CI: gitleaks + osv-scanner + semgrep, actions pinned by commit SHA |
| `.github/dependabot.yml` | Weekly update PRs for dependencies and actions |
| `SECURITY.md` | How others can report a vulnerability to you |

Adjust `.env.example`, the `dependabot.yml` ecosystem and the `ask` list in `settings.json` to your stack.

**About `.claude/settings.json`:**
- Tested for real (2026-11-18): Claude can read `.env.example` and is blocked from reading `.env`.
- `deny` rules are a guard rail, not a boundary: they do not stop a Python/Node script that opens the file itself, or `grep -r`. The real boundary is the **sandbox** (enabled in this file): shell commands can only write inside the project, can only reach domains in `allowedDomains`, and cannot read `~/.ssh` or `~/.aws`.
- If a command needs another domain (for example the Supabase or Vercel CLI API), add it to `sandbox.network.allowedDomains` — Claude Code asks when something is blocked.
- Works out of the box on macOS; Linux/WSL2 need `bubblewrap` and `socat`.
