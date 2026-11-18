# vibe-sdlc-status (mod)

[English](README.md) · **Tiếng Việt**

Mod đi kèm plugin vibe-sdlc, chỉ đọc. Khi dự án có `docs/sdlc/STATE.md`, một dòng mờ phía trên ô nhập sẽ hiện bước hiện tại, mức rủi ro, trạng thái, cùng số việc đang chờ bạn xác nhận, số rủi ro còn mở và số việc bạn phải tự làm. Gõ `/sdlc-status` để xem ngay tóm tắt và bước tiếp theo, không mất một lượt Claude và không tốn token.

Mod này không làm những việc sau: không gọi mạng, không gọi model, không duyệt, chặn hay sửa bất kỳ lệnh nào. Nó chỉ đọc `docs/sdlc/STATE.md` khi mở phiên, sau mỗi lượt, và khi bạn gõ lệnh. Bấm "Hide" để ẩn dòng trạng thái trong phiên đó; gõ `/sdlc-status` để hiện lại.

Cần Claude Code v2.1.287 trở lên (có tính năng mods). Tắt bằng `/plugin` → disable, hoặc đặt `"disableAllHooks": true`.
