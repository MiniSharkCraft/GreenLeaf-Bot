const utils = require('../utils/index');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    config: {
        name: "daily",
        version: "3.0.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Gemini",
        description: "Điểm danh hằng ngày nhận lương Premium 🐧☝️",
        commandCategory: "economy",
        usages: "",
        cooldowns: 5
    },

    run: async function({ bot, logger }) {
        const senderID = String(bot.senderID);
        const now = Date.now();
        const cooldownTime = 12 * 60 * 60 * 1000; // 12 tiếng nhận 1 lần

        try {
            // 1. Lấy dữ liệu user từ Utils (Tự động khởi tạo nếu chưa có)
            const userData = utils.getUserData(senderID);
            const lastDaily = userData.lastDaily || 0;

            // 2. Check xem còn trong thời gian chờ không
            if (now - lastDaily < cooldownTime) {
                const timeLeft = cooldownTime - (now - lastDaily);
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                
                return bot.send(`⏳ Tham lam vừa thôi m! Còn ${hours} giờ ${minutes} phút nữa mới có lương tiếp! 🐧`);
            }

            // 3. Tính tiền thưởng (Random từ 2000$ đến 8000$)
            const reward = Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000;

            // 4. Cộng tiền vào ví
            const newBalance = utils.addMoney(senderID, reward);
            
            // 5. Cập nhật thời gian nhận quà vào database
            utils.updateUserData(senderID, "lastDaily", now);

            // 6. Trả kết quả cực chất cho acc 2022 sạch 100% 🐧☝️
            return bot.send(
                `🎁 [DAILY SUCCESS]\n` +
                `━━━━━━━━━━━━━━━\n` +
                `✅ Đã nhận lương: +${utils.formatMoney(reward)}\n` +
                `💰 Ví hiện tại: ${utils.formatMoney(newBalance)}\n` +
                `⏰ Lúc: ${utils.getTime()}\n` +
                `━━━━━━━━━━━━━━━\n` +
                `🐧 Cầm tiền rồi cút đi làm web tiếp đi m! =))`
            );

        } catch (e) {
            logger.error(`[DAILY ERR] ${e.stack}`);
            return bot.send("❌ Hệ thống ngân hàng bị Mark xoăn gõ rồi, thử lại sau đi m! :)?");
        }
    }
};