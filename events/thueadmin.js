module.exports.config = {
    name: "thueadmin",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    return content.includes("admin") || content.includes("chủ bot") || content.includes("ad ơi");
};

module.exports.run = async ({ bot }) => {
    await bot.react("🛡️");
    await bot.send("Boss tao đang bận code web kiếm tỉ đô rồi 🐧. Có gì nhắn lại đây tao chuyển lời cho ☝️");
};