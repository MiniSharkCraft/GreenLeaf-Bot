module.exports.config = {
    name: "chui",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Mỏ Hỗn",
    description: "Chửi đứa bạn ghét (vui thôi nha)",
    isAdmin: false
};

module.exports.run = async ({ bot, args }) => {
    const target = args.join(" ") || "đứa nào đó";
    const insults = [
        `Ê ${target}, mày sống lỗi vừa thôi, thở nhẹ cũng thấy ô nhiễm 🐧`,
        `${target} ơi, não mày phẳng hay là sân bay Tân Sơn Nhất vậy? :v`,
        `Nhìn mặt ${target} là thấy uy tín... uy tín âm vô cực =))`,
        `Đừng nói chuyện với tao, tao dị ứng với sự ngốc nghếch của ${target} ☝️`
    ];
    const msg = insults[Math.floor(Math.random() * insults.length)];
    return bot.send(msg);
};