const fs = require('fs-extra');
const path = require('path');
const logger = require('./utils/log');
const UniversalAPI = require('./utils/adapter');

// BỘ NHỚ TẠM CHỐNG SPAM (RAM)
const violations = new Map(); 

module.exports = {
    // ==========================================
    // 1. HÀM NẠP LỆNH (COMMANDS)
    // ==========================================
    loadCommands: function() {
        const cmdPath = path.join(process.cwd(), "commands");
        if (!fs.existsSync(cmdPath)) fs.mkdirSync(cmdPath);
        
        const files = fs.readdirSync(cmdPath).filter(file => file.endsWith(".js"));
        global.client.commands.clear(); 
        let successCount = 0;

        for (const file of files) {
            try {
                const filePath = path.join(cmdPath, file);
                delete require.cache[require.resolve(filePath)]; 
                const cmd = require(filePath);
                
                if (cmd.config && cmd.config.name) {
                    global.client.commands.set(cmd.config.name, cmd);
                    successCount++;
                }
            } catch (error) {
                logger.error(`❌ Lỗi nạp lệnh ${file}: ${error.message}`);
            }
        }
        logger.info(`✅ Đã nạp thành công ${successCount} lệnh!`);
    },

    // ==========================================
    // 2. HÀM NẠP SỰ KIỆN (EVENTS) 
    // ==========================================
    loadEvents: function() {
        const evtPath = path.join(process.cwd(), "events");
        if (!fs.existsSync(evtPath)) fs.mkdirSync(evtPath);
        
        const files = fs.readdirSync(evtPath).filter(file => file.endsWith(".js"));
        global.client.events.clear();

        for (const file of files) {
            try {
                const filePath = path.join(evtPath, file);
                delete require.cache[require.resolve(filePath)];
                const evt = require(filePath);
                
                if (evt.config && evt.config.name) {
                    global.client.events.set(evt.config.name, evt);
                }
            } catch (error) {
                logger.error(`❌ Lỗi nạp event ${file}: ${error.message}`);
            }
        }
    },

    // ==========================================
    // 3. BỘ NÃO XỬ LÝ TIN NHẮN CHÍNH
    // ==========================================
    handleCommand: async function(platform, rawMsg, api) {
        const bot = new UniversalAPI(platform, rawMsg, api);
        const senderID = String(bot.senderID);
        const now = Date.now();

        // --- 🛡️ LỚP GIÁP 1: KIỂM TRA ÁN TÙ (BANNED LIST) ---
        const banFile = path.join(process.cwd(), "cache", "banned.json");
        let bannedList = [];
        if (fs.existsSync(banFile)) {
            bannedList = fs.readJsonSync(banFile);
        }

        const userBanRecord = bannedList.find(user => user.id === senderID);
        if (userBanRecord) {
            if (now < userBanRecord.expire) return; // Đang bị xích -> Im lặng 🐧
            else {
                bannedList = bannedList.filter(user => user.id !== senderID);
                fs.writeJsonSync(banFile, bannedList); // Hết hạn -> Thả
            }
        }

        const prefix = global.client.config.prefix || "?";
        const body = bot.body || "";
        if (!body.startsWith(prefix)) return;

        // --- ĐỌC CONFIG ĐỘNG (Dành cho noreply và ratelimit) ---
        const configPath = path.join(process.cwd(), "config.json");
        const currentConfig = fs.existsSync(configPath) ? fs.readJsonSync(configPath) : global.client.config;
        const adminIDs = currentConfig.adminIDs || [];

        // --- 🛡️ LỚP GIÁP 2: CHẾ ĐỘ CHỈ ADMIN (NOREPLY) ---
        const adminOnly = currentConfig.adminOnly || false;
        if (adminOnly && !adminIDs.includes(senderID)) {
            return; // Bơ luôn không check lệnh nữa
        }

        // --- 🛡️ LỚP GIÁP 3: MÁY CHÉM AUTO-BAN ĐỘNG ---
        const limitCount = currentConfig.rateLimitCount || 3; // Mặc định 3 tin
        const limitTime = currentConfig.rateLimitTime || 2500; // Mặc định 2.5s

        if (!adminIDs.includes(senderID)) {
            if (!violations.has(senderID)) {
                violations.set(senderID, { count: 0, lastTime: now, penaltyLevel: 0 });
            }

            const userViolation = violations.get(senderID);
            
            // Check khoảng cách thời gian từ config
            if (now - userViolation.lastTime < limitTime) {
                userViolation.count++;
            } else {
                userViolation.count = Math.max(0, userViolation.count - 1);
            }
            userViolation.lastTime = now;

            // Check số lượng tin nhắn vi phạm từ config
            if (userViolation.count >= limitCount) {
                userViolation.penaltyLevel++;
                userViolation.count = 0; 

                let banTime = 0;
                let reason = "";

                if (userViolation.penaltyLevel === 1) {
                    banTime = 10 * 60 * 1000; 
                    reason = `Spam quá ${limitCount} tin trong ${limitTime/1000}s! Cút 10 phút! 🐧`;
                } else if (userViolation.penaltyLevel === 2) {
                    banTime = 60 * 60 * 1000; 
                    reason = "Vẫn nhây? Ra đảo 1 tiếng nhé m! =))";
                } else {
                    banTime = 24 * 60 * 60 * 1000; 
                    reason = "Vô phương cứu chữa! Cút thẳng 1 ngày! 🐧☝️";
                }

                bannedList.push({ id: senderID, expire: now + banTime });
                fs.writeJsonSync(banFile, bannedList);
                
                return bot.send(`🚫 [HỆ THỐNG AUTO-BAN]\n⚠️ UID: ${senderID}\n📝 Lý do: ${reason}\n⏳ Tự động ân xá sau khi hết hạn.`);
            }
        }

        // --- 🛠️ BƯỚC 4: PHÂN TÍCH VÀ CHẠY LỆNH ---
        const args = body.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = global.client.commands.get(commandName);
        if (!command) return;

        // Phân quyền Admin cứng
        if (command.config.isAdmin && !adminIDs.includes(senderID)) {
            return bot.send("🐧 Mày tuổi gì xài lệnh này? Gọi Admin ra đây =))");
        }

        // Cooldown tiêu chuẩn của từng lệnh
        if (!global.client.cooldowns.has(commandName)) {
            global.client.cooldowns.set(commandName, new Map());
        }

        const timestamps = global.client.cooldowns.get(commandName);
        const cooldownAmount = (command.config.cooldowns || 3) * 1000;

        if (timestamps.has(senderID)) {
            const expirationTime = timestamps.get(senderID) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return bot.send(`⏳ Đang hồi chiêu lệnh '${commandName}', ráng đợi ${timeLeft.toFixed(1)}s nữa nha m! :)?`);
            }
        }
        timestamps.set(senderID, now);
        setTimeout(() => timestamps.delete(senderID), cooldownAmount);

        // Chạy lệnh trong vòng tay an toàn
        try {
            await command.run({ bot, api, args, rawMsg, logger });
        } catch (error) {
            logger.error(`❌ Lỗi chạy lệnh ${commandName}: ${error.stack}`);
            bot.send(`❌ Lệnh lỏ mẹ r: ${error.message} 🐧`);
        }
    }
};