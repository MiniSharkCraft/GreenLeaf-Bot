const axios = require('axios');

module.exports.config = {
    name: "girl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot Dâm",
    description: "Random ảnh gái xinh",
    isAdmin: false
};

module.exports.run = async ({ bot }) => {
    try {
        await bot.react("🤤");
        bot.send("Đang tìm info mấy em xinh tươi... đợi xíu 🐧");
        
        // API giả lập, mày thay bằng API thật nếu có nhé
        // Ví dụ API trả về JSON có key là url
        // const res = await axios.get('LINK_API_ANH_GAI'); 
        
        // Demo link cứng để test code
        const demoImg = "https://i.pinimg.com/736x/8e/d5/d3/8ed5d3c8c7c90772718105d15214088a.jpg";
        
        await bot.sendFile("Vợ quốc dân của mày đây 👇", demoImg);
        
    } catch (e) {
        bot.send("Gái đi lấy chồng hết rồi, 404 Not Found 🐧");
    }
};