const { Command } = require('commander');
const program = new Command();
const TelegramBot = require('node-telegram-bot-api');

const token = '6272060349:AAHWWx7yv2klbJOqtGHrFfLWNKuZzf-qLvI'
const chatId = '375788321';

const bot = new TelegramBot(token, {polling: true});

program
.command('send-message <message>')
.description('Send your message to telegram bot, write it after m-flag')
.action((message) => {
    bot.sendMessage(chatId, message);
});

program
.command('send-photo <photo>')
.description('Send your photo to telegram bot, just drag and drop it after p-flag')
.action((photo) => {
    bot.sendPhoto(chatId, photo)
});

process.env["NTBA_FIX_350"] = 1;
program.parse(process.argv);