const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Tạo một Map cục bộ để nhớ mặt mấy thằng spam 🐧☝️
const spamCache = new Map();

module.exports = {
    config: {
        name: "waifu",
        version: "2.2.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Tao x Mày 🐧",
        description: "Waifu SFW - Anti-spam câm lặng tuyệt đối",
        commandCategory: "giải trí",
        usages: "",
        // ĐỂ 0 ĐỂ LÁCH LUẬT CỦA INDEX.JS (Không cho nó báo "Từ từ thôi")
        cooldowns: 0 
    },

    run: async ({ bot, logger }) => {
        // --- BẮT ĐẦU CHỐNG SPAM IM LẶNG ---
        const senderID = bot.senderID;
        const cooldownTime = 15000; // 15 giây mới được ngắm vợ 1 lần
        const now = Date.now();

        if (spamCache.has(senderID)) {
            const expirationTime = spamCache.get(senderID) + cooldownTime;
            if (now < expirationTime) {
                // Đang trong thời gian spam? -> BƠ LUÔN! RETURN NGAY LẬP TỨC 🐧
                return; 
            }
        }

        // Lưu thằng này vào danh sách chờ
        spamCache.set(senderID, now);
        // Hết 15s thì tự xóa tên nó khỏi danh sách để giải phóng RAM
        setTimeout(() => spamCache.delete(senderID), cooldownTime);
        // --- KẾT THÚC CHỐNG SPAM ---

        try {
            // Logic SFW 100% trong sáng
            const response = await axios.get(`https://api.waifu.pics/sfw/waifu`);
            const imageUrl = response.data.url;
            
            const cacheDir = path.join(process.cwd(), "cache");
            if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

            const imagePath = path.join(cacheDir, `waifu_clean_${Date.now()}.png`);
            const writer = fs.createWriteStream(imagePath);
            const imgStream = await axios({
                url: imageUrl,
                method: 'GET',
                responseType: 'stream'
            });
            
            imgStream.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            await bot.sendFile("Vợ ngoan của mày đây 🐧 Spam tiếp tao bơ ráng chịu!", imagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

        } catch (error) {
            logger.error(`[WAIFU ERR] ${error.message}`);
            // Lỗi API thì mới báo
            return bot.send("❌ Toang rồi ông giáo ạ! Cưới vợ lỗi mạng 🐧");
        }
    }
};