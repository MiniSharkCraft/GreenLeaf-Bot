/**
 * ====================================================================
 * 🌿 GREENLEAF BOT - UNIVERSAL ADAPTER (PREMIUM ANTI-BAN EDITION)
 * 👑 Status: 2022 Account Optimized 🐧☝️
 * 🛡️ Chức năng: Random Delay, Giả lập Typing, Support Multi-Platform
 * ====================================================================
 */

const fs = require('fs-extra');
const { AttachmentBuilder } = require('discord.js');

class UniversalAPI {
    constructor(platform, originalObj, originalAPI) {
        this.platform = platform; // 'discord' hoặc 'messenger'
        this.msg = originalObj;   // Message Object gốc (rawMsg)
        this.api = originalAPI;   // API gốc (Client Discord hoặc FCA)
    }

    // ============================================================
    // 🛡️ HÀM TẠO DELAY NGẪU NHIÊN (ANTI-BAN CORE)
    // ============================================================
    getRandomDelay(min = 2000, max = 5000) {
        // Tạo số mili giây ngẫu nhiên từ 2s đến 5s cho giống người thật 🐧
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ============================================================
    // 1. HÀM GỬI TIN NHẮN VĂN BẢN (RANDOM DELAY & TYPING)
    // ============================================================
    async send(text) {
        if (!text) return;

        const delay = this.getRandomDelay(2000, 4500); // Random từ 2s - 4.5s 🐧☝️

        if (this.platform === 'discord') {
            // Discord: Hiện hiệu ứng đang soạn tin
            await this.msg.channel.sendTyping().catch(() => {});
            await new Promise(res => setTimeout(res, delay));
            return await this.msg.reply(text).catch(e => console.error("[DISCORD SEND ERROR]", e));
        } else {
            const targetID = this.msg.threadID || this.msg.senderID || this.threadID;

            // Messenger: Bật icon "đang soạn tin nhắn..." ✍️
            this.api.sendTypingIndicator(targetID, (err) => {
                if (err) console.error("[MESSENGER TYPING ERROR]", err);
            });

            // Chờ đúng số ms ngẫu nhiên để đánh lừa Mark xoăn =))
            await new Promise(res => setTimeout(res, delay));

            return new Promise((resolve) => {
                this.api.sendMessage(text, targetID, (err, info) => {
                    if (err) console.error("[MESSENGER SEND ERROR]", err);
                    resolve(info);
                }, this.msg.messageID); // Auto-reply cực uy tín
            });
        }
    }

    // ============================================================
    // 2. HÀM GỬI FILE/NHẠC/VIDEO (DELAY CAO HƠN CHO AN TOÀN)
    // ============================================================
    async sendFile(text, filePath) {
        if (!fs.existsSync(filePath)) {
            return this.send(`❌ Tao không tìm thấy file ở: ${filePath} 🐧. Đừng lừa tao!`);
        }

        // Gửi file cần thời gian "nấu" lâu hơn tí (3s - 6s) cho giống người thực
        const delay = this.getRandomDelay(3000, 6000);
        
        if (this.platform === 'discord') {
            await this.msg.channel.sendTyping().catch(() => {});
            await new Promise(res => setTimeout(res, delay));
            const file = new AttachmentBuilder(filePath);
            return await this.msg.reply({ content: text, files: [file] }).catch(e => console.error(e));
        } else {
            const targetID = this.msg.threadID || this.msg.senderID || this.threadID;
            
            this.api.sendTypingIndicator(targetID, () => {});
            await new Promise(res => setTimeout(res, delay));

            const msgData = {
                body: text,
                attachment: fs.createReadStream(filePath) // Stream file cho đỡ tốn RAM m nè 🐧☝️
            };

            return new Promise((resolve) => {
                this.api.sendMessage(msgData, targetID, (err, info) => {
                    if (err) {
                        console.error("[MESSENGER SENDFILE ERROR]", err);
                        this.send("⚠️ Mark xoăn không cho gửi file này rồi m ơi! Thử lại sau đi =))");
                    }
                    resolve(info);
                }, this.msg.messageID);
            });
        }
    }

    // ============================================================
    // 3. HÀM THẢ CẢM XÚC (REACTION)
    // ============================================================
    async react(emojiChar) {
        if (!emojiChar) return;

        if (this.platform === 'discord') {
            return await this.msg.react(emojiChar).catch(() => {});
        } else {
            return new Promise((resolve) => {
                this.api.setMessageReaction(emojiChar, this.msg.messageID, (err) => {
                    if (err) console.error("[MESSENGER REACT ERROR]", err);
                    resolve();
                }, true);
            });
        }
    }

    // ============================================================
    // 4. CÁC GETTER TIỆN ÍCH (BOC TÁCH DỮ LIỆU)
    // ============================================================

    get senderID() {
        if (this.platform === 'discord') return this.msg.author.id;
        return String(this.msg.senderID || this.msg.author || "");
    }

    get threadID() {
        if (this.platform === 'discord') return this.msg.channel.id;
        return String(this.msg.threadID || this.msg.senderID || "");
    }

    get isBot() {
        if (this.platform === 'discord') return this.msg.author.bot;
        // Check nếu người gửi chính là ID của bot đang online
        return String(this.msg.senderID) === String(this.api.getCurrentUserID());
    }

    get body() {
        // Lấy nội dung tin nhắn tùy nền tảng
        return this.platform === 'discord' ? this.msg.content : this.msg.body;
    }
}

module.exports = UniversalAPI;