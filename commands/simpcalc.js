module.exports = {
    name: "simpcalc",
    description: "Đo độ dại gái/trai của đối tượng 🐶",
    
    run: async ({ bot, args }) => {
        const target = args.join(" ") || "Bản thân";
        const percent = Math.floor(Math.random() * 101);
        
        let status = "";
        if (percent < 20) {
            status = "Lạnh lùng boy/girl, tình yêu chỉ là hạt cát, sự nghiệp mới là tất cả 🥶";
        } else if (percent < 50) {
            status = "Bình thường, biết điểm dừng. Không có em này thì ta tán em khác :0";
        } else if (percent < 80) {
            status = "Simp lỏ chính hiệu! Người ta 'ừ' 1 tiếng mà nổ inbox người ta 10 câu :))";
        } else {
            status = "Chúa tể vương quốc Simp! Lấy thẻ ATM nạp game của mình đưa người ta luôn đi chờ gì nữa :)?";
        }

        const response = `🐶 ─── [ MÁY QUÉT SIMP ] ─── 🐶\n🎯 Đối tượng: ${target}\n📊 Mức độ simp: ${percent}%\n📝 Đánh giá: ${status}`;
        
        return bot.send(response);
    }
};