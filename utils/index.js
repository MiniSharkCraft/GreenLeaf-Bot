const fs = require('fs-extra');
const path = require('path');

const moneyFile = path.join(process.cwd(), "cache", "money.json");

// Hàm nội bộ để đảm bảo file và dữ liệu luôn sẵn sàng
function ensureData(uid) {
    if (!fs.existsSync(moneyFile)) fs.writeJsonSync(moneyFile, {});
    let data = fs.readJsonSync(moneyFile);
    const id = String(uid);

    // Nếu chưa có user hoặc user là kiểu cũ (number) thì khởi tạo lại kiểu Object
    if (!data[id] || typeof data[id] !== 'object') {
        const oldMoney = typeof data[id] === 'number' ? data[id] : 0;
        data[id] = {
            money: oldMoney,
            lastDaily: 0,
            lastWork: 0
        };
        fs.writeJsonSync(moneyFile, data);
    }
    return data;
}

module.exports = {
    // 1. Định dạng tiền (1000 -> 1,000$)
    formatMoney: function(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";
    },

    // 2. Lấy tiền của User
    getMoney: function(uid) {
        const data = ensureData(uid);
        return data[String(uid)].money || 0;
    },

    // 3. Cộng/Trừ tiền (amount có thể âm để trừ)
    addMoney: function(uid, amount) {
        let data = ensureData(uid);
        const id = String(uid);
        
        data[id].money += parseInt(amount);
        fs.writeJsonSync(moneyFile, data);
        
        return data[id].money;
    },

    // 4. Lấy toàn bộ Object dữ liệu của User (Tiền, thời gian daily...)
    getUserData: function(uid) {
        const data = ensureData(uid);
        return data[String(uid)];
    },

    // 5. Cập nhật dữ liệu bất kỳ cho User (Vd: cập nhật thời gian lastDaily)
    updateUserData: function(uid, key, value) {
        let data = ensureData(uid);
        data[String(uid)][key] = value;
        fs.writeJsonSync(moneyFile, data);
        return data[String(uid)];
    },

    // 6. Lấy thời gian hiện tại chuẩn Việt Nam
    getTime: function() {
        return new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    }
};