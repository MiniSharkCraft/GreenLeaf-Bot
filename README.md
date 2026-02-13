<div align="center">

  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3doa3k4b2J3aG54Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4/LrmUaf0O6t9oXq8w0F/giphy.gif" width="150" height="150" alt="Bot Logo"/>

  # 🌿 GreenLeaf Bot (Multi-Core)
  
  **Bot Lễ Tân Thế Hệ Mới - Chạy song song Messenger & Discord**
  
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Platform](https://img.shields.io/badge/Platform-Messenger%20|%20Discord-blue?style=for-the-badge&logo=facebook)](https://facebook.com)
  [![Status](https://img.shields.io/badge/Status-24%2F7%20VPS-red?style=for-the-badge&logo=server)](https://greenleaf.congmc.com)
  [![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

  ---
  
  > *"Không chỉ là Bot, đây là Lễ Tân cute nhất hệ mặt trời!"* 🐧☝️

</div>

## 📖 Giới Thiệu
**GreenLeaf Bot** là một dự án bot mã nguồn mở được tối ưu hóa để chạy trên cả hai nền tảng phổ biến nhất hiện nay: **Facebook Messenger** và **Discord**. 
Với kiến trúc **Modular**, bot có thể dễ dàng mở rộng, bảo trì và hoạt động bền bỉ 24/7 trên VPS nhờ tích hợp hệ thống **Anti-Crash** và **Auto-Renew Session**.

## ✨ Tính Năng Nổi Bật

| Tính Năng | Mô Tả | Trạng Thái |
| :--- | :--- | :---: |
| **🦄 Multi-Core** | Chạy 1 source code cho cả Mess & Discord (Switch Mode) | ✅ |
| **🎬 Douyin/TikTok** | Tự động bóc link video không logo, hỗ trợ link ngắn | ✅ |
| **🛡️ VPS Immortal** | Tự động login lại khi mất mạng, tự lưu AppState mới | ✅ |
| **🧠 Smart Adapter** | Tự động chuyển đổi cú pháp gửi ảnh/video theo nền tảng | ✅ |
| **⏳ Anti-Spam** | Hệ thống Cooldown thông minh chống spam lệnh | ✅ |
| **📂 Module System** | Tách biệt Commands, Events và Utils dễ quản lý | ✅ |

## 🛠️ Cài Đặt & Sử Dụng

### 1. Yêu cầu hệ thống
* Node.js (Phiên bản 16 trở lên)
* Git
* Một tài khoản Facebook (cho mode Messenger) hoặc Bot Token (cho mode Discord)

### 2. Cài đặt
Mở Terminal hoặc Command Prompt và chạy các lệnh sau:

# 1. Clone source code về máy
git clone [https://github.com/username-cua-may/GreenLeafBot.git](https://github.com/username-cua-may/GreenLeafBot.git)

# 2. Di chuyển vào thư mục bot
cd GreenLeafBot

# 3. Cài đặt các thư viện cần thiết
npm install
3. Cấu hình (Quan trọng ⚠️)
Đổi tên file config.json.example thành config.json và điền thông tin của bạn:

JSON
{
  "mode": "messenger", 
  "prefix": ".",
  "adminIDs": ["YOUR_UID_HERE"],
  "discordToken": "YOUR_DISCORD_TOKEN",
  "appStatePath": "./appstate_letan.json"
}
Lưu ý: Nếu chạy mode Messenger, bạn cần đăng nhập và xuất file appstate_letan.json (J2TEAM Cookies) để vào thư mục gốc.

🚀 Vận Hành (Run)
Chạy thử nghiệm (Local)

node index.js
Chạy trên VPS (Production 24/7)
Sử dụng PM2 để bot không bao giờ tắt:

# Cài đặt PM2 (nếu chưa có)
npm install pm2 -g

# Khởi chạy Bot
pm2 start index.js --name "GreenLeafBot"

# Xem log
pm2 log

📂 Cấu Trúc Thư Mục
GreenLeafBot/
├── assets/             # Tài nguyên (Ảnh, Font)
├── cache/              # Bộ nhớ đệm (Tự động dọn dẹp)
├── commands/           # Chứa các lệnh (Command modules)
├── events/             # Chứa các sự kiện (Event modules)
├── utils/              # Các hàm hỗ trợ (Log, Adapter, Downloader)
├── config.json         # File cấu hình chính
├── index.js            # File khởi động (Core)
└── README.md           # Bạn đang đọc nó đấy 🐧

🤝 Đóng Góp
Mọi ý kiến đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc mở Issue nếu bạn phát hiện lỗi.

📜 Credits
Base: @dongdev/fca-unofficial

Author: AMoon (CongMC Dev Team)

Special Thanks: Cộng đồng J2TEAM & Pterodactyl

<div align="center">
Built with ❤️ and ☕ by CongMC Team
</div>