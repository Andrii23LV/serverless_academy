const axios = require('axios');

const BASE_URL =
  'https://api.openweathermap.org/data/2.5/forecast?appid=cc86c8daa1bb9417f2529a14c8d0a3f8&units=metric&';
const headers = {
  'Content-Type': 'application/json',
};

class Service {
    async getForecast () {
        try {
            const path = BASE_URL + `lat=${25.76}&lon=${-80.19}`;
            return await axios.get(path, {headers});
          } catch (e) {
            console.error(e);
          }
    }
}

module.exports = Service;
