module.exports.config = {
    name: "haha",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    // Regex bắt kkk, haha, hihi, =))
    return /(haha|kkk|hihi|=))|:v)/.test(content);
};

module.exports.run = async ({ bot }) => {
    // Chỉ thả icon thôi cho đỡ spam
    await bot.react("😆");
};