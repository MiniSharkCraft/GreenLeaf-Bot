module.exports.config = {
    name: "chon",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot 2026",
    description: "Chọn hộ A hay B",
    isAdmin: false
};

module.exports.run = async ({ bot, args }) => {
    // Cú pháp: .chon Cơm | Phở | Nhịn
    const input = args.join(" ").split("|");
    if (input.length < 2) return bot.send("🐧 Nhập ít nhất 2 món đi Boss (cách nhau bằng dấu | nhé)");
    
    const choice = input[Math.floor(Math.random() * input.length)].trim();
    await bot.react("🤔");
    return bot.send(`Theo nhân phẩm của tao thì mày nên chọn: **${choice}** nha 🐧☝️`);
};