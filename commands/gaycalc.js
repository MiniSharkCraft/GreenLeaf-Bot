module.exports = {
    name: "gaycalc",
    description: "Máy đo độ cong của nhân phẩm 🏳️‍🌈",
    
    run: async ({ bot, args }) => {
        // Nếu không tag ai thì tự vả vào mặt mình :))
        const target = args.join(" ") || "Mày";
        const percent = Math.floor(Math.random() * 101); // Random 0 - 100
        
        let status = "";
        if (percent < 20) {
            status = "Thẳng như thước kẻ! Chuẩn men 100% 🗿";
        } else if (percent < 50) {
            status = "Hơi cong cong rồi đấy... Bắt đầu để ý trai đẹp rồi đúng không :v?";
        } else if (percent < 80) {
            status = "Bê đê hiện hình! Đêm nằm ngủ nhớ cẩn thận cái cúc áo nha =)?";
        } else {
            status = "100% Bóng xà bang! Trông bóng lộn thế này thì hết cứu cmnr 🐧☝️";
        }

        const response = `🏳️‍🌈 ─── [ MÁY QUÉT GAY ] ─── 🏳️‍🌈\n🎯 Đối tượng: ${target}\n📊 Độ gay: ${percent}%\n📝 Phán quyết: ${status}`;
        
        return bot.send(response);
    }
};