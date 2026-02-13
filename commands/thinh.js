module.exports.config = {
    name: "thinh",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Bot Gen Z",
    description: "Kho tàng văn mẫu tán gái 🐧",
    isAdmin: false
};

module.exports.run = async ({ bot }) => {
    const data = [
        "Trứng rán cần mỡ, bắp cần bơ. Yêu không cần cớ, cần cậu cơ 🥺",
        "Anh ơi, có nóng không? Tim em đang cháy nè 🔥",
        "Ngoài kia bão táp mưa sa. Bôn ba mệt quá về nhà với em 🏠",
        "Cậu là Google à? Vì cậu có mọi thứ tớ tìm kiếm :v",
        "Muốn bắt cọp thì vào sở thú. Muốn tìm chỗ trú thì vào tim em 🐯"
    ];
    // Random thính
    const content = data[Math.floor(Math.random() * data.length)];
    return bot.send(`${content} 🐧❤️`);
};