const utils = require('../utils/index');

// Bộ nhớ lưu các phiên đang chạy theo từng box (threadID)
const sessions = new Map();

module.exports = {
    config: {
        name: "taixiu",
        version: "4.0.0",
        isAdmin: false,
        hasPermssion: 0,
        credits: "Gemini",
        description: "Sòng bạc Tài Xỉu nhiều người chơi cùng lúc 🐧",
        commandCategory: "economy",
        usages: "[tai/xiu] [số tiền/allin]",
        cooldowns: 0 // Cooldown 0 vì phải cho tụi nó dồn tiền vào phiên
    },

    run: async function({ bot, args, rawMsg, logger }) {
        const senderID = String(bot.senderID);
        // Lấy ID box hiện tại, nếu nhắn riêng thì lấy ID của người nhắn
        const threadID = String(rawMsg.threadID || bot.senderID); 
        
        const choose = args[0]?.toLowerCase();
        let betInput = args[1]?.toLowerCase();

        if (!choose || !["tai", "xiu"].includes(choose) || !betInput) {
            return bot.send("❌ Gõ đúng cú pháp để xuống xác m ơi: `?taixiu tai 5000` hoặc `?taixiu xiu allin` :v?");
        }

        const balance = utils.getMoney(senderID);
        let bet = 0;

        // Xử lý quả all-in khô máu 🐧☝️
        if (betInput === "allin") {
            bet = balance;
        } else {
            bet = parseInt(betInput);
        }

        if (isNaN(bet) || bet <= 0) return bot.send("❌ Nhập số tiền đàng hoàng coi m! :)?");
        if (bet > balance) return bot.send(`❌ Có ${utils.formatMoney(balance)} mà đòi cược ${utils.formatMoney(bet)}? Định báo nhà cái à! =))`);

        // Trừ tiền ngay lập tức để tụi nó đéo buff bẩn được
        utils.addMoney(senderID, -bet);

        // NẾU CHƯA CÓ PHIÊN NÀO MỞ Ở BOX NÀY -> MỞ BÁT
        if (!sessions.has(threadID)) {
            sessions.set(threadID, {
                players: [],
                totalTai: 0,
                totalXiu: 0
            });

            const currentSession = sessions.get(threadID);
            currentSession.players.push({ id: senderID, choose: choose, bet: bet });
            if (choose === "tai") currentSession.totalTai += bet;
            else currentSession.totalXiu += bet;

            bot.send(
                `🎲 [SÒNG BẠC MỞ CỬA]\n` +
                `Thằng UID ${senderID} vừa mở bát ${utils.formatMoney(bet)} vào ${choose.toUpperCase()}!\n` +
                `⏳ Anh em có 20s để nhào vô, gõ: ?taixiu tai/xiu <tiền> 🐧☝️`
            );

            // Bắt đầu đếm ngược 20s
            setTimeout(async () => {
                const finalSession = sessions.get(threadID);
                sessions.delete(threadID); // Xóa phiên khỏi bộ nhớ để mở phiên mới

                bot.send("🔔 HẾT GIỜ GHÉP KÈO! NHÀ CÁI ĐANG LẮC... 🐧");

                // Lắc xí ngầu (random 3 viên từ 1-6)
                const dice = [
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1
                ];
                const sum = dice[0] + dice[1] + dice[2];
                // 3-10 là Xỉu, 11-18 là Tài
                const result = sum >= 11 ? "tai" : "xiu";
                const resultText = result === "tai" ? "TÀI" : "XỈU";

                let msg = `🎲 KẾT QUẢ: ${dice[0]} - ${dice[1]} - ${dice[2]} => [${sum} - ${resultText}]\n━━━━━━━━━━━━━━━\n`;
                let winners = 0;

                // Trả thưởng
                for (const player of finalSession.players) {
                    if (player.choose === result) {
                        // Thắng thì trả lại tiền gốc + tiền lời (x2)
                        const winAmount = player.bet * 2;
                        utils.addMoney(player.id, winAmount);
                        msg += `✅ UID ${player.id}: +${utils.formatMoney(player.bet)}\n`;
                        winners++;
                    } else {
                        msg += `❌ UID ${player.id}: Trắng tay =))\n`;
                    }
                }

                if (winners === 0) msg += "🐧 Nhà cái húp trọn gói phiên này! Cảm ơn mấy con gà nha =))";

                return bot.send(msg);

            }, 20000); // 20 giây

        } else {
            // NẾU PHIÊN ĐANG MỞ -> CHO GHÉP KÈO
            const currentSession = sessions.get(threadID);
            
            // Chống spam: 1 thằng chỉ được cược 1 lần trong 1 phiên
            const isAlreadyBet = currentSession.players.find(p => p.id === senderID);
            if (isAlreadyBet) {
                // Thằng này cược rồi, trả lại tiền vừa trừ ở trên
                utils.addMoney(senderID, bet);
                return bot.send(`⏳ Tham lam m, chờ mở bát xong rồi đánh tiếp! Đang có kèo rồi :)?`);
            }

            currentSession.players.push({ id: senderID, choose: choose, bet: bet });
            if (choose === "tai") currentSession.totalTai += bet;
            else currentSession.totalXiu += bet;

            return bot.send(`✅ Đã nhận kèo: UID ${senderID} cược ${utils.formatMoney(bet)} vào ${choose.toUpperCase()}! 🐧`);
        }
    }
};