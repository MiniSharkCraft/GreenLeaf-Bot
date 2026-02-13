const fs = require('fs-extra');
const path = require('path');

module.exports = {
    config: {
        name: "listnhac",
        version: "1.0.5",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Gemini",
        description: "Xem danh sách nhạc có sẵn trên hệ thống 🐧",
        commandCategory: "music",
        usages: "",
        cooldowns: 10
    },

    run: async function({ bot, logger }) {
        try {
            const musicPath = path.join(process.cwd(), "music");

            // 1. Tạo folder nếu m quên chưa tạo
            if (!fs.existsSync(musicPath)) {
                fs.mkdirSync(musicPath);
                return bot.send("📂 Thư mục music vừa được tạo, m ném file .mp3 vào đi rồi tính tiếp =))");
            }

            // 2. Đọc toàn bộ file .mp3
            const files = fs.readdirSync(musicPath).filter(file => file.endsWith(".mp3"));

            if (files.length === 0) {
                return bot.send("👻 Folder nhạc trống trơn m ơi, nạp đạn (file mp3) vào đi! 🐧☝️");
            }

            // 3. Xây dựng danh sách
            let msg = "🎵 --- DANH SÁCH NHẠC PREMIUM --- 🎵\n\n";
            files.forEach((file, index) => {
                msg += `${index + 1}. ${file.replace(".mp3", "")}\n`;
            });
            
            msg += `\n👉 Gõ: ?nhac [tên file] để quẩy m ơi! 🐧☝️`;

            // 4. Gửi bằng adapter (có random delay cho giống người thật)
            return bot.send(msg);

        } catch (error) {
            logger.error(`Lỗi listnhac: ${error.message}`);
            return bot.send("❌ Toang rồi, ko đọc được danh sách nhạc :)?");
        }
    }
};