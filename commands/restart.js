const path = require('path');

module.exports = {
    config: {
        name: "restart",
        version: "2.6.0",
        isAdmin: true, // Chỉ m - UID 61577016266615 mới được dùng
        hasPermssion: 2,
        credits: "Gemini",
        description: "Nạp lại toàn bộ logic Core và Lệnh không ngắt kết nối 🐧☝️",
        commandCategory: "admin",
        cooldowns: 0
    },

    run: async function({ bot, logger }) {
        try {
            // 1. Xác định các đường dẫn logic then chốt
            const corePath = path.resolve(__dirname, '..', 'core.js');
            const adapterPath = path.resolve(__dirname, '..', 'utils', 'adapter.js');

            // 2. Xóa cache hệ thống để nạp file mới hoàn toàn (Tránh lỏ code cũ)
            delete require.cache[require.resolve(corePath)];
            delete require.cache[require.resolve(adapterPath)];
            
            // 3. Gọi bộ não mới nạp lại toàn bộ lệnh và event
            const newCore = require(corePath);
            newCore.loadCommands();
            newCore.loadEvents();

            // 4. Báo cáo thành công qua Adapter (có random delay giả lập người thật)
            return bot.send("🚀 [HOT RELOAD] Đã làm mới toàn bộ logic Core, Adapter và Commands thành công! Acc 2022 vẫn online xanh rì nhé m! 🐧☝️");
        } catch (e) {
            logger.error(`[RESTART ERROR] ${e.stack}`);
            return bot.send(`❌ Restart lỏ rồi m ơi: ${e.message} :)?`);
        }
    }
};