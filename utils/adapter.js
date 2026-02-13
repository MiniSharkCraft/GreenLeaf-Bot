const fs = require('fs-extra');
const { AttachmentBuilder } = require('discord.js');

class UniversalAPI {
    constructor(platform, originalObj, originalAPI) {
        this.platform = platform; // 'discord' hoặc 'messenger'
        this.msg = originalObj;   // Message Object gốc
        this.api = originalAPI;   // API gốc (Client Discord hoặc FCA)
    }

    // ============================================================
    // 1. HÀM GỬI TIN NHẮN VĂN BẢN (Chuẩn hóa)
    // ============================================================
    async send(text) {
        if (!text) return;

        if (this.platform === 'discord') {
            // Discord: Dùng reply để tag người dùng cho chuyên nghiệp
            return await this.msg.reply(text).catch(e => console.error("[DISCORD SEND ERROR]", e));
        } else {
            // Messenger: Ưu tiên threadID, nếu không có thì dùng senderID
            const targetID = this.msg.threadID || this.msg.senderID || this.threadID;
            
            return new Promise((resolve) => {
                this.api.sendMessage(text, targetID, (err, info) => {
                    if (err) console.error("[MESSENGER SEND ERROR]", err);
                    resolve(info);
                }, this.msg.messageID); // Tham số cuối để reply tin nhắn trên Messenger
            });
        }
    }

    // ============================================================
    // 2. HÀM GỬI FILE/ẢNH/VIDEO
    // ============================================================
    async sendFile(text, filePath) {
        if (!fs.existsSync(filePath)) {
            return this.send(`❌ Không tìm thấy file tại đường dẫn: ${filePath} 🐧`);
        }

        if (this.platform === 'discord') {
            // Discord: Sử dụng AttachmentBuilder
            const file = new AttachmentBuilder(filePath);
            return await this.msg.reply({ content: text, files: [file] }).catch(e => console.error(e));
        } else {
            // Messenger: Gửi qua ReadStream
            const targetID = this.msg.threadID || this.msg.senderID || this.threadID;
            const msgData = {
                body: text,
                attachment: fs.createReadStream(filePath)
            };
            return new Promise((resolve) => {
                this.api.sendMessage(msgData, targetID, (err, info) => {
                    if (err) console.error("[MESSENGER SENDFILE ERROR]", err);
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
                // Messenger: Cần messageID để biết thả vào tin nhắn nào
                this.api.setMessageReaction(emojiChar, this.msg.messageID, (err) => {
                    if (err) console.error("[MESSENGER REACT ERROR]", err);
                    resolve();
                }, true);
            });
        }
    }

    // ============================================================
    // 4. CÁC GETTER TIỆN ÍCH (TRÁNH UNDEFINED)
    // ============================================================

    // Lấy ID người gửi (Thống nhất là senderID)
    get senderID() {
        if (this.platform === 'discord') return this.msg.author.id;
        return String(this.msg.senderID || this.msg.author || "");
    }

    // Lấy ID nhóm hoặc cuộc trò chuyện (Thống nhất là threadID)
    get threadID() {
        if (this.platform === 'discord') return this.msg.channel.id;
        return String(this.msg.threadID || this.msg.senderID || "");
    }

    // Kiểm tra xem người nhắn có phải là Bot không
    get isBot() {
        if (this.platform === 'discord') return this.msg.author.bot;
        // Messenger: So khớp với ID của acc đang đăng nhập
        return String(this.msg.senderID) === String(this.api.getCurrentUserID());
    }

    // Lấy nội dung tin nhắn (Body)
    get body() {
        return this.platform === 'discord' ? this.msg.content : this.msg.body;
    }
}

module.exports = UniversalAPI;