const axios = require('axios');

const BASE_URL =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';
const headers = {
  'Content-Type': 'application/json',
};

class Service {
    async getCurrency () {
        try {
            return await axios.get(BASE_URL, {headers});
          } catch (e) {
            console.error(e);
          }
    }
}

module.exports = Service;
