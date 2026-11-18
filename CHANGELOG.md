# Changelog

## 0.2.0 — 2026-11-18
- Legal: replace Nghị định 13/2023 (superseded) with Luật BVDLCN 91/2025/QH15 + Nghị định 356/2025/NĐ-CP; 72h breach note.
- opsec: limits of permission deny rules; sandbox as the real boundary; env-var inheritance.
- kit: settings.json uses current rule syntax, allows `.env.example`, denies `~/.ssh`/`~/.aws`, enables sandbox with a registry allowlist (tested headless).
- appsec: OWASP API Top 10 extras, OWASP MASVS (mobile), payments & webhooks.
- token-economy: aligned with current Claude Code docs (`/usage`, `/context`, `/insights`, `/effort`, `/rewind`, output-filter hooks, CLI over MCP).
- taste-skill (design-taste-frontend) promoted to recommended for marketing sites; hallmark for apps; one aesthetic skill per project.
- New optional mod `vibe-sdlc-status` (band + `/sdlc-status`, read-only, tested).
- opsec: how to vet Claude Code mods. Phase 10: human-approved learning loop (idea from Hermes Agent). THIRD-PARTY: mods + Hermes Agent decisions.
- README: cheat sheet of example prompts. Project instructions: breach, mobile/API/payment rules.

## 0.1.0 — 2026-11-18
- Initial plugin: sdlc orchestrator (phases 0–10, S/M/L tiers, gates, STATE), appsec, opsec, ui-ux, token-economy, kit, THIRD-PARTY vet log, Vietnamese Claude.ai Project instructions.
