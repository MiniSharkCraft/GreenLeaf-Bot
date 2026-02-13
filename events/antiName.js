module.exports = {
    config: {
        name: "antiName",
        eventType: ["log:thread-name"],
        version: "1.0.0",
        credits: "Gemini",
        description: "Chống đổi tên nhóm khi không được phép 🛡️"
    },

    run: async function({ api, event, bot }) {
        const { threadID, author, logMessageData } = event;
        const name = logMessageData.name;
        
        // Mày tự set tên nhóm cố định ở đây hoặc dùng database nhé
        const fixedName = "BOX CHAT PREMIUM 2022 🐧☝️"; 

        // Nếu người đổi không phải là Admin (UID của m)
        if (author !== "61577016266615" && name !== fixedName) {
            api.setTitle(fixedName, threadID, () => {
                bot.send(`⚠️ Thằng UID ${author} vừa định đổi tên box à? Không có cửa đâu con trai! 🐧☝️`);
            });
        }
    }
};