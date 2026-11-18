# vibe-sdlc-status (mod)

Read-only companion to the vibe-sdlc plugin. When the project has `docs/sdlc/STATE.md`, a dim band above the prompt shows the current phase, risk tier and status, plus counts of items waiting for your confirmation, open risks and operator to-dos. `/sdlc-status` prints the same summary and the next step instantly, without a Claude turn and without spending tokens.

What it does not do: no network, no model calls, never approves, denies or rewrites tool calls. It only reads `docs/sdlc/STATE.md` at session start, after each turn, and when you run the command. "Hide" removes the band for the session; `/sdlc-status` brings it back.

Requires Claude Code v2.1.287+ (mods). Turn off with `/plugin` → disable, or `"disableAllHooks": true`.
