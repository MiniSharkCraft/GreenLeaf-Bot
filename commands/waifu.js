const axios = require('axios');

module.exports.config = {
    name: "waifu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot 2026",
    description: "Random ảnh waifu mlem mlem",
    usages: "waifu",
    cooldowns: 5
};

module.exports.run = async ({ bot }) => {
    try {
        // 1. Gọi API lấy link ảnh
        // (Có thể đổi 'waifu' thành 'neko', 'shinobu', 'megumin' tùy gu)
        const response = await axios.get('https://api.waifu.pics/sfw/waifu');
        const imageUrl = response.data.url;
        
        // 2. Gửi ảnh
        // bot.send ở đây T đoán là wrapper của message.channel.send
        // nên ném object { content, files } vào là nó nhận hết.
        return bot.send({
            content: "Vợ của mày về rồi đây 🐧 Liếm màn hình ít thôi!",
            files: [imageUrl] 
        });

    } catch (error) {
        console.error(error);
        return bot.send("Toang rồi ông giáo ạ! API lỗi hoặc mạng lag 🐧");
    }
};