module.exports.config = {
    name: "slap",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Bạo Lực",
    description: "Tát đứa mày ghét",
    isAdmin: false
};

module.exports.run = async ({ bot, args }) => {
    const target = args.join(" ") || "không khí";
    // Link GIF tát (đổi link khác nếu muốn)
    const gifUrl = "https://i.pinimg.com/originals/4e/9e/a1/4e9ea150354ad3159339b202cbc6aed1.gif"; 
    
    await bot.sendFile(`Bốp! 👋 Tao thay mặt Boss tát **${target}** lệch mỏ nha 🐧`, gifUrl);
};