const login = require("@dongdev/fca-unofficial"); // Đúng hàng pháp sư DongDev rồi nha m 🐧☝️
const fs = require("fs-extra");
const path = require("path");
const core = require("./core");
const logger = require("./utils/log");

// 1. Khởi tạo bộ nhớ tổng (Global Data) cho toàn bộ hệ thống
global.client = {
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    config: fs.existsSync("./config.json") ? fs.readJsonSync("./config.json") : {}
};

// 2. Hàm khởi động siêu bot
function startBot() {
    logger.info("🔄 Đang khởi động hệ thống GreenLeaf Premium V2.5...");
    
    // Nạp đạn (Commands & Events) từ não core.js
    core.loadCommands();
    core.loadEvents();

    // 3. Check xem có AppState (Cookie) chưa
    const appStatePath = path.join(process.cwd(), global.client.config.appStatePath || "appstate_letan.json");
    if (!fs.existsSync(appStatePath)) {
        return logger.error("❌ Đéo tìm thấy file cookie! Mày bỏ file appstate vào thư mục gốc đi m ơi! 🐧");
    }

    // 4. Bắt đầu đục tường lửa Facebook bằng FCA DongDev
    login({ appState: fs.readJsonSync(appStatePath) }, (err, api) => {
        if (err) {
            logger.error(`❌ Lỗi đăng nhập cmnr: ${err}`);
            return logger.info("⏳ Thử khởi động lại hoặc check lại file appstate đi m :)?");
        }

        logger.info("✅ Đăng nhập thành công! Bot đã sẵn sàng nhận lệnh 🐧☝️");

        // Cài đặt thông số API chống block
        api.setOptions({
            forceLogin: true,
            listenEvents: true,
            logLevel: "silent", // Tắt bớt log rác
            updatePresence: true,
            selfListen: false
        });

        // 5. Lắng nghe tin nhắn (MQTT) và đẩy sang cho core.js
        api.listenMqtt(async (err, event) => {
            if (err) {
                return logger.error(`❌ Lỗi MQTT (Mạng lag hoặc bị Mark đá): ${err}`);
            }

            // Chuyển toàn bộ event (tin nhắn) qua cho não Core phân tích và chém 🐧
            if (event.type === "message" || event.type === "message_reply") {
                core.handleCommand("messenger", event, api);
            }
        });
    });
}

// Bấm nút Start
startBot();
