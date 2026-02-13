// ====================================================
// GREENLEAF BOT - MULTI-CORE (MESSENGER & DISCORD)
// Phiên bản: VPS Immortal 🚀 (Đã Fix Spam)
// ====================================================

const fs = require("fs-extra");
const path = require("path");
const config = require("./config.json");
const logger = require("./utils/log");
const UniversalAPI = require("./utils/adapter");

// --- 🛡️ ANTI-CRASH SYSTEM (CHỐNG ĐỘT TỬ) ---
process.on('unhandledRejection', (reason, p) => {
    logger.error(`[ANTI-CRASH] Unhandled Rejection: ${reason}`);
});

process.on('uncaughtException', (err, origin) => {
    logger.error(`[ANTI-CRASH] Uncaught Exception: ${err}`);
});

// --- 📂 KHỞI TẠO BIẾN TOÀN CỤC ---
const commands = new Map();
const events = new Map();
const cooldowns = new Map(); // Cái này là cooldown của lệnh (ví dụ: chờ 10s mới đc dùng lệnh cờ bạc)

// 🔥 [NEW] RATE LIMIT MAP (Chống Spam tin nhắn liên tục)
const rateLimit = new Map(); 
const RATE_LIMIT_TIME = 2000; // 2000ms = 2 giây (Chỉnh lên 3000 nếu muốn an toàn hơn)

// --- 🔄 LOAD COMMANDS (LỆNH) ---
try {
    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const cmd = require(`./commands/${file}`);
        if (cmd.config && cmd.config.name) {
            commands.set(cmd.config.name, cmd);
        }
    }
} catch (e) { logger.error("Lỗi load commands: " + e.message); }

// --- ⚡ LOAD EVENTS (SỰ KIỆN) ---
try {
    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
        const ev = require(`./events/${file}`);
        if (ev.config && ev.config.name) {
            events.set(ev.config.name, ev);
        }
    }
} catch (e) { logger.error("Lỗi load events: " + e.message); }

// Hiển thị Banner cho ngầu
logger.banner("GreenLeaf VPS");

// ============================================================
// 🤖 CORE XỬ LÝ LỆNH (CHUNG CHO CẢ 2 NỀN TẢNG)
// ============================================================
async function handleCommand(platform, rawMsg, rawAPI) {
    // Kích hoạt Adapter (Bộ chuyển đổi) để lấy senderID chuẩn
    const bot = new UniversalAPI(platform, rawMsg, rawAPI);
    const senderID = bot.senderID;

    // --- 🛡️ [NEW] LOGIC ANTI-SPAM (RATE LIMIT) ---
    // Bỏ qua check nếu là Bot tự nhắn (tránh vòng lặp vô tận)
    if (senderID === rawAPI.getCurrentUserID?.()) return; 

    if (rateLimit.has(senderID)) {
        const lastTime = rateLimit.get(senderID);
        const diff = Date.now() - lastTime;
        
        // Nếu nhắn nhanh hơn quy định -> RETURN LUÔN (Không xử lý gì cả)
        if (diff < RATE_LIMIT_TIME) {
            return; 
        }
    }
    // Cập nhật thời gian nhắn mới nhất
    rateLimit.set(senderID, Date.now());
    // ----------------------------------------------

    const content = (platform === 'discord') ? rawMsg.content : rawMsg.body;
    
    // 1. XỬ LÝ EVENT (Không cần prefix)
    events.forEach(async (event) => {
        try {
            if (event.condition && event.condition(rawMsg, content)) {
                await event.run({ bot, rawMsg, config, logger });
            }
        } catch (e) { logger.error(`Lỗi Event ${event.config.name}: ${e.message}`); }
    });

    // 2. XỬ LÝ COMMAND (Cần prefix)
    if (!content.startsWith(config.prefix)) return;

    const args = content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands.has(commandName)) return;
    const command = commands.get(commandName);

    // Check Admin
    if (command.config.isAdmin && !config.adminIDs.includes(bot.senderID)) {
        return bot.send("❌ Lệnh này chỉ dành cho Admin! 🐧");
    }

    // Check Command Cooldown (Đây là cooldown riêng của từng lệnh)
    if (cooldowns.has(bot.senderID)) {
        const expirationTime = cooldowns.get(bot.senderID) + config.cooldown;
        if (Date.now() < expirationTime) {
            return bot.send("⏳ Từ từ thôi Boss, đang hồi chiêu! 🐧");
        }
    }
    cooldowns.set(bot.senderID, Date.now());

    // Thực thi lệnh
    try {
        logger.cmd(bot.senderID, commandName);
        await command.run({ bot, args, config, logger }); 
    } catch (error) {
        logger.error(`Lỗi thực thi lệnh ${commandName}: ${error.message}`);
        bot.send(`❌ Lỗi rồi Boss: ${error.message}`);
    }
}

// ============================================================
// 🔄 HÀM KHỞI ĐỘNG (AUTO RESTART LOGIC)
// ============================================================
function startBot() {
    
    // 🔵 MODE 1: DISCORD
    if (config.mode === "discord") {
        const { Client, GatewayIntentBits } = require('discord.js');
        const client = new Client({ 
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
        });

        client.on('ready', () => logger.info(`✅ [DISCORD] Đã online: ${client.user.tag}`));
        
        client.on('messageCreate', async (msg) => {
            if (msg.author.bot) return;
            await handleCommand("discord", msg, client);
        });

        client.login(config.discordToken).catch(e => {
            logger.error(`[DISCORD] Lỗi Login: ${e.message}`);
            logger.warn("⚠️ Đang thử lại sau 60s...");
            setTimeout(startBot, 60000);
        });
    }

    // 🔵 MODE 2: MESSENGER (FCA)
    else if (config.mode === "messenger") {
        const login = require("@dongdev/fca-unofficial"); // Hoặc fca-horizon-remake tùy Boss dùng
        
        // Check AppState
        if (!fs.existsSync(config.appStatePath)) {
            logger.error("❌ Không tìm thấy file appstate! Vui lòng thêm cookie.");
            process.exit(1); 
        }

        const appState = JSON.parse(fs.readFileSync(config.appStatePath, "utf8"));

        login({ appState }, (err, api) => {
            if (err) {
                logger.error(`[MESS] Lỗi Login: ${JSON.stringify(err)}`);
                logger.warn("⚠️ Đang thử đăng nhập lại sau 60s...");
                return setTimeout(startBot, 60000);
            }
            
            // ✅ AUTO RENEW APPSTATE
            fs.writeFileSync(config.appStatePath, JSON.stringify(api.getAppState(), null, 2));
            logger.info(`✅ [MESSENGER] Đã online & Saved AppState! UID: ${api.getCurrentUserID()}`);
            
            // Cấu hình FCA
            api.setOptions({
                listenEvents: true,
                selfListen: false,
                forceLogin: true,
                autoMarkRead: false,
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            });

            // Lắng nghe MQTT
            api.listenMqtt(async (err, message) => {
                if (err) {
                    logger.error(`❌ Mất kết nối MQTT: ${err}`);
                    api.logout(); // Logout sạch sẽ
                    logger.warn("🔄 Đang tái khởi động Bot...");
                    return startBot(); 
                }
                
                if (!message || !message.body) return;
                
                // Chuyển tin nhắn vào Core xử lý
                await handleCommand("messenger", message, api);
            });
        });
    } else {
        logger.error("❌ Config sai Mode! Chọn 'discord' hoặc 'messenger'.");
    }
}

// 🔥 KÍCH HOẠT BOT
startBot();
