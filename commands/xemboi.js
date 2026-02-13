module.exports.config = {
    name: "xemboi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thầy Bói Mù",
    description: "Xem vận mệnh trong ngày",
    isAdmin: false
};

module.exports.run = async ({ bot }) => {
    const phanTram = Math.floor(Math.random() * 100);
    const loiKhuyen = [
        "Nên ở nhà đắp chăn, ra đường chó cắn 🐧",
        "Mạnh dạn tỏ tình đi, cùng lắm là quê thôi =))",
        "Tiền bạc rủng rỉnh, nhớ bao tao ly trà sữa.",
        "Cẩn thận cái mồm, coi chừng vạ miệng nha con :v"
    ];
    const khuyen = loiKhuyen[Math.floor(Math.random() * loiKhuyen.length)];
    
    bot.send(`🔮 **Quẻ hôm nay của mày:**\n- Độ may mắn: ${phanTram}%\n- Lời phán: ${khuyen}`);
};