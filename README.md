<div align="center">

  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3doa3k4b2J3aG54Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4/LrmUaf0O6t9oXq8w0F/giphy.gif" width="150" height="150" alt="Bot Logo"/>

  # 🌿 GreenLeaf Bot (Premium V2.5)
  
  **Siêu Bot Messenger Bất Tử - Tích hợp Sòng Bạc & Máy Chém 🐧☝️**
  
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Platform](https://img.shields.io/badge/Platform-Messenger-blue?style=for-the-badge&logo=facebook)](https://facebook.com)
  [![Status](https://img.shields.io/badge/Status-24%2F7%20VPS-red?style=for-the-badge&logo=server)](https://github.com/)
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
* Node.js (Phiên bản 18 trở lên) [cite: 2026-01-08]
* Git [cite: 2026-01-08]
* Một tài khoản Facebook (Khuyến nghị dùng acc clone/2022 sạch) [cite: 2026-01-08]

### 2. Cài đặt
# 1. Clone source code về máy
git clone [https://github.com/MiniSharkCraft/GreenLeaf-Bot.git](https://github.com/MiniSharkCraft/GreenLeaf-Bot.git)

# 2. Di chuyển vào thư mục bot
cd GreenLeafBot

# 3. Cài đặt các thư viện cần thiết
npm install
3. Cấu hình (Quan trọng ⚠️)
Chỉnh sửa file config.json [cite: 2026-01-08]:

JSON
{
  "prefix": "?",
  "adminIDs": ["61577016266615"],
  "adminOnly": false,
  "rateLimitCount": 3,
  "rateLimitTime": 2500,
  "appStatePath": "./appstate_letan.json"
}

🚀 Vận Hành (Run)
Chạy VPS (Production 24/7) [cite: 2026-01-08]:

Bash
npm install pm2 -g
pm2 start index.js --name "GreenLeafBot"

📂 Cấu Trúc Thư Mục
core.js: 🧠 BỘ NÃO xử lý lệnh [cite: 2026-01-08].
index.js: 🛡️ VỎ BỌC khởi tạo kết nối [cite: 2026-01-08].
utils/adapter.js: 🛡️ Lớp giáp chống block [cite: 2026-01-08].

<div align="center">
<b>Code by CongMC team 🐧☝️ | Version: 2.5 (Stable)</b>
</div>
