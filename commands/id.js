module.exports = {
    name: "id",
    description: "Lấy ID của mày hoặc người được tag 🆔",
    
    run: async ({ bot, args, msg }) => {
        // Nếu là Discord
        if (bot.platform === 'discord') {
            const user = msg.mentions.users.first() || msg.author;
            return bot.send(`🆔 ID của ${user.username} là: \`${user.id}\``);
        } 
        
        // Nếu là Messenger
        else {
            // Nếu có tag người khác (FCA thường trả về mentions)
            if (Object.keys(msg.mentions).length > 0) {
                let text = "";
                for (let id in msg.mentions) {
                    text += `👤 ${msg.mentions[id].replace("@", "")}: ${id}\n`;
                }
                return bot.send(text);
            } 
            
            // Nếu không tag ai, trả về ID cá nhân và Box
            return bot.send(`👤 UID của mày: ${bot.senderID}\n🏘️ ID Box này: ${bot.threadID}`);
        }
    }
};