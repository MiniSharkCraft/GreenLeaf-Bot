module.exports.config = {
    name: "greeting",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    const greetings = ["hello", "hi bot", "chào bot", "xin chào", "lô", "hế lô"];
    // Check xem tin nhắn CÓ BẮT ĐẦU bằng mấy từ này không
    return greetings.some(word => content.startsWith(word));
};

module.exports.run = async ({ bot }) => {
    await bot.react("👋");
    const replies = [
        "Lô bạn êi! Nay trời đẹp hen 🐧",
        "Chào chào! Có tiền không mà chào? :v",
        "Hello! Cần gì thì gõ .help nha, đừng gõ đầu tao là được =))"
    ];
    await bot.send(replies[Math.floor(Math.random() * replies.length)]);
};