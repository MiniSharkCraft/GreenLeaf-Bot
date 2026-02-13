module.exports.config = {
    name: "taixiu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Casino",
    description: "Test nhân phẩm Tài Xỉu",
    isAdmin: false
};

module.exports.run = async ({ bot }) => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const d3 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2 + d3;
    
    const result = (total >= 11 && total <= 17) ? "TÀI 🔴" : "XỈU ⚫";
    
    let msg = `🎲 Xúc xắc: [ ${d1} ] [ ${d2} ] [ ${d3} ]\n`;
    msg += `👉 Tổng: ${total} - Kết quả: **${result}**\n`;
    msg += (total === 3 || total === 18) ? "🐧 BÃO!!! Ăn đậm rồi Boss ơi!" : "Hên xui nha mày =))";
    
    bot.send(msg);
};