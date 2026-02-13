const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "nhac",
        version: "1.0.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Gemini",
        description: "Gửi nhạc local lên nhóm",
        commandCategory: "tiện ích",
        usages: "[tên file mp3]",
        cooldowns: 5
    },

    run: async function({ bot, args, rawMsg }) {
        // 1. Lấy tên file từ args
        const fileName = args.join(" ");
        if (!fileName) {
            return bot.send("Gõ thiếu tên file rồi m ơi! Ví dụ: ?nhac anthan.mp3 🐧");
        }

        // 2. Trỏ vào thư mục music (Mày phải tạo folder 'music' ở P:\Bot-Mess\music)
        const musicFolder = path.join(process.cwd(), "music");
        
        // Tự động thêm đuôi .mp3 nếu mày gõ thiếu
        const fullFileName = fileName.endsWith(".mp3") ? fileName : fileName + ".mp3";
        const filePath = path.join(musicFolder, fullFileName);

        // 3. Check file có tồn tại không
        if (!fs.existsSync(filePath)) {
            return bot.send(`❌ Không tìm thấy file: ${fullFileName} trong folder music/ 🐧`);
        }

        // 4. Dùng hàm sendFile của Adapter (bot) để gửi
        try {
            // bot.send đã có typing và delay sẵn trong adapter.js của m rồi
            await bot.send(`🎵 Đang gửi bài: ${fullFileName}...`);
            
            // Gọi hàm sendFile từ class UniversalAPI
            await bot.sendFile(`Quẩy lên m ơi! 🐧☝️`, filePath);
            
        } catch (error) {
            console.error(error);
            // Không cần threadID nữa vì hàm send của bot nó tự lấy từ rawMsg rồi m ạ
            bot.send(`Toang! Lỗi: ${error.message} =))`);
        }
    }
};