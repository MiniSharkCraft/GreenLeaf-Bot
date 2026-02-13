/**
 * ====================================================================
<<<<<<< HEAD
 * 🌿 GREENLEAF BOT - CORE SYSTEM (ULTIMATE EDITION)
 * 👑 Coded by: Bot 2026 (Assistant)
 * 🐧 Style: Gen Z & Wibu Friendly
=======
 * 🌿 GREENLEAF BOT - VỎ BỌC BẤT TỬ (SESSION HOLDER)
 * 👑 Coded by: Tao x Mày 🐧
 * 🛡️ Chức năng: Giữ kết nối Messenger/Discord, không bao giờ ngắt!
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
 * ====================================================================
 */

const fs = require("fs-extra");
const path = require("path");
<<<<<<< HEAD
const config = require("./config.json"); // File cấu hình
const logger = require("./utils/log");   // File log màu mè
const UniversalAPI = require("./utils/adapter"); // Bộ chuyển đổi Discord/Mess

// --- ⚙️ KHỞI TẠO BIẾN TOÀN CỤC (GLOBAL) ---
global.client = {
    commands: new Map(),  // Lưu lệnh
    events: new Map(),    // Lưu sự kiện
    cooldowns: new Map(), // Lưu thời gian chờ
    rateLimit: new Map(), // Chống spam
    config: config        // Gắn config vào global dùng cho tiện
};

// --- 🛠️ HÀM DEBUG (SOICHIET) ---
// Chỉ hiện log khi trong config.json để "debugMode": true
const logDebug = (msg) => {
    if (config.debugMode === true) {
        // Màu tím mộng mơ cho debug
        console.log(`\x1b[35m[DEBUG] 🐛 ${msg}\x1b[0m`); 
    }
};

// --- 🛡️ ANTI-CRASH (CHỐNG ĐỘT TỬ) ---
process.on('unhandledRejection', (reason, p) => {
    if (config.debugMode) console.error('[ANTI-CRASH] Chi tiết:', reason);
    logger.error(`[ANTI-CRASH] Lỗi không xác định: ${reason.message || reason}`);
=======
const config = require("./config.json");
const logger = require("./utils/log");

// --- ⚙️ KHỞI TẠO BIẾN TOÀN CỤC (GLOBAL) ---
global.client = {
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    rateLimit: new Map(), // Cái này để chặn spam ở mức Core
    config: config
};

// --- 🛡️ ANTI-CRASH (CHỐNG ĐỘT TỬ) ---
// Bắt mọi lỗi lặt vặt để bot không bị văng terminal 🐧
process.on('unhandledRejection', (reason, p) => {
    if (config.debugMode) console.error('[ANTI-CRASH] Chi tiết:', reason);
    logger.error(`[ANTI-CRASH] Lỗi Promise: ${reason}`);
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
});

process.on('uncaughtException', (err, origin) => {
    if (config.debugMode) console.error('[ANTI-CRASH] Chi tiết:', err);
    logger.error(`[ANTI-CRASH] Lỗi nghiêm trọng: ${err.message}`);
});

<<<<<<< HEAD
// ============================================================
// 📂 HỆ THỐNG LOAD FILE (LOG TABLE EDITION)
// ============================================================

function loadCommands() {
    console.log("\n📦 --- ĐANG NẠP DANH SÁCH LỆNH ---");
    
    // Check xem folder có tồn tại không
    if (!fs.existsSync("./commands")) {
        logger.error("❌ Toang! Không tìm thấy thư mục 'commands'. Tạo ngay đi ba!");
        return;
    }

    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    global.client.commands.clear(); // Xóa cũ nạp mới
    
    // Tạo mảng dữ liệu để in bảng
    const tableData = [];

    for (const file of commandFiles) {
        try {
            const filePath = path.join(__dirname, "commands", file);
            // Xóa cache để reload nóng (Dev thích điều này)
            delete require.cache[require.resolve(filePath)];
            
            const cmd = require(filePath);
            
            // Hỗ trợ cả 2 kiểu config: module.exports.config HOẶC module.exports = { name... }
            const cmdConfig = cmd.config || cmd; 
            const cmdName = cmdConfig.name;

            if (cmdName) {
                global.client.commands.set(cmdName, cmd);
                tableData.push({ 
                    "File": file, 
                    "Lệnh": cmdName, 
                    "Trạng Thái": "✅ OK", 
                    "Note": "" 
                });
            } else {
                tableData.push({ 
                    "File": file, 
                    "Lệnh": "???", 
                    "Trạng Thái": "⚠️ SKIP", 
                    "Note": "Thiếu config.name" 
                });
            }
        } catch (e) {
            tableData.push({ 
                "File": file, 
                "Lệnh": "ERROR", 
                "Trạng Thái": "❌ FAIL", 
                "Note": e.message.split('\n')[0] // Lấy dòng lỗi đầu tiên
            });
        }
    }

    // IN CÁI BẢNG RA NÈ 🐧
    if (tableData.length > 0) console.table(tableData);
    logger.info(`✅ Tổng cộng: ${global.client.commands.size}/${commandFiles.length} lệnh hoạt động.`);
}

function loadEvents() {
    console.log("\n⚡ --- ĐANG NẠP SỰ KIỆN (EVENTS) ---");
    
    if (!fs.existsSync("./events")) {
        logger.warn("⚠️ Không tìm thấy thư mục 'events'. Bỏ qua.");
        return;
    }

    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
    global.client.events.clear();
    
    const tableData = [];

    for (const file of eventFiles) {
        try {
            const filePath = path.join(__dirname, "events", file);
            delete require.cache[require.resolve(filePath)];
            
            const ev = require(filePath);
            const evConfig = ev.config || ev;
            const evName = evConfig.name;

            if (evName) {
                global.client.events.set(evName, ev);
                tableData.push({
                    "File": file,
                    "Event": evName,
                    "Status": "✅ OK"
                });
            } else {
                tableData.push({
                    "File": file,
                    "Event": "???",
                    "Status": "⚠️ Miss Name"
                });
            }
        } catch (e) {
            tableData.push({
                "File": file,
                "Event": "ERROR",
                "Status": "❌ FAIL",
                "Note": e.message
            });
        }
    }
    
    if (tableData.length > 0) console.table(tableData);
    logger.info(`✅ Tổng cộng: ${global.client.events.size} events đang chạy ngầm.\n`);
}


logger.banner("GreenLeaf OS");
// Chạy loader
loadCommands();
loadEvents();
// ============================================================
// 🤖 BỘ NÃO XỬ LÝ TRUNG TÂM (CORE HANDLER)
// ============================================================
async function handleCommand(platform, rawMsg, rawAPI) {
    try {
        // 1. Chuẩn hóa tin nhắn
        const bot = new UniversalAPI(platform, rawMsg, rawAPI);
        const senderID = bot.senderID;
        const content = (bot.body || "").trim();

        // Debug log tin nhắn
        if (content) logDebug(`[MSG] [${platform}] ${senderID}: ${content}`);

        // Bỏ qua bot
        if (bot.isBot) return;

        // --- 🛡️ ANTI-SPAM (RATE LIMIT) ---
        if (!config.adminIDs.includes(senderID)) {
            if (global.client.rateLimit.has(senderID)) {
                const lastTime = global.client.rateLimit.get(senderID);
                if (Date.now() - lastTime < 2000) return; // Spam < 2s -> Bơ luôn
            }
            global.client.rateLimit.set(senderID, Date.now());
        }

        // --- 2. XỬ LÝ SỰ KIỆN (EVENTS) ---
        global.client.events.forEach(async (event) => {
            try {
                // Nếu event có hàm condition thì check, không thì chạy luôn
                if (!event.condition || (await event.condition({ bot, content, senderID, rawMsg }))) {
                    await event.run({ bot, api: rawAPI, rawMsg, content, senderID, config, logger });
                }
            } catch (e) { 
                logDebug(`Lỗi Event ${event.config?.name}: ${e.message}`); 
            }
        });

        // --- 3. XỬ LÝ LỆNH (COMMANDS) ---
        if (!content.startsWith(config.prefix)) return;

        const args = content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Tìm lệnh
        let command = global.client.commands.get(commandName);
        
        if (!command) {
            logDebug(`❌ Lệnh lạ: ${commandName}`);
            return; 
        }

        // --- CHECK QUYỀN HẠN & COOLDOWN ---
        const cmdConfig = command.config || command;

        // 1. Check Admin
        const isAdminCmd = cmdConfig.isAdmin || (cmdConfig.hasPermssion > 0);
        if (isAdminCmd && !config.adminIDs.includes(senderID)) {
            return bot.send("❌ Tuổi gì dùng lệnh này hả em? 🐧");
        }

        // 2. Check Cooldown
        if (!config.adminIDs.includes(senderID)) {
            const now = Date.now();
            const cooldownAmount = (cmdConfig.cooldowns || 3) * 1000;

            if (!global.client.cooldowns.has(senderID)) {
                global.client.cooldowns.set(senderID, new Map());
            }

            const userTimestamps = global.client.cooldowns.get(senderID);

            if (userTimestamps.has(commandName)) {
                const expirationTime = userTimestamps.get(commandName) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                    return bot.send(`⏳ Từ từ thôi Boss! Đợi ${timeLeft}s nữa nhé 🐧`);
                }
            }

            userTimestamps.set(commandName, now);
            setTimeout(() => userTimestamps.delete(commandName), cooldownAmount);
        }

        // --- THỰC THI LỆNH ---
        logDebug(`🚀 Execute: ${commandName} | User: ${senderID}`);
        
        try {
            await command.run({ 
                bot, api: rawAPI, rawMsg, args, config, logger 
            });
        } catch (error) {
            logger.error(`Lỗi khi chạy lệnh ${commandName}: ${error.message}`);
            if (config.debugMode) console.error(error);
            bot.send(`❌ Toang rồi ông giáo ạ! Lỗi: ${error.message}`);
        }

    } catch (error) {
        logger.error(`Lỗi Core System: ${error.message}`);
    }
}

// ============================================================
// 🚀 KHỞI ĐỘNG (STARTUP)
// ============================================================
async function startBot() {
    
    // --- MODE 1: DISCORD ---
    if (config.mode === "discord") {
        logger.info("🔵 Đang khởi động DISCORD Bot...");
        const { Client, GatewayIntentBits, Partials } = require('discord.js');
        
=======
// Nạp lệnh và event lần đầu tiên khi bật bot
try {
    const core = require("./core.js");
    core.loadCommands();
    core.loadEvents();
} catch (e) {
    logger.error(`❌ Chưa có file core.js kìa m ơi! Tạo lẹ đi :)?`);
}

// ============================================================
// 🚀 KHỞI ĐỘNG (STARTUP) - CHỈ GIỮ KẾT NỐI
// ============================================================
async function startBot() {
    logger.banner("GreenLeaf OS");

    // --- MODE 1: DISCORD ---
    if (config.mode === "discord") {
        const { Client, GatewayIntentBits, Partials } = require('discord.js');
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
        const client = new Client({ 
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages
            ],
            partials: [Partials.Channel] 
        });

        global.client.discord = client;

        client.on('ready', () => {
            logger.info(`✅ [DISCORD] Đã online: ${client.user.tag}`);
<<<<<<< HEAD
            client.user.setActivity(`${config.prefix}help | Bot 2026`, { type: 4 });
        });

        client.on('messageCreate', async (msg) => {
            await handleCommand("discord", msg, client);
        });

        client.login(config.discordToken).catch(e => {
            logger.error(`❌ [DISCORD] Lỗi Login: ${e.message}`);
        });
=======
            client.user.setActivity(`Đang chống spam | Bot 2026`, { type: 4 });
        });

        client.on('messageCreate', async (msg) => {
            try {
                // Đẩy logic sang core.js xử lý
                const dynamicCore = require("./core.js");
                await dynamicCore.handleCommand("discord", msg, client);
            } catch (e) { console.error("Lỗi gọi Core:", e); }
        });

        client.login(config.discordToken).catch(e => logger.error(`❌ [DISCORD] Lỗi Login: ${e.message}`));
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
    }

    // --- MODE 2: MESSENGER (FCA) ---
    else if (config.mode === "messenger") {
<<<<<<< HEAD
        logger.info("🔵 Đang khởi động MESSENGER Bot...");
        const login = require("@dongdev/fca-unofficial"); // Hoặc fca-horizon-remake
        
        if (!fs.existsSync(config.appStatePath)) {
            logger.error("❌ Không tìm thấy file appstate (cookie)!");
            return;
=======
        const login = require("@dongdev/fca-unofficial");
        
        if (!fs.existsSync(config.appStatePath)) {
            return logger.error("❌ Không tìm thấy file appstate (cookie)! Toang!");
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
        }

        try {
            const appState = JSON.parse(fs.readFileSync(config.appStatePath, "utf8"));
            
            login({ appState }, (err, api) => {
<<<<<<< HEAD
                if (err) {
                    logger.error(`❌ [MESS] Lỗi Login: ${JSON.stringify(err)}`);
                    return;
                }
=======
                if (err) return logger.error(`❌ [MESS] Lỗi Login: ${JSON.stringify(err)}`);
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)

                global.client.api = api;

                // Save AppState mới (Auto-Refresh Cookie)
                fs.writeFileSync(config.appStatePath, JSON.stringify(api.getAppState(), null, 2));
<<<<<<< HEAD
                logger.info(`✅ [MESSENGER] Đã online! UID: ${api.getCurrentUserID()}`);
=======
                logger.info(`✅ [MESSENGER] Đã online! UID: ${api.getCurrentUserID()} (Bất tử Mode)`);
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)

                api.setOptions({
                    listenEvents: true,
                    selfListen: false,
                    logLevel: "silent",
                    forceLogin: true,
                    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                });

                api.listenMqtt(async (err, message) => {
                    if (err) return logger.error(`[MQTT] Lỗi: ${err}`);
                    
                    if (["message", "message_reply"].includes(message.type)) {
<<<<<<< HEAD
                        await handleCommand("messenger", message, api);
=======
                        try {
                            // CHIÊU THỨC TỐI THƯỢNG: Luôn nạp lại core.js mỗi khi có tin nhắn (hoặc dùng require cache nếu m muốn tối ưu RAM)
                            const dynamicCore = require("./core.js");
                            await dynamicCore.handleCommand("messenger", message, api);
                        } catch (e) {
                            console.error("❌ Lỗi đứt gãy ở Core Logic:", e);
                        }
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
                    }
                });
            });
        } catch (e) {
            logger.error(`❌ Lỗi đọc AppState: ${e.message}`);
        }
    } 
    else {
<<<<<<< HEAD
        logger.error("❌ Config sai Mode! Vui lòng chọn 'discord' hoặc 'messenger'.");
=======
        logger.error("❌ Config sai Mode m ơi! Vui lòng chọn 'discord' hoặc 'messenger' =))");
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
    }
}

// Bấm nút start
<<<<<<< HEAD
startBot();
=======
startBot();
>>>>>>> 1d48a4d (feat: Deploy GreenLeaf V2.5 - Ultimate Economy & Defense System 🌿🐧)
