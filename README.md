# vibe-sdlc

Quy trình phát triển phần mềm 10 bước cho người **không phải lập trình viên chuyên nghiệp** làm việc với Claude Code: hiểu đúng → thiết kế đúng → làm từng phần → kiểm tra → triển khai → bảo trì. Đặt **bảo mật lên trước** (AppSec + OpSec) ở mọi bước, báo cáo bằng tiếng Việt dễ hiểu, và tận dụng các skill open source tốt nhất hiện nay thay vì viết lại.

## Có gì trong plugin

| Skill | Gọi bằng | Dùng khi |
|---|---|---|
| `sdlc` | `/vibe-sdlc:sdlc` hoặc nói "tôi muốn xây dựng…" | Điều phối 10 bước, cổng chuyển bước, file STATE, mẫu báo cáo |
| `appsec` | `/vibe-sdlc:appsec` | Review bảo mật mỗi tính năng (5 phút) hoặc checklist đầy đủ trước khi ra mắt |
| `opsec` | `/vibe-sdlc:opsec` | Key/secret, 2FA, backup, log, bảo vệ máy + Claude Code, **vet plugin/skill/MCP trước khi cài** |
| `ui-ux` | `/vibe-sdlc:ui-ux` | Thiết kế màn hình, WCAG 2.2 AA, 5 trạng thái dữ liệu, chống "giao diện kiểu AI" |
| `token-economy` | `/vibe-sdlc:token-economy` | Tiết kiệm token/chi phí mà không giảm chất lượng |

Thêm: `kit/` (file mẫu cho dự án mới: `.gitignore`, `.env.example`, chặn Claude đọc `.env`, gitleaks, CI bảo mật ghim SHA, Dependabot, SECURITY.md), `THIRD-PARTY.md` (danh sách open source đã vet), `PROJECT-INSTRUCTIONS.vi.md` (bản dán vào Claude.ai Projects).

## 10 bước (+ bước 0)

```
0 Hiện trạng → 1 Yêu cầu → 2 Kiến trúc → 3 Database → 4 UI/UX → 5 Khung dự án
→ 6 Lập trình → 7 Bảo mật → 8 Kiểm thử → 9 Triển khai → 10 Bảo trì
```

- **Mức rủi ro:** S (sửa nhỏ — đi nhanh), M (tính năng — spec 1 trang), L (sản phẩm mới / auth / thanh toán / dữ liệu cá nhân — đủ 10 bước).
- **Mức tự chủ:** `ask` (hỏi mọi quyết định) hoặc `delegate` (Claude tự quyết chi tiết nhỏ, ghi lại).
- **Luôn hỏi trước:** xóa dữ liệu, DB production, deploy, push, dịch vụ tốn tiền, cài code bên thứ ba, tạo/xoay khóa bí mật.
- **6 mức xác minh:** đã viết code · đã kiểm cú pháp · đã chạy · test đạt · đã deploy · bạn nghiệm thu. Claude phải nói rõ đạt mức nào.
- **STATE.md** (`docs/sdlc/STATE.md` trong dự án): phiên mới đọc file này là biết đang ở đâu — không phải kể lại.

## Phân vai với open source

| Bước | Skill chuyên sâu (nếu đã cài) |
|---|---|
| 1 Yêu cầu | superpowers `brainstorming`, mattpocock `grilling` |
| 2 Kiến trúc | mattpocock `domain-modeling`, `codebase-design`; Cloudflare `security-audit` (threat model) |
| 4 UI/UX | App/dashboard: `hallmark` · Web giới thiệu/landing page: `taste-skill` (chọn 1 cho mỗi dự án) · chuyển động: emil skills |
| 6 Lập trình | superpowers: worktree → writing-plans → TDD → subagent-driven-development → code review |
| 7 Bảo mật | `/security-review` có sẵn; Cloudflare `security-audit` (audit sâu) |
| 8 Kiểm thử | Anthropic `webapp-testing` (Playwright), hallmark audit |

Thiếu skill nào thì plugin vẫn chạy bằng hướng dẫn dự phòng của chính nó. Chi tiết: `skills/sdlc/routing.md`.

## Cài đặt

Trong Claude Code:
```
/plugin marketplace add ~/HauTC/vibe-sdlc
/plugin install vibe-sdlc@vibe-sdlc
```
Khuyến nghị cài thêm (tự gõ, sau khi đọc `THIRD-PARTY.md`):
```
/plugin install superpowers@claude-plugins-official
/plugin marketplace add Nutlope/hallmark
/plugin install hallmark@hallmark
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit --global
```
Mod hiển thị trạng thái (tùy chọn, chỉ đọc, không tốn token): `/plugin install vibe-sdlc-status@vibe-sdlc` → dòng mờ trên ô nhập hiện "phase · tier · trạng thái", gõ `/sdlc-status` xem tóm tắt ngay.

Dùng với agent khác (Hermes Agent, Codex, Cursor…): 5 skill trong `skills/` là file `SKILL.md` chuẩn, chép sang thư mục skills của agent đó là dùng được (chưa thử thực tế).

Công cụ dòng lệnh (tùy chọn): `brew install gitleaks pre-commit osv-scanner semgrep`.

## Bắt đầu

- Dự án mới: mở thư mục trống, gõ *"Tôi muốn xây dựng …"* (hoặc `/vibe-sdlc:sdlc`). Claude bắt đầu ở bước 0–1, hỏi từng nhóm câu ngắn, tạo `docs/sdlc/STATE.md`, **chưa viết code**.
- Dự án có sẵn: `/vibe-sdlc:sdlc` → Claude rà hiện trạng, đối chiếu với 10 bước, không làm lại phần đã xong.
- Sửa nhanh một lỗi: cứ nói bình thường; Claude xếp mức S và đi đường ngắn.

## Câu nói mẫu (copy dùng ngay)

| Bạn muốn | Nói với Claude |
|---|---|
| Bắt đầu sản phẩm mới | "Tôi muốn xây dựng app … cho … Bắt đầu theo vibe-sdlc." |
| Tiếp tục hôm qua | "Đọc STATE và làm tiếp." |
| Thêm tính năng | "Thêm tính năng … (mức M)." |
| Sửa lỗi nhỏ | "Nút … bị lệch trên điện thoại, sửa giúp." (tự xếp mức S) |
| Cho Claude tự quyết chi tiết | "Chuyển autonomy sang delegate." |
| Kiểm tra bảo mật | "/vibe-sdlc:appsec cho tính năng vừa làm" · trước khi ra mắt: "chạy checklist bảo mật đầy đủ" |
| Định cài plugin/thư viện lạ | "/vibe-sdlc:opsec vet giúp repo … trước khi cài" |
| Giao diện nhìn "kiểu AI" | "/vibe-sdlc:ui-ux critique trang …" |
| Context dài, tốn token | "/vibe-sdlc:token-economy" rồi `/usage`, `/context` |
| Xem đang ở bước nào | "Báo cáo giai đoạn hiện tại theo mẫu." |

## Cập nhật plugin

Sửa file trong repo này → commit → trong Claude Code chạy `/plugin marketplace update vibe-sdlc` rồi cài lại. Muốn chia sẻ: đẩy repo lên GitHub (private/public tùy bạn), người khác dùng `/plugin marketplace add <owner>/vibe-sdlc`.

## Giấy phép
MIT. Các dự án bên thứ ba giữ giấy phép riêng (xem `THIRD-PARTY.md`); plugin này không chứa code của họ.
