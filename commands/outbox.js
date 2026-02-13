module.exports = {
    config: {
        name: "outbox",
        version: "1.0.0",
        isAdmin: true, // Chỉ m mới có quyền đuổi bot 🐧☝️
        hasPermssion: 2,
        credits: "Gemini",
        description: "Cho bot rời khỏi nhóm hiện tại hoặc nhóm chỉ định qua UID 🐧",
        commandCategory: "admin",
        usages: "[trống/UID box]",
        cooldowns: 5
    },

    run: async function({ bot, api, args, rawMsg }) {
        // 1. Xác định ID box cần thoát (Nếu ko nhập UID thì lấy ID box hiện tại)
        const targetID = args[0] || rawMsg.threadID;

        if (!targetID) return bot.send("❌ Nhập UID box hoặc dùng trong box cần thoát đi m ơi! :v?");

        try {
            // 2. Gửi lời chào tạm biệt trước khi đi cho nó lịch sự 🐧
            await bot.send("👋 Tạm biệt mấy con gà nhé, t đi đây! Đừng có spam nữa ko t kêu chủ t ban hết giờ =))");

            // 3. Thực thi lệnh rời nhóm của API Facebook
            return api.removeUserFromGroup(api.getCurrentUserID(), targetID, (err) => {
                if (err) return bot.send(`❌ Lỗi rồi m ơi, chắc bot ko có quyền hoặc UID lỏ: ${err.message}`);
            });
        } catch (e) {
            return bot.send(`❌ Hỏng rồi: ${e.message} :)?`);
        }
    }
};