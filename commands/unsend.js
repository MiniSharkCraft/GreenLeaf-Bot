module.exports = {
    config: {
        name: "unsend",
        version: "1.0.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Gemini",
        description: "Thu hồi tin nhắn của bot bằng cách reply 🐧",
        commandCategory: "tiện ích",
        usages: "[reply tin nhắn cần thu hồi]",
        cooldowns: 0
    },

    run: async function({ api, rawMsg, bot }) {
        // Kiểm tra xem mày có đang reply tin nhắn nào không
        if (rawMsg.type !== "message_reply") {
            return bot.send("❌ Mày phải reply (phản hồi) vào cái tin nhắn muốn thu hồi của tao chứ m! 🐧☝️");
        }

        // Chỉ cho phép thu hồi tin nhắn của chính con bot gửi ra
        if (String(rawMsg.messageReply.senderID) !== String(api.getCurrentUserID())) {
            return bot.send("🐧 Tao chỉ thu hồi được tin của tao thôi, tin của đứa khác tao chịu!");
        }

        // Thực hiện thu hồi
        return api.unsendMessage(rawMsg.messageReply.messageID, (err) => {
            if (err) return bot.send("❌ Lỗi rồi, chắc tin nhắn này lâu quá tao không thu hồi được :)?");
        });
    }
};