const axios = require('axios');

module.exports.config = {
    name: "meme",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Hề Hước",
    description: "Xem ảnh chế giải trí",
    isAdmin: false
};

module.exports.run = async ({ bot }) => {
    try {
        bot.send("🐧 Đang đi lượm meme...");
        // API ví dụ lấy meme
        const res = await axios.get('https://meme-api.com/gimme'); 
        const url = res.data.url;
        
        await bot.sendFile(`Cười tí đi cho đời bớt khổ :v \n${res.data.title}`, url);
    } catch (e) {
        bot.send("Lỗi mạng rồi hay sao á, nay không có meme đâu 🐧");
    }
};