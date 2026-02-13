module.exports.config = {
    name: "simpgai",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    return content.includes("gái xinh") || content.includes("xin info") || content.includes("múi mít");
};

module.exports.run = async ({ bot }) => {
    await bot.react("🤤");
    await bot.send("Đâu? Gái đâu? Share cho tao với Boss tao xem chung coi 🐧. Đừng có ăn mảnh nhé ☝️");
};