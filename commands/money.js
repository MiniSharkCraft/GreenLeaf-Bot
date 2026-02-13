const utils = require('../utils/index');

module.exports = {
    config: {
        name: "money",
        version: "2.0.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Gemini",
        description: "Kiểm tra số dư tài khoản Premium 🐧☝️",
        commandCategory: "economy",
        usages: "[reply/UID/trống]",
        cooldowns: 5
    },

    run: async function({ bot, args, rawMsg }) {
        // 1. Xác định UID cần check (Ưu tiên reply -> UID nhập vào -> bản thân m)
        let targetID = bot.senderID;
        
        if (rawMsg.type === "message_reply") {
            targetID = rawMsg.messageReply.senderID;
        } else if (args[0]) {
            targetID = args[0];
        }

        try {
            // 2. Dùng Utils để lấy tiền (Cực kỳ an toàn, tự fix data)
            const balance = utils.getMoney(targetID);
            const userName = (targetID === bot.senderID) ? "mày" : `UID ${targetID}`;

            // 3. Trả kết quả xịn xò
            return bot.send(
                `💳 [NGÂN HÀNG GREENLEAF]\n` +
                `━━━━━━━━━━━━━━━\n` +
                `👤 Chủ thẻ: ${userName}\n` +
                `💰 Số dư: ${utils.formatMoney(balance)}\n` +
                `⏰ Lúc: ${utils.getTime()}\n` +
                `━━━━━━━━━━━━━━━\n` +
                `🐧 Nghèo thì lo mà làm ăn đi con trai! =))`
            );
        } catch (e) {
            return bot.send("❌ Lỗi check bank rồi, chắc do UID m nhập lỏ :)?");
        }
    }
};