module.exports.config = {
    name: "khennguoc",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Xéo Xắt",
    description: "Khen nhưng nghe rất cay",
    isAdmin: false
};

module.exports.run = async ({ bot, args }) => {
    const target = args.join(" ") || "bạn";
    const sentences = [
        `Chu cha mạ ơi, ${target} thông minh quá, chắc IQ 2 con số ha? 🐧`,
        `${target} đẹp trai/gái đó, mà đẹp nhất khi che mặt lại :v`,
        `Ngưỡng mộ ${target} ghê, làm biếng mà vẫn sống tốt hay thật =))`,
        `Giọng ${target} hay quá, y như vịt đực kêu chiều mưa vậy 🎶`
    ];
    
    bot.send(sentences[Math.floor(Math.random() * sentences.length)]);
};