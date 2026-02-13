module.exports = {
    config: {
        name: "ship",
        version: "2.0.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Mày x Gemini 🐧",
        description: "Đo độ hợp nhau của 2 người bản chửi thề & tấu hài 🐧",
        commandCategory: "giải trí",
        usages: "[Tên 1] và [Tên 2]",
        cooldowns: 5
    },
    
    run: async ({ bot, args }) => {
        const input = args.join(" ");
        // Nâng cấp 1: Nhận diện cả chữ "và", "vs", hoặc dấu phẩy cho tiện
        const names = input.split(/ và | vs | , | - /i); 

        if (names.length < 2) {
            return bot.send("❌ Gõ tử tế coi m! Nhập đúng 2 người vào. Ví dụ: `?ship Yasuo và Yone` 🐧☝️");
        }

        const person1 = names[0].trim();
        const person2 = names[1].trim();

        // Quay xổ số tình yêu (0 -> 100%)
        const lovePercent = Math.floor(Math.random() * 101);

        // Tạo thanh tiến trình (Progress bar) cho nó pờ rồ
        const filled = Math.round(lovePercent / 10);
        const empty = 10 - filled;
        const progressBar = "💖".repeat(filled) + "🖤".repeat(empty);

        // Nâng cấp 2: Mảng Random Phán xét nhân phẩm
        let statusList = [];
        
        if (lovePercent >= 0 && lovePercent <= 20) {
            statusList = [
                "Kẻ thù kiếp trước! Gặp nhau là đấm cmnl =)) 🥊",
                "Chó với mèo còn hòa thuận hơn 2 đứa bây :v Cạch mặt nhau đi!",
                "Rate nổ hũ cục này là 0%. Đừng cố đấm ăn xôi nữa m ơi :0?",
                "Ping 999ms! Mạng không tương thích, dẹp dẹp! 🐧☝️"
            ];
        } else if (lovePercent > 20 && lovePercent <= 50) {
            statusList = [
                "Chỉ là người qua đường... hoặc kẹt cmn ở Friendzone rồi :)) 🤡",
                "Tình anh em xã hội thôi m, đừng ảo tưởng sức mạnh =))",
                "NPC với Main character à? Không có cửa đâu, làm bạn thì được :v?",
                "Đúng nhận sai cãi, kèo này chua lắm, quay xe đi còn kịp 🐧"
            ];
        } else if (lovePercent > 50 && lovePercent <= 80) {
            statusList = [
                "Mập mờ đấy! Thích nhau rồi mà còn ngại à? Tới luôn đi :0? 🫣",
                "Code sắp chạy được rồi, fix nốt mấy cái bug 'ngại ngùng' là commit cưới luôn! 🐧☝️",
                "Tình trong như đã mặt ngoài còn e, giả bộ gì nữa hả 2 đứa kia =))",
                "Kèo này thơm! Đứa nào chủ động trước là win chặt nhé :v"
            ];
        } else {
            statusList = [
                "Trời sinh một cặp! Cưới cmn đi chờ gì nữa, nhớ gửi thiệp cho t nha hihi 🥰💍",
                "Gì đây? OTP real cmnr! Tẩy chay tụi m vì quá hạnh phúc :0?",
                "Match 100% cmnl! Tới công chuyện, tao đi đặt mâm trước đây 🐧",
                "Code này không có bug, mượt như ruột ngựa. Đẻ mấy đứa? =))"
            ];
        }

        // Bốc random 1 câu trong cái đống list trên
        const randomStatus = statusList[Math.floor(Math.random() * statusList.length)];

        // Đóng gói tin nhắn
        const response = `🌸 ─── [ MÁY QUÉT TÌNH YÊU ] ─── 🌸\n👩‍❤️‍👨 Cặp đôi: ${person1} ✖️ ${person2}\n\n📊 Mức độ hợp nhau: ${lovePercent}%\n${progressBar}\n\n📝 Phán quyết: ${randomStatus}`;

        // Gửi kết quả (Có sẵn random delay trong bot.send m viết r)
        return bot.send(response);
    }
};