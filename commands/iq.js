module.exports.config = {
    name: "iq",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Scientist",
    description: "Đo IQ ngẫu nhiên",
    isAdmin: false
};

module.exports.run = async ({ bot, args }) => {
    const iq = Math.floor(Math.random() * 200) + 1; // 1 đến 200
    let comment = "";
    
    if(iq < 50) comment = "Thôi xong, reset server đi mày ơi 🐧";
    else if(iq < 100) comment = "Cũng tạm, đủ xài :v";
    else if(iq < 150) comment = "Á đù, Einstein sống lại à? :0";
    else comment = "Vượt tầm vũ trụ rồi, tao lạy mày ☝️";

    bot.send(`🧠 IQ của mày hiện tại là: **${iq}**\n📝 Đánh giá: ${comment}`);
};