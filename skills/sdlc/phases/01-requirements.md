# Phase 1 — Requirements

**Goal:** a short PRD the user approves. No design or code before that.

## Questions (ask in small groups of 3–5, Vietnamese, skip what is already known)
- Vấn đề cần giải quyết? Ai dùng? Họ đang làm việc đó thế nào hiện nay?
- Dạng sản phẩm: website / web app / mobile app / công cụ nội bộ / tự động hóa?
- Tính năng bắt buộc cho bản đầu (MVP) vs. để sau?
- Đăng nhập? Có nhiều vai trò (admin, nhân viên, khách)?
- Lưu dữ liệu gì? Có dữ liệu cá nhân (tên, SĐT, email, CCCD, vị trí, sức khỏe, tài chính)?
- Bao nhiêu người dùng lúc đầu / sau 1 năm? Dùng ở đâu (VN, nước ngoài)?
- Thanh toán? Email/SMS? AI? Tích hợp bên ngoài?
- Ngân sách hằng tháng cho hosting/dịch vụ? Thời hạn?
- Ai vận hành sau khi ra mắt?

Prefer `superpowers:brainstorming` (see routing.md) to run this conversation.

## Output — `docs/sdlc/PRD.md` (from `templates/PRD.md`)
Problem, users, MVP features (must/should/later), non-goals, acceptance criteria per feature (testable "Given/When/Then"), constraints, success metric.

## Security & legal (required section of PRD)
- **Data classification** per data type: Public / Internal / Personal / Sensitive personal / Secret.
- **Legal scan** (state "cần kiểm tra bản hiện hành", you are not a lawyer): Vietnam — Nghị định 13/2023/NĐ-CP and Luật Bảo vệ dữ liệu cá nhân 2025 (hiệu lực 01/01/2026) for personal data, consent, cross-border transfer; EU users → GDPR; California → CCPA/CPRA; payments → PCI DSS (use a hosted checkout so card data never touches the app); children's data → extra rules.
- Abuse cases: how could a user misuse each feature (spam, scraping, account takeover, cost abuse of AI endpoints)?

## Exit criteria
PRD approved by the user (gate). MVP list ≤ what fits the deadline. Each MVP feature has acceptance criteria.
