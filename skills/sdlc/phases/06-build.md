# Phase 6 — Build features

**Goal:** MVP features in priority order, each tested and committed. Use superpowers workflow per routing.md (worktree → writing-plans → TDD → review).

## Per feature (report briefly in Vietnamese after each)
1. Goal + acceptance criteria (from PRD).
2. Files to create/change; check impact on existing features (search callers).
3. Write a failing test first for logic and permission rules.
4. Implement the smallest change; reuse existing helpers.
5. Run: lint + types + tests (+ the app if UI). Fix.
6. Check acceptance criteria one by one.
7. `appsec` quick pass on the diff (input validation, authz, secrets, output encoding).
8. Commit (Conventional Commits: `feat:`, `fix:`, `chore:` …). No AI attribution unless the user wants it.

## Rules
- Do not change architecture, delete data or rewrite working code on your own (gate).
- Validate all input on the server with a schema (zod / valibot / pydantic …); never trust client checks.
- Authorisation check on **every** server action/endpoint: who is the user, do they own this resource? (Not only "is logged in".)
- Output encoding: rely on the framework's escaping; no `dangerouslySetInnerHTML`/`v-html`/`innerHTML` with user data unless sanitised (DOMPurify).
- Errors: user-friendly message; full detail only in server logs without secrets/PII.
- Keep functions small and named for what they do; comment *why*, not *what*.

## Exit criteria
All MVP features pass their acceptance criteria at verification level ≥ 4 (tests passed).
