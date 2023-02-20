const TelegramBot = require('node-telegram-bot-api');
const GetWeather = require('./getWeather');

const WEATHER = new GetWeather();

const token = '6074052046:AAH1WKg2Wld8cy5Jlzw4Qfzr071BrFhNCRA'
const chatId = '375788321';

const bot = new TelegramBot(token, {polling: true});

const checkWeather = () => {
    bot.sendMessage(chatId, 'Що Вас цікавить стосовно погоди?', {
        reply_markup: {
            keyboard: [
                ['Прогноз на 3 години', 'Прогноз на 6 годин'],
                ['Вітер'],
            ]
        }
    })

    bot.on('message', async msg => {
        if(msg.text == 'Прогноз на 3 години') {
            bot.sendMessage(chatId, await WEATHER.getOnThree(), {});
        } else if (msg.text == 'Прогноз на 6 годин') {
            bot.sendMessage(chatId, await WEATHER.getOnSix(), {});
        } else if (msg.text == 'Вітер') {
            bot.sendMessage(chatId, await WEATHER.getWind(), {});
        }
    })

    bot.on("polling_error", console.log);
}

checkWeather();

process.env["NTBA_FIX_350"] = 1;