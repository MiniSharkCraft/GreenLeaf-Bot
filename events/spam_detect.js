module.exports.config = {
    name: "spamdetect",
    version: "1.0.0"
};

module.exports.condition = (message) => {
    const content = message.body || "";
    // Điều kiện: Dài hơn 200 ký tự và không phải là Admin (thêm check ID admin nếu cần)
    return content.length > 200;
};

module.exports.run = async ({ bot }) => {
    await bot.react("📜");
    await bot.send("Viết cái gì mà dài như văn sớ Táo Quân vậy má? 🐧 Đọc mỏi cả mắt, tóm tắt lại đi :v");
};