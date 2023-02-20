const TelegramBot = require('node-telegram-bot-api');

const GetCurrency = require('./getCurrency');

const CURRENCY = new GetCurrency();

const token = '6075327883:AAEr0kgO70AtXb8u2VF0J0epuIOn1s0Uhks';
const chatId = '375788321';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(chatId, 'Що Вас цікавить стосовно курсів валют?', {
        reply_markup: {
            keyboard: [
                ['Курс EUR', 'Курс USD'],
                ['Конвертер']
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
});
    
bot.on('message', async msg => {
    if (msg.text == 'Курс EUR') {
        bot.sendMessage(chatId, await CURRENCY.getExchangeCurrencyEuro(bot, chatId), {});
    } else if (msg.text == 'Курс USD') {
        bot.sendMessage(chatId, await CURRENCY.getExchangeCurrencyDollar(bot, chatId), {});
    } else if (msg.text == 'Конвертер') {
        bot.sendMessage(chatId, 'Оберіть опцію конвертера?', {
            reply_markup: {
                keyboard: [
                    ['USD -> UAH', 'EUR -> UAH'],
                    ['Назад']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }
});


bot.on('message', async msg => {
    if (msg.text == 'USD -> UAH') {
        bot.sendMessage(chatId, 'Введіть суму USD', {});

        bot.on('message', async msg => {
            if (!isNaN(msg.text)) {
                bot.sendMessage(chatId, await CURRENCY.getConverterDollar(msg.text), {});
            } 
        })
    } else if (msg.text == 'EUR -> UAH') {
        bot.sendMessage(chatId, 'Введіть суму EUR', {});

        bot.on('message', async msg => {
            if (!isNaN(msg.text)) {
                bot.sendMessage(chatId, await CURRENCY.getConverterEuro(msg.text), {});
            }
        })
    } else if (msg.text == 'Назад') {
        bot.sendMessage(chatId, 'Що Вас цікавить стосовно курсів валют?', {
            reply_markup: {
                keyboard: [
                    ['Курс EUR', 'Курс USD'],
                    ['Конвертер']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }   
})

bot.on("polling_error", console.log);

process.env["NTBA_FIX_350"] = 1;