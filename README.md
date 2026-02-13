<div align="center">

  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3doa3k4b2J3aG54Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4/LrmUaf0O6t9oXq8w0F/giphy.gif" width="150" height="150" alt="Bot Logo"/>

  # 🌿 GreenLeaf Bot (Premium V2.5)
  
  **Siêu Bot Messenger Bất Tử - Tích hợp Sòng Bạc & Máy Chém 🐧☝️**
  
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
<<<<<<< HEAD
  [![Platform](https://img.shields.io/badge/Platform-Messenger%20|%20Discord-blue?style=for-the-badge&logo=facebook)](https://facebook.com)
  [![Status](https://img.shields.io/badge/Status-24%2F7%20VPS-red?style=for-the-badge&logo=server)](https://congmc.com)
=======
  [![Platform](https://img.shields.io/badge/Platform-Messenger-blue?style=for-the-badge&logo=facebook)](https://facebook.com)
  [![Status](https://img.shields.io/badge/Status-24%2F7%20VPS-red?style=for-the-badge&logo=server)](https://github.com/)
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
  [![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

  ---
  
  > *"Không chỉ là Bot, đây là Lễ Tân kiêm luôn Nhà Cái uy tín nhất hệ mặt trời!"* 🐧☝️

</div>

## 📖 Giới Thiệu
**GreenLeaf Bot** là một dự án bot Messenger mã nguồn mở được tối ưu hóa cực hạn để bảo vệ tài khoản (Anti-Block) và quản lý nhóm chat. 
Với kiến trúc **Modular**, bot sở hữu hệ thống kinh tế (Economy) mạnh mẽ, máy chém Auto-Ban động và khả năng hoạt động bền bỉ 24/7 trên VPS.

## ✨ Tính Năng Nổi Bật

| Tính Năng | Mô Tả | Trạng Thái |
| :--- | :--- | :---: |
| **🛡️ Hệ Thống Bất Tử** | Tách biệt Core và Vỏ, kết hợp Adapter delay random chống block | ✅ |
| **⚔️ Máy Chém Động** | Auto-ban khi spam, tự động ân xá. Tùy chỉnh độ gắt qua lệnh | ✅ |
| **💰 Sòng Bạc Macau** | Hệ thống Tài Xỉu theo phiên 20s, ghép kèo nhiều người, All-in khô máu | ✅ |
| **👑 God Mode (Admin)** | Thao túng tiền tệ (`?eco`), bế quan tỏa cảng (`?noreply`), out box từ xa | ✅ |
| **🧠 Smart Utils** | Tự động dọn dẹp và fix lỗi Database JSON, chống corrupt data | ✅ |
| **🚀 Hot Reload** | Lệnh `?restart` nạp lại Core và Commands với tốc độ 0s | ✅ |

## 🛠️ Cài Đặt & Sử Dụng

### 1. Yêu cầu hệ thống
* Node.js (Phiên bản 18 trở lên)
* Git
* Một tài khoản Facebook (Khuyến nghị dùng acc clone/2022 sạch)

### 2. Cài đặt
Mở Terminal hoặc Command Prompt và chạy các lệnh sau:

```bash
# 1. Clone source code về máy
git clone [https://github.com/username-cua-may/GreenLeafBot.git](https://github.com/username-cua-may/GreenLeafBot.git)

# 2. Di chuyển vào thư mục bot
cd GreenLeafBot

# 3. Cài đặt các thư viện cần thiết
npm install
3. Cấu hình (Quan trọng ⚠️)
Tạo hoặc chỉnh sửa file config.json và điền thông tin của bạn:

JSON
{
  "prefix": "?",
  "adminIDs": ["YOUR_UID_HERE"],
  "adminOnly": false,
  "rateLimitCount": 3,
  "rateLimitTime": 2500,
  "appStatePath": "./appstate_letan.json"
}

Lưu ý: Bạn cần đăng nhập Facebook và xuất file appstate_letan.json (J2TEAM Cookies hoặc C3C) để vào thư mục gốc.

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
├── cache/              # Bộ nhớ đệm (money.json, banned.json)

├── commands/           # Chứa các lệnh (daily, taixiu, eco, ratelimit...)

├── events/             # Chứa các sự kiện tự động

├── utils/              # Các hàm hỗ trợ (index, adapter, log)

├── config.json         # File cấu hình biến môi trường

├── core.js             # 🧠 BỘ NÃO (Xử lý lệnh, chặn spam)

├── index.js            # 🛡️ VỎ BỌC (Khởi tạo kết nối)

└── README.md           # Bạn đang đọc nó đấy 🐧

🤝 Đóng Góp
Mọi ý kiến đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc mở Issue nếu bạn phát hiện lỗi.

📜 Credits
Base: @dongdev/fca-unofficial

Author: Chủ Tịch & Gemini

Special Thanks: Cộng đồng J2TEAM & Pterodactyl

<div align="center">
Built with ❤️ and ☕ by CongMC Team
</div>