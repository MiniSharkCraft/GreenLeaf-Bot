const fs = require('fs-extra');
const path = require('path');

module.exports = {
    config: {
        name: "ratelimit",
        version: "1.0.0",
        isAdmin: true,
        hasPermssion: 2,
        credits: "Gemini",
        description: "Chỉnh độ gắt của máy chém Auto-Ban 🐧",
        commandCategory: "admin",
        usages: "[số tin] [số giây]",
        cooldowns: 0
    },

    run: async function({ bot, args }) {
        const configPath = path.join(process.cwd(), "config.json");
        let config = fs.readJsonSync(configPath);
        
        const count = parseInt(args[0]);
        const seconds = parseInt(args[1]);

        if (isNaN(count) || isNaN(seconds)) {
            return bot.send("❌ Gõ đúng hộ cái: `?ratelimit 3 5` (3 tin trong 5 giây) 🐧☝️");
        }

        config.rateLimitCount = count;
        config.rateLimitTime = seconds * 1000;

        fs.writeJsonSync(configPath, config, { spaces: 4 });
        return bot.send(`🛡️ [SYSTEM] Đã cập nhật máy chém: ${count} tin trong ${seconds}s là ra đảo! 🐧☝️`);
    }
};