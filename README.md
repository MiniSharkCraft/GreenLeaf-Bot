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
  "adminIDs": ["100012345678901"],
  "adminOnly": false,
  "rateLimitCount": 3,
  "rateLimitTime": 2500,
  "appStatePath": "./appstate_letan.json"
}
```

| Trường | Mô tả |
| :--- | :--- |
| `prefix` | Ký tự đặt trước mỗi lệnh (mặc định `?`) |
| `adminIDs` | Mảng chứa Facebook UID của (các) admin bot — xem hướng dẫn bên dưới |
| `adminOnly` | `true` = chỉ admin dùng được bot, `false` = ai cũng dùng được |
| `rateLimitCount` | Số lệnh tối đa trong khoảng `rateLimitTime` (chống spam) |
| `rateLimitTime` | Thời gian rate-limit tính bằng mili-giây (2500 = 2.5 giây) |
| `appStatePath` | Đường dẫn tới file cookie/appstate của acc bot |

#### 🔑 Cách lấy Facebook UID

Facebook UID là dãy số định danh tài khoản (ví dụ: `100012345678901`). Có nhiều cách lấy:

- **Cách 1:** Vào [[Look Up ID](https://lookup-id.com/)] → dán link profile Facebook → copy UID
- **Cách 2:** Mở profile Facebook → nhấn chuột phải → **View Page Source** → tìm `"userID":"` → dãy số phía sau chính là UID
- **Cách 3:** Dùng extension trình duyệt như **JEFI FB ID Finder**

#### 👥 Thêm nhiều Admin

Muốn thêm nhiều admin, chỉ cần thêm UID vào mảng `adminIDs`, **mỗi UID cách nhau bằng dấu phẩy**:

```json
{
  "adminIDs": [
    "100012345678901",
    "100098765432101",
    "100011223344556"
  ]
}
```

> [!TIP]
> Mỗi UID phải nằm trong **dấu ngoặc kép** `"..."` và cách nhau bằng **dấu phẩy** `,`. UID cuối cùng **không có** dấu phẩy phía sau.

### Lấy AppState (Cookie)

Bot cần file `appstate.json` chứa cookie Facebook để đăng nhập. Có thể lấy bằng extension [c3c-fbstate](https://github.com/nicedayzhu/c3c-fbstate) hoặc tương tự:

1. Đăng nhập Facebook trên trình duyệt bằng acc clone/phụ
2. Dùng extension export ra file `appstate.json`
3. Đặt file vào thư mục bot và đảm bảo `appStatePath` trong `config.json` trỏ đúng đường dẫn

> [!WARNING]
> **Tuyệt đối không** dùng tài khoản Facebook chính. Dùng acc clone/2022 sạch để tránh bị khóa.

### Vận hành

#### 🖥️ Development (Local)

Chạy trực tiếp để test và debug:

```bash
node index.js
```

Bot sẽ log ra console, nhấn `Ctrl + C` để dừng.

#### ☁️ Production (VPS 24/7)

Dùng [PM2](https://pm2.keymetrics.io/) để bot chạy nền, tự restart khi crash:

```bash
# Cài PM2 toàn cục (chỉ cần 1 lần)
npm install pm2 -g

# Khởi chạy bot
pm2 start index.js --name "GreenLeafBot"
```

Một số lệnh PM2 hữu ích:

```bash
pm2 logs GreenLeafBot     # Xem log real-time
pm2 restart GreenLeafBot   # Restart bot
pm2 stop GreenLeafBot      # Dừng bot
pm2 delete GreenLeafBot    # Xóa bot khỏi PM2
pm2 monit                  # Dashboard monitor CPU/RAM
```

Để bot **tự khởi động lại** khi VPS reboot:

```bash
pm2 startup
pm2 save
```

#### 🐳 Docker (Tùy chọn)

```bash
# Build image
docker build -t greenleaf-bot .

# Chạy container
docker run -d --name greenleaf --restart unless-stopped greenleaf-bot
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
