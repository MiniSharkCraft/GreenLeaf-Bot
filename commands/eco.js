const utils = require('../utils/index');

module.exports = {
    config: {
        name: "eco",
        version: "1.0.0",
        isAdmin: true, // Lệnh này in ra tiền nên chỉ m mới được xài 🐧☝️
        hasPermssion: 2,
        credits: "Gemini",
        description: "Quản lý kinh tế: Bơm tiền, Trấn lột, hoặc Set cứng 🐧",
        commandCategory: "admin",
        usages: "[take/give/set] [reply/UID] [số tiền]",
        cooldowns: 0
    },

    run: async function({ bot, args, rawMsg }) {
        const action = args[0]?.toLowerCase();
        
        // 1. Check xem m muốn làm gì
        if (!["take", "give", "set"].includes(action)) {
            return bot.send("❌ Gõ lỏ rồi m ơi! Cú pháp: `?eco <take|give|set> <reply/UID> <số tiền>` :v?");
        }

        // 2. Xác định nạn nhân / người được buff
        let targetID;
        let amountInput;

        if (rawMsg.type === "message_reply") {
            targetID = String(rawMsg.messageReply.senderID);
            amountInput = args[1];
        } else {
            targetID = args[1];
            amountInput = args[2];
        }

        if (!targetID) return bot.send("❌ Mày định thao túng tiền của ma à? Nhập UID hoặc reply nó đi m! :)?");
        
        const amount = parseInt(amountInput);
        if (isNaN(amount) || amount < 0) return bot.send("❌ Nhập số tiền đàng hoàng coi, định bug tao à? =))");

        try {
            // 3. Thực thi quyền lực
            let msg = "";
            let currentData = utils.getUserData(targetID);
            let currentMoney = currentData.money || 0;

            if (action === "give") {
                const newBalance = utils.addMoney(targetID, amount);
                msg = `✅ [BUFF] Đã bơm nóng ${utils.formatMoney(amount)} cho UID ${targetID}.\n💰 Số dư mới: ${utils.formatMoney(newBalance)} 🐧☝️`;
            } 
            else if (action === "take") {
                // Chống lọt hố âm tiền (nếu m trấn lột nhiều hơn số tiền nó có)
                const takeAmount = (currentMoney < amount) ? currentMoney : amount;
                const newBalance = utils.addMoney(targetID, -takeAmount);
                msg = `💸 [TRẤN LỘT] Đã thu hồi ${utils.formatMoney(takeAmount)} của UID ${targetID}. Ác vcl =))\n💰 Trắng tay chưa con: ${utils.formatMoney(newBalance)}`;
            } 
            else if (action === "set") {
                utils.updateUserData(targetID, "money", amount);
                msg = `🛠️ [SET DATA] Đã set cứng ví của UID ${targetID} thành ${utils.formatMoney(amount)}! 🐧`;
            }

            return bot.send(msg);

        } catch (e) {
            return bot.send(`❌ Lỗi mẹ r: ${e.message} :0?`);
        }
    }
};