const fs = require('fs-extra');
const { AttachmentBuilder } = require('discord.js');

class UniversalAPI {
    constructor(platform, originalObj, originalAPI) {
        this.platform = platform; // 'discord' hoặc 'messenger'
        this.msg = originalObj;   // Message Object gốc
        this.api = originalAPI;   // API gốc (Client Discord hoặc FCA)
    }

    // 1. Hàm gửi tin nhắn văn bản (Chuẩn hóa)
    async send(text) {
        if (this.platform === 'discord') {
            return await this.msg.reply(text).catch(e => console.error(e));
        } else {
            return new Promise((resolve) => {
                this.api.sendMessage(text, this.msg.threadID, (err, info) => resolve(info));
            });
        }
    }

    // 2. Hàm gửi File/Ảnh/Video (Tự xử lý Stream/Buffer)
    async sendFile(text, filePath) {
        if (!fs.existsSync(filePath)) return this.send(`❌ Không tìm thấy file: ${filePath}`);

        if (this.platform === 'discord') {
            // Discord: Cần AttachmentBuilder
            const file = new AttachmentBuilder(filePath);
            return await this.msg.reply({ content: text, files: [file] });
        } else {
            // Messenger: Cần ReadStream
            const msgData = {
                body: text,
                attachment: fs.createReadStream(filePath)
            };
            return new Promise((resolve) => {
                this.api.sendMessage(msgData, this.msg.threadID, (err, info) => resolve(info));
            });
        }
    }

    // 3. Hàm thả cảm xúc (Reaction)
    async react(emojiChar) {
        if (this.platform === 'discord') {
            // Discord dùng emoji unicode trực tiếp
            return await this.msg.react(emojiChar).catch(() => {});
        } else {
            // Messenger cần chuyển đổi nếu cần, nhưng cơ bản FCA hỗ trợ icon
            return new Promise((resolve) => {
                this.api.setMessageReaction(emojiChar, this.msg.messageID, () => resolve(), true);
            });
        }
    }

    // 4. Lấy ID người gửi (Thống nhất gọi là senderID)
    get senderID() {
        return this.platform === 'discord' ? this.msg.author.id : this.msg.senderID;
    }

    // 5. Lấy ID nhóm/kênh (Thống nhất gọi là threadID)
    get threadID() {
        return this.platform === 'discord' ? this.msg.channel.id : this.msg.threadID;
    }
}

module.exports = UniversalAPI;