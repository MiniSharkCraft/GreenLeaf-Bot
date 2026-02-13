module.exports.config = {
    name: "sadboi",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    return content.includes("buồn quá") || content.includes("chán quá") || content.includes("thất tình");
};

module.exports.run = async ({ bot }) => {
    await bot.react("💔");
    const replies = [
        "Thôi đừng buồn nữa, buồn làm gì rồi cũng phải sống tiếp à 🐧",
        "Vào làm ván game với Boss tao cho đỡ sầu nè 🎮",
        "Yêu đương gì tầm này, code web đi cho giàu rồi gái/trai nó tự theo =))",
        "Khóc to lên xem nào? 😈"
    ];
    await bot.send(replies[Math.floor(Math.random() * replies.length)]);
};