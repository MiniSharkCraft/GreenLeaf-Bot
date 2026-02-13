const path = require('path');
const fs = require('fs-extra');

module.exports = {
    config: {
        name: "reload",
        version: "1.0.0",
        isAdmin: true, // Chỉ m mới được dùng, ko tụi nó phá bot =))
        hasPermssion: 2,
        credits: "Gemini",
        description: "Làm mới toàn bộ lệnh không cần tắt bot 🐧☝️",
        commandCategory: "admin",
        usages: "",
        cooldowns: 5
    },

    run: async function({ bot, api, rawMsg, logger }) {
        const commandPath = path.join(process.cwd(), "commands");
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

        // Xóa sạch map lệnh cũ
        global.client.commands.clear();

        for (const file of commandFiles) {
            try {
                const filePath = path.join(commandPath, file);
                // XỬ LÝ HOT RELOAD: Xóa cache của file này trong hệ thống
                delete require.cache[require.resolve(filePath)];
                
                const cmd = require(filePath);
                const cmdConfig = cmd.config || cmd;
                
                if (cmdConfig.name) {
                    global.client.commands.set(cmdConfig.name, cmd);
                }
            } catch (error) {
                console.error(`Lỗi reload file ${file}:`, error);
            }
        }

        return bot.send(`✅ Đã nạp lại ${global.client.commands.size} lệnh thành công! Acc 2022 vẫn an toàn nhé m! 🐧☝️`);
    }
};