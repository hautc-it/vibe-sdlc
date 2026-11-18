# Phase 0 — Intake & current state

**Goal:** know what exists, what the user wants now, how risky it is, and how much you may decide alone.

## Steps
1. New or existing project? Look (read-only): README, CLAUDE.md/AGENTS.md, package manifests, `git log --oneline -20`, folder tree (2 levels), docs/, migrations/, CI files, deploy config. Do not open `.env*`.
2. Map what exists onto phases 1–10 (e.g. "PRD: none · schema: 12 migrations · tests: 40 unit, no e2e · deploy: Vercel"). Evidence only — a file, commit or user statement.
3. Ask the user (one short group, Vietnamese):
   - Mục tiêu lần này là gì? (sản phẩm mới / tính năng / sửa lỗi / ra mắt)
   - Bạn muốn tôi tự quyết các chi tiết nhỏ (giao diện, chữ, đặt tên) hay hỏi bạn từng việc? → `autonomy: delegate | ask`
   - Có hạn chót / ngân sách / dịch vụ bắt buộc dùng không?
4. Pick risk tier S/M/L (SKILL.md §2) and say why in one line.
5. Create `docs/sdlc/STATE.md` from `templates/STATE.md`. For an existing repo also add a short `CLAUDE.md` if missing (`templates/CLAUDE.md.template`) — ask first if CLAUDE.md exists.

## Security
- Note immediately if you see: committed secrets (run `gitleaks detect --no-banner` if installed, else grep for `sk-`, `AKIA`, `-----BEGIN`, `password=`), `.env` tracked in git, missing `.gitignore`, public storage buckets, admin keys in frontend code. Report as **open_risks**, do not fix silently.

## Exit criteria
STATE.md exists with phase, tier, autonomy, next_step; user agreed with the tier and next step.
