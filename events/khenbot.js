module.exports.config = {
    name: "khenbot",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    return content.includes("bot khôn") || content.includes("bot giỏi") || content.includes("bot xịn");
};

module.exports.run = async ({ bot }) => {
    await bot.react("uwu");
    await bot.send("Chuyện! Boss tao code cả đêm mà lị 🐧☝️. Khen nữa đi tao thích lắm :>");
};