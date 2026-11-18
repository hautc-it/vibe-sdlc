# Phase 2 — Architecture

**Goal:** the simplest architecture that meets the PRD, with reasons, and a threat model.

## Decide (one line each, with why)
Frontend · Backend/API · Database · File storage · Auth · External services (AI, email, payment) · Hosting · Background jobs · Observability.

Defaults for a small team (change only with a reason): one repo; a full-stack framework (e.g. Next.js/SvelteKit/Astro + server routes) or a simple API + SPA; PostgreSQL (Supabase if auth+storage+RLS help); object storage for files (DB keeps references); managed auth, never hand-rolled password crypto; hosted checkout for payments. Avoid microservices, Kubernetes, message queues, GraphQL unless a stated requirement forces it.

## Output
- `docs/sdlc/architecture.md`: component diagram (Mermaid), data flow, trust boundaries (browser ↔ server ↔ DB ↔ third parties), tech choices + reasons, estimated monthly cost.
- One ADR per non-obvious decision (`templates/ADR.md`, `docs/adr/NNNN-title.md`).
- `docs/sdlc/threat-model.md` (`templates/threat-model.md`): assets, actors, entry points, STRIDE-lite table, top 10 mitigations mapped to phases.

## Security
- Least privilege between components (DB role for app ≠ admin role; service keys only on server).
- Where are secrets stored at runtime? (host env / secret manager — never the repo or the client bundle.)
- AI features: what can the model read and which tools can it call? Treat model output as untrusted input (OWASP LLM Top 10).
- Third-party services: data sent to each, region, DPA/terms, cost cap.

## Exit criteria
User approved architecture and cost (gate: services that cost money). Threat model has an owner phase for every high risk.
