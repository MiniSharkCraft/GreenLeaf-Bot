module.exports.config = {
    name: "goodnight",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    return content.includes("ngủ ngon") || content.includes("g9") || content === "ngủ đi";
};

module.exports.run = async ({ bot }) => {
    await bot.react("😴");
    await bot.send("Ngủ ngon nha tml 🐧❤️. Mơ thấy ác mộng nhớ gọi tao cứu =))");
};