const Service = require('./api');
const NodeCache = require('node-cache');

const API = new Service();

const cache = new NodeCache({ stdTTL: 60 });

class GetCurrency {
    async getExchangeCurrencyDollar (bot, chatId) {

        const cachedData = cache.get('USD');

        if (cachedData) {
            const message = `Курс ${cachedData.ccy}.\nПродаж: ${cachedData.sale}\nКупівля: ${cachedData.buy}`;
            bot.sendMessage(chatId, message);
        }

        const data = await API.getCurrency().then((result) => {
                return result.data;
        }).then((result) => {
            const data = result.find(item => item.ccy === 'USD');
            cache.set('USD', data);
            let messageDollar = `Курс ${result[1].ccy}.\nПродаж: ${result[1].sale}\nКупівля: ${result[1].buy}`;
            return messageDollar;
        })

        return data;
    }

    async getExchangeCurrencyEuro (bot, chatId) {

        const cachedData = cache.get('EUR');

        if (cachedData) {
            const message = `Курс ${cachedData.ccy}.\nПродаж: ${cachedData.sale}\nКупівля: ${cachedData.buy}`;
            bot.sendMessage(chatId, message);
        }

        const data = await API.getCurrency().then((result) => {
                return result.data;
        }).then((result) => {
            const data = result.find(item => item.ccy === 'EUR');
            cache.set('EUR', data);

            let messageEuro = `Курс ${result[0].ccy}.\nПродаж: ${result[0].sale}\nКупівля: ${result[0].buy}`;
            return messageEuro;
        })

        return data;
    }

    async getConverterDollar (number) {

        const data = await API.getCurrency().then((result) => {
            return result.data;
        }).then((result) => {
            let sum = parseInt(result[1].sale) * number;
            return sum;
        }).then((result) => {
            let messageDollar = `${number} USD = ${result} UAH`;
            return messageDollar;
        })

        return data;
    }

    async getConverterEuro (number) {

        const data = await API.getCurrency().then((result) => {
                return result.data;
        }).then((result) => {
            let sum = parseInt(result[0].sale) * number;
            return sum;
        }).then((result) => {
            let messageEuro = `${number} EUR = ${result} UAH`;
            return messageEuro;
        })

        return data;
    }
}

module.exports = GetCurrency;