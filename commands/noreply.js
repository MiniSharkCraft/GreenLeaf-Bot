const fs = require('fs-extra');
const path = require('path');

module.exports = {
    config: {
        name: "noreply",
        version: "1.0.0",
        isAdmin: true, // Chỉ m mới bấm được nút này 🐧☝️
        hasPermssion: 2,
        credits: "Gemini",
        description: "Bật/Tắt chế độ chỉ trả lời Admin, bơ tất cả lũ spam 🐧",
        commandCategory: "admin",
        usages: "[on/off]",
        cooldowns: 0
    },

    run: async function({ bot, args }) {
        const configPath = path.join(process.cwd(), "config.json");
        let config = fs.readJsonSync(configPath);
        
        const mode = args[0]?.toLowerCase();

        if (mode === "on") {
            config.adminOnly = true;
            fs.writeJsonSync(configPath, config, { spaces: 4 });
            return bot.send("🛡️ [SYSTEM] Đã bật chế độ 'Bế quan'. Giờ tao chỉ nghe lời mỗi mình mày thôi m ạ! 🐧☝️");
        } else if (mode === "off") {
            config.adminOnly = false;
            fs.writeJsonSync(configPath, config, { spaces: 4 });
            return bot.send("🔓 [SYSTEM] Đã tắt chế độ 'Bế quan'. Box lại xôm như cũ, hy vọng tụi nó bớt spam :)?");
        } else {
            return bot.send("❌ Gõ `?noreply on` để bật hoặc `?noreply off` để tắt nha m! :v?");
        }
    }
};