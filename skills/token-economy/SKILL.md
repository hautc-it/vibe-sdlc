---
name: token-economy
description: Habits that cut token use and cost in Claude Code without lowering quality — progressive disclosure, STATE handoff, lean CLAUDE.md, plan mode, sub-agents for verbose work, /clear vs guided /compact, targeted reads, model and effort choice, output-filtering hooks, and usage tracking with /usage and /context. Use when context is getting long, the session feels slow or expensive, before a large task, or when the user asks "tiết kiệm token", "đỡ tốn tiền", "context đầy", "hết quota".
---

# Token economy

Explain to the user in Vietnamese; apply the habits yourself without being asked. Verified against Claude Code docs ("Manage costs effectively") on 2026-11-18 — commands change, so check `/help` if one is missing.

## 1. Load less
- **Progressive disclosure:** keep `SKILL.md` short and load reference files only when needed (this plugin reads one phase file at a time). Same for project docs: CLAUDE.md links to docs instead of pasting them.
- **CLAUDE.md lean** (official guidance: under 200 lines; this workflow aims for ~150). It loads into every request. Move workflow-specific instructions (migrations, releases, reviews) into skills, which load only when used.
- **Few always-on extras:** every installed skill adds its description to each session, and a SessionStart hook can inject kilobytes (superpowers adds ~3 KB). Install per project when a skill is only used there; remove what you stopped using.
- **Prefer CLI tools over MCP servers** when both exist (`gh`, `supabase`, `vercel`, `sentry-cli`); disable unused MCP servers with `/mcp`.
- **Read targeted:** search first (Grep/Glob or a code-intelligence plugin for typed languages), then read the needed line range. Do not re-read a file you just edited.
- **Do not paste big outputs:** pipe through `head`, `tail`, `grep`, `jq`, `wc -l`; run tests with a reporter that prints failures only. For repeated noisy commands, a PreToolUse hook can append `| tail -n 100` to test runs (see the docs' `filter-test-output.sh` example) — review any hook before installing (`opsec` §6).

## 2. Carry state in files, not in chat
- `docs/sdlc/STATE.md` (phase, decisions, next step) lets a fresh session continue with a ~1–2 KB read instead of a long history.
- Plans and specs live in files; the conversation references them by path.
- **`/clear` between unrelated tasks — it costs nothing.** Update STATE first; use `/rename` before clearing if you may `/resume` later.

## 3. Compact deliberately
- `/compact` itself reads the whole conversation (a large request). Prefer `/clear` + STATE when continuity is not needed.
- When you do compact, do it at a natural boundary (after a phase or a committed feature) and steer it: `/compact keep: current phase, open decisions, failing test names, changed file paths; drop: exploration output`.
- Put a `# Compact instructions` section in CLAUDE.md so auto-compaction keeps the right things.
- `/context` shows what fills the window (system, tools, MCP, memory, files).

## 4. Delegate verbose work
- Running full test suites, reading long logs, fetching docs, broad codebase searches → a sub-agent; only its summary returns to the main context. Give it a tight brief and an output format.
- Use a smaller model for simple sub-agent tasks (`model: haiku` in the sub-agent definition).
- Do not spawn a sub-agent for something 1–2 greps answer; each starts cold and pays its own tokens. Agent teams cost several times more — keep them small and shut them down.

## 5. Plan, then build
- Plan mode (Shift+Tab) or `superpowers:writing-plans` for tier M/L: a 1-page plan avoids expensive wrong turns.
- Course-correct early: Esc to stop, `/rewind` (or Esc Esc) to go back to a checkpoint instead of arguing forward.
- Give verification targets (tests, expected output) so Claude self-checks instead of you asking for fixes.
- Specific prompts ("add input validation to `login` in `auth.ts`") beat vague ones ("improve this codebase").

## 6. Right model, right effort
- Hard architecture, debugging, security review → strongest model, higher effort.
- Mechanical edits, renames, formatting, simple searches → a cheaper model or lower `/effort`.
- Switching model mid-session re-reads the whole conversation uncached once — switch at boundaries, not back and forth.
- Batch independent tool calls in one turn.

## 7. Measure
- `/usage` — session tokens and estimated cost (API users), plan usage bars, attribution by skill/sub-agent/plugin/MCP, prompt-cache hit rate, and recommendations (press `f` to apply the ones it can).
- `/context` — what occupies the context window right now.
- `/insights` — report on your working patterns and friction (it uses tokens itself; run occasionally).
- Optional: `ccusage` (local log reader, third-party) for daily/monthly reports — vet before first run.
- Prompt caching is automatic; a stable CLAUDE.md, tool set and model keep the cache warm. Your first message after a long break re-reads the context uncached.

## 8. Background usage to know about
Scheduled tasks (`/loop`), goal check-ins, cross-session messages and idle compaction can spend tokens while you are away. Stop loops you no longer need.

## 9. Anti-patterns
Pasting whole logs/files into chat · "read the entire repo" · many MCP servers enabled but unused · CLAUDE.md full of history · re-explaining the project every session instead of STATE · one all-day session for unrelated tasks · retrying the same failing command without new information · switching models back and forth.
