module.exports.config = {
    name: "chuithe",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = (message.body || "").toLowerCase();
    const badWords = ["đm", "vcl", "đkm", "đmm", "cc", "loz"];
    return badWords.some(word => content.includes(word));
};

module.exports.run = async ({ bot }) => {
    await bot.react("🤬");
    await bot.send("🤫 Ăn nói xà lơ! Boss tao không dạy mày nói bậy nha con :v. Rén cái mỏ lại!");
};