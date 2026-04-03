<div align="center">

  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3doa3k4b2J3aG54Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4Z3V4/LrmUaf0O6t9oXq8w0F/giphy.gif" width="150" height="150" alt="GreenLeaf Bot Logo"/>

  # 🌿 GreenLeaf Bot

  **Siêu Bot Messenger Bất Tử — Tích hợp Sòng Bạc & Máy Chém**

  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Platform](https://img.shields.io/badge/Platform-Messenger-blue?style=for-the-badge&logo=messenger)](https://facebook.com)
  [![Status](https://img.shields.io/badge/Uptime-24%2F7%20VPS-red?style=for-the-badge)](https://github.com/)
  [![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

  [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G11UYLFQ)

  ---

  > *"Không chỉ là Bot, đây là Lễ Tân kiêm luôn Nhà Cái uy tín nhất hệ mặt trời!"* 🐧☝️

</div>

## 📖 Giới Thiệu

**GreenLeaf Bot** là một dự án bot Messenger mã nguồn mở, được tối ưu hóa cực hạn để **bảo vệ tài khoản** (Anti-Block) và **quản lý nhóm chat** một cách tự động.

Với kiến trúc **Modular** — tách biệt hoàn toàn Core và Vỏ bọc — bot sở hữu hệ thống kinh tế (Economy) mạnh mẽ, máy chém Auto-Ban động, và khả năng hoạt động bền bỉ 24/7 trên VPS.

## ✨ Tính Năng Nổi Bật

| Tính Năng | Mô Tả | Trạng Thái |
| :--- | :--- | :---: |
| 🛡️ **Hệ Thống Bất Tử** | Tách biệt Core và Vỏ, kết hợp Adapter delay random chống block | ✅ |
| ⚔️ **Máy Chém Động** | Auto-ban khi spam, tự động ân xá. Tùy chỉnh độ gắt qua lệnh | ✅ |
| 💰 **Sòng Bạc Macau** | Hệ thống Tài Xỉu theo phiên 20s, ghép kèo nhiều người, All-in khô máu | ✅ |
| 👑 **God Mode (Admin)** | Thao túng tiền tệ (`?eco`), bế quan tỏa cảng (`?noreply`), out box từ xa | ✅ |
| 🧠 **Smart Utils** | Tự động dọn dẹp và fix lỗi Database JSON, chống corrupt data | ✅ |
| 🚀 **Hot Reload** | Lệnh `?restart` nạp lại Core và Commands ngay lập tức | ✅ |

> [!NOTE]
> Hệ thống Casino/Economy trong bot chỉ mang tính chất **giải trí** với tiền ảo trong game. Chúng tôi nghiêm cấm và không hỗ trợ bất kỳ hành vi quy đổi tiền thật nào. **Hãy chơi game có trách nhiệm!**

## 🛠️ Cài Đặt & Sử Dụng

### Yêu cầu hệ thống

- [Node.js](https://nodejs.org/) phiên bản **18** trở lên
- [Git](https://git-scm.com/)
- Một tài khoản Facebook (khuyến nghị dùng acc clone/2022 sạch)

### Cài đặt

```bash
# Clone source code về máy
git clone https://github.com/MiniSharkCraft/GreenLeaf-Bot.git

# Di chuyển vào thư mục bot
cd GreenLeafBot

# Cài đặt các thư viện cần thiết
npm install
```

### Cấu hình

> [!IMPORTANT]
> Chỉnh sửa file `config.json` trước khi chạy bot.

```json
{
  "prefix": "?",
  "adminIDs": ["YOUR_FACEBOOK_ID"],
  "adminOnly": false,
  "rateLimitCount": 3,
  "rateLimitTime": 2500,
  "appStatePath": "./appstate_letan.json"
}
```

| Trường | Mô tả |
| :--- | :--- |
| `prefix` | Ký tự đặt trước mỗi lệnh (mặc định `?`) |
| `adminIDs` | Mảng chứa Facebook UID của admin bot |
| `adminOnly` | `true` = chỉ admin dùng được bot |
| `rateLimitCount` | Số lệnh tối đa trong khoảng `rateLimitTime` |
| `rateLimitTime` | Thời gian rate-limit (ms) |
| `appStatePath` | Đường dẫn tới file cookie/appstate |

### Vận hành

**Development (Local):**

```bash
node index.js
```

**Production (VPS 24/7):**

```bash
npm install pm2 -g
pm2 start index.js --name "GreenLeafBot"
```

## 📂 Cấu Trúc Thư Mục

```
GreenLeafBot/
├── index.js          # 🛡️ Vỏ Bọc — khởi tạo kết nối & anti-crash
├── core.js           # 🧠 Bộ Não — xử lý lệnh & routing
├── config.json       # ⚙️ Cấu hình bot
├── utils/
│   └── adapter.js    # 🛡️ Lớp giáp chống block (delay random)
├── commands/         # 📦 Các module lệnh
└── database/         # 💾 Dữ liệu JSON (economy, users, ...)
```

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Hãy tạo [Issue](https://github.com/MiniSharkCraft/GreenLeaf-Bot/issues) hoặc gửi [Pull Request](https://github.com/MiniSharkCraft/GreenLeaf-Bot/pulls).

## 📄 License

Dự án được phân phối dưới giấy phép [MIT](LICENSE).

---

<div align="center">

  **Code by CongMC team 🐧☝️ | Version: 2.5 (Stable)**

  [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G11UYLFQ)

</div>
