---
name: token-economy
description: Habits that cut token use and cost in Claude Code without lowering quality — progressive disclosure, STATE handoff, lean CLAUDE.md, plan mode, sub-agents for wide searches, /clear and guided /compact, targeted reads, model choice, and usage tracking. Use when context is getting long, the session feels slow or expensive, before a large task, or when the user asks "tiết kiệm token", "đỡ tốn tiền", "context đầy".
---

# Token economy

Explain to the user in Vietnamese; apply the habits yourself without being asked.

## 1. Load less
- **Progressive disclosure:** skills keep `SKILL.md` short and load reference files only when needed (this plugin reads one phase file at a time). Do the same for project docs: CLAUDE.md links to docs instead of pasting them.
- **CLAUDE.md under ~150 lines:** facts the code cannot tell (commands, conventions, gates). Remove anything stale. Every line is paid for in every message.
- **Few always-on plugins:** each installed skill adds its description to every session; a SessionStart hook can inject kilobytes. Install per project when a skill is only used there; uninstall what you no longer use.
- **Read targeted:** search first (`grep -n`, Glob), then read the needed line range — not whole large files. Do not re-read a file you just edited.
- **Do not paste big outputs:** pipe through `head`, `tail`, `grep`, `jq`, `wc -l`; run tests with a reporter that prints failures only.

## 2. Carry state in files, not in chat
- `docs/sdlc/STATE.md` (phase, decisions, next step) lets a fresh session continue with a ~1 KB read instead of a long history.
- Plans and specs live in files; the conversation references them.
- Start a fresh session (`/clear`) between unrelated tasks. Before clearing, update STATE.

## 3. Compact deliberately (idea from ECC's strategic-compact)
- Compact at natural boundaries (after a phase, after a feature commit), not mid-debugging.
- Use guidance: `/compact keep: current phase, open decisions, failing test names, file paths changed; drop: exploration output`.
- Check `/context` to see what fills the window (tools, MCP, memory, files).

## 4. Delegate wide work
- Broad searches across many files → an Explore/sub-agent returns only the conclusion (its tool output stays out of your context).
- Independent tasks → parallel sub-agents, each with a tight brief and expected output format.
- But: each sub-agent starts cold — do not spawn one for something you can answer with 1–2 greps.

## 5. Plan before big changes
Plan mode (or `superpowers:writing-plans`) for tier M/L: a 1-page plan avoids expensive wrong turns and rewrites. Small tasks (tier S) skip planning.

## 6. Right model, right effort
- Hard design/debugging/security review → the strongest model / higher effort.
- Mechanical edits, renames, formatting, simple searches → a faster, cheaper model (e.g. a Haiku/Sonnet sub-agent) or lower effort.
- Batch independent tool calls in one turn.

## 7. Measure
- `/cost` (API) or `/usage` (plan limits) in Claude Code; `npx ccusage` reads local Claude Code logs for daily/monthly token reports (local only — check the package before running, `opsec` §6).
- Prompt caching is automatic in Claude Code; stable CLAUDE.md and tool sets keep the cache warm — avoid editing CLAUDE.md mid-session without need.

## 8. Anti-patterns
Pasting whole logs/files into chat · "read the entire repo" · many MCP servers enabled but unused · huge CLAUDE.md with history · re-explaining the project every session instead of STATE · retrying the same failing command without new information.
