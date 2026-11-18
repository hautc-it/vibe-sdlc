# Phase 8 — Testing

**Goal:** evidence the system works for real users, not just that code runs.

| Type | What | Minimum for MVP |
|---|---|---|
| Unit | pure logic, validators, permission helpers | all business rules |
| Integration | API + DB, auth, external service with fake | each endpoint happy + 1 error path |
| E2E | real browser flows (Playwright via `webapp-testing`) | each MVP acceptance criterion |
| Permission | user A cannot read/edit user B's data; anon cannot reach private routes; role escalation blocked | every resource type |
| Responsive | 360, 768, 1280 px; keyboard only; screen reader labels (axe-core) | every screen |
| Error handling | network down, 500 from API, invalid input, expired session, empty data | every data view |
| Performance | page load (Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1), slow queries (EXPLAIN), rate limits hold | main pages + heaviest query |
| Backup/restore | restore latest backup to a scratch DB and open the app on it | once before launch |

## Rules
- Never test destructive actions on production data.
- Flaky test = bug; fix or quarantine with a ticket, do not ignore.
- Record exact commands and results.

## Output
`docs/sdlc/test-report.md` (`templates/test-report.md`): what ran, pass/fail counts, open bugs, go/no-go recommendation.

## Exit criteria
All MVP acceptance criteria pass E2E; permission tests pass; restore tested; user agrees go/no-go.
