module.exports = {
    name: "howbig",
    description: "Đo kích thước 'nhân phẩm' bí mật 📏",
    
    run: async ({ bot, args }) => {
        const target = args.join(" ") || "Của mày";
        const size = Math.floor(Math.random() * 30) + 1; // Random 1 - 30cm
        
        // Vẽ "nhân phẩm" =))
        const dong = "8" + "=".repeat(size) + "D";
        
        let status = "";
        if (size < 5) {
            status = "Cái nấm kim châm này để xỉa răng à? Nhìn chán chả buồn nói :v?";
        } else if (size < 12) {
            status = "Hơi khiêm tốn tí nhưng kỹ năng bù đắp nha, không sao đâu cố lên =))";
        } else if (size < 18) {
            status = "Hàng chuẩn đấy! Đủ dùng để cày cuốc qua ngày :0";
        } else {
            status = "Quái vật 3 đầu! Mang cái này đi làm vũ khí hủy diệt được rồi đấy 🐧☝️";
        }

        const response = `📏 ─── [ THƯỚC ĐO NHÂN PHẨM ] ─── 📏\n🎯 Đối tượng: ${target}\n📐 Kích thước: ${size}cm\n🔍 Hiển thị: ${dong}\n📝 Phán quyết: ${status}`;
        
        return bot.send(response);
    }
};