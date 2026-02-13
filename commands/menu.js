const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "menu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bot 2026",
    description: "Xem menu (Chế độ đọc file trực tiếp)",
    isAdmin: false
};

module.exports.run = async ({ bot }) => {
    try {
        let msg = "📜 **SỚ TÁO QUÂN - ĐẠI NỘI TỔNG QUẢN** 📜\n\n";
        let count = 0;

        // 1. Quét toàn bộ file trong thư mục hiện tại (thư mục commands)
        // __dirname chính là đường dẫn đến folder chứa file menu.js này
        const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

        // 2. Duyệt từng file để lấy thông tin
        for (const file of files) {
            try {
                // Load file ra để đọc config
                // Dùng path.join cho nó chuẩn đường dẫn Window/Linux
                const commandPath = path.join(__dirname, file);
                
                // Xóa cache cũ đi để lỡ có update code thì nó cập nhật luôn (Option)
                delete require.cache[require.resolve(commandPath)];
                
                const cmd = require(commandPath);
                
                // Chỉ lấy những file nào có export config chuẩn
                if (cmd.config && cmd.config.name) {
                    count++;
                    msg += `🔹 **${cmd.config.name}**: ${cmd.config.description || "Chưa có mô tả (Lười vl 🐧)"}\n`;
                }
            } catch (e) {
                console.error(`Lỗi đọc lệnh ${file}:`, e);
            }
        }

        msg += `\n✨ **Tổng cộng:** ${count} món đồ chơi.`;
        msg += `\n🐧 **Ping:** ${bot.ws ? bot.ws.ping : "???"}ms`;

        // 3. Gửi hàng
        return bot.send(msg);

    } catch (error) {
        console.error("Lỗi menu:", error);
        return bot.send("❌ Toang tập 2! Lỗi này chắc do ăn ở rồi :v");
    }
};