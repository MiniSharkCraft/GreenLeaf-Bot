const gradient = require('gradient-string');
const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
    // Hàm vẽ Banner ngầu lòi
    banner: (text) => {
        console.clear();
        const art = figlet.textSync(text, { font: 'Standard', horizontalLayout: 'full' });
        console.log(gradient.pastel.multiline(art));
        console.log(chalk.yellow('=================================================='));
        console.log(chalk.green(`✅ Bot Name: `) + chalk.white('Lễ Tân GreenLeaf'));
        console.log(chalk.green(`👑 Creator: `) + chalk.white('Bot 2026'));
        console.log(chalk.yellow('==================================================\n'));
    },

    // Hàm in log thường
    info: (msg) => console.log(chalk.blue('[INFO] ') + msg),
    warn: (msg) => console.log(chalk.yellow('[WARN] ') + msg),
    error: (msg) => console.log(chalk.red('[ERROR] ') + msg),
    
    // Hàm in log lệnh
    cmd: (user, command) => console.log(chalk.magenta('[CMD] ') + chalk.white(`${user} dùng lệnh: ${command}`))
};