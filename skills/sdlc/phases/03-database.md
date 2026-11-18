# Phase 3 — Database

**Goal:** a schema with constraints and access rules before any data feature is coded.

## Steps
1. Entities → tables, fields (types, null/not null, defaults), PK (uuid or bigint identity), FKs with on-delete rule, unique and check constraints, indexes for real query paths.
2. Ownership column on every user-owned row (`owner_id`/`org_id`) — needed for authorisation.
3. Timestamps (`created_at`, `updated_at`), soft delete only if the PRD needs undo/audit.
4. Access design: who can select/insert/update/delete each table. With Supabase/Postgres: **enable RLS on every table in exposed schemas**, deny by default, policies per role; service-role key only on the server.
5. Files: object storage, private bucket by default, signed URLs, DB stores key + metadata (size, mime, owner).
6. Migrations: one change per migration file, forward + documented rollback, never edit an applied migration, seed data separate from schema.
7. Backup: automatic daily backups + point-in-time if available; write how to restore; **a backup is only real after a restore test** (phase 8).

## Output
`docs/sdlc/db-schema.md` (`templates/db-schema.md`) with ER diagram (Mermaid), access matrix, migration plan.

## Security
- Encrypt sensitive personal fields at application level if the PRD classifies them Sensitive.
- No PII in table/column names used in URLs or logs.
- Parameterised queries / ORM only; no string-built SQL.
- Retention: how long each personal data type is kept and how it is deleted (user deletion request).

## Exit criteria
User approved schema and access matrix (gate if it changes an existing production DB).
