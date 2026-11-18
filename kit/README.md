# kit — file mẫu cho dự án mới

Copy những gì phù hợp vào dự án (bước 5). Không có gì ở đây tự cài.

| File | Tác dụng |
|---|---|
| `.gitignore` | Chặn commit file bí mật, build, node_modules |
| `.env.example` | Chỉ tên biến môi trường, không giá trị |
| `.claude/settings.json` | Chặn Claude đọc `.env`/khóa, chặn lệnh nguy hiểm; hỏi trước khi push/deploy/cài gói |
| `.pre-commit-config.yaml` | gitleaks chặn commit có secret (`pre-commit install`) |
| `.github/workflows/security.yml` | CI: gitleaks + osv-scanner + semgrep, action ghim SHA |
| `.github/dependabot.yml` | Tự đề xuất cập nhật thư viện + action hằng tuần |
| `SECURITY.md` | Cách người khác báo lỗi bảo mật cho bạn |

Sửa `.env.example`, `dependabot.yml` (ecosystem) và `ask` trong `settings.json` cho đúng stack của dự án.
