const fs = require('fs-extra');
const path = require('path');

module.exports = {
    config: {
        name: "ban",
        version: "3.0.0",
        isAdmin: true, // Chỉ m - UID 61577016266615 mới được dùng
        hasPermssion: 2,
        credits: "Gemini",
        description: "Cấm/Gỡ cấm người dùng theo thời gian (phút) 🐧",
        commandCategory: "admin",
        usages: "[reply/UID] [số phút/forever]",
        cooldowns: 2
    },

    run: async function({ bot, args, rawMsg }) {
        const cacheDir = path.join(process.cwd(), "cache");
        const banFile = path.join(cacheDir, "banned.json");

        if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
        if (!fs.existsSync(banFile)) fs.writeJsonSync(banFile, []);

        // 1. Xác định đối tượng bị trảm
        let targetID = (rawMsg.type === "message_reply") ? String(rawMsg.messageReply.senderID) : args[0];
        let timeInput = (rawMsg.type === "message_reply") ? args[0] : args[1];

        if (!targetID) return bot.send("❌ Mày định ban/unban ai? Nhập UID hoặc reply nó đi! :0?");
        if (targetID === "61577016266615") return bot.send("🐧 Mày bị ngáo à? Tự ban chính mình làm gì m ơi =))");

        let bannedList = fs.readJsonSync(banFile);
        const now = Date.now();

        // 2. Kiểm tra xem nó có đang nằm trong danh sách đen không
        const index = bannedList.findIndex(user => user.id === targetID);

        if (index !== -1) {
            // --- CHẾ ĐỘ UNBAN (Nếu đã có trong list) ---
            bannedList.splice(index, 1);
            fs.writeJsonSync(banFile, bannedList);
            return bot.send(`✅ [UNBAN] Đã gỡ cấm cho UID ${targetID}. Cho nó cơ hội làm lại cuộc đời đó 🐧☝️`);
        } else {
            // --- CHẾ ĐỘ BAN (Nếu chưa có trong list) ---
            let expire = 0;
            let timeMsg = "";

            if (!timeInput || timeInput === "forever") {
                expire = now + (99 * 365 * 24 * 60 * 60 * 1000); // 99 năm cho nó máu =))
                timeMsg = "VĨNH VIỄN";
            } else if (!isNaN(timeInput)) {
                expire = now + (parseInt(timeInput) * 60 * 1000);
                timeMsg = `${timeInput} PHÚT`;
            } else {
                return bot.send("❌ Nhập số phút hợp lệ hoặc để trống để ban vĩnh viễn m ơi! :v?");
            }

            bannedList.push({ id: targetID, expire: expire });
            fs.writeJsonSync(banFile, bannedList);

            return bot.send(`🚫 [BAN] Đã cấm UID ${targetID} sử dụng bot trong ${timeMsg}!\n📝 Gõ lại lệnh này lần nữa để gỡ cấm.`);
        }
    }
};