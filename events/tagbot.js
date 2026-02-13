module.exports.config = {
    name: "tagbot",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    // Thay "bot" bằng tên bot của mày (ví dụ: culi, đệ tử...)
    return content.includes("bot ơi") || content.includes("@bot");
};

module.exports.run = async ({ bot }) => {
    await bot.react("👀");
    const replies = [
        "Kêu gì tao? Đang bận đi farm quái với Boss 🐧",
        "Có mặt! Mày cần tao hay cần Boss tao? :v",
        "Đừng tag nữa, tao ngại... ngại đấm mày á =))",
        "Gì dợ? Đang ngủ 😴"
    ];
    await bot.send(replies[Math.floor(Math.random() * replies.length)]);
};