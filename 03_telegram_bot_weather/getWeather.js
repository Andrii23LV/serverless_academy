const Service = require('./api');
const formateDay = require('./formateDay');

const API = new Service();

class GetWeather {
    async getOnThree () {

        const data = await API.getForecast().then((result) => {
            return result.data.list.map((item) => {
                return(
                {temp: Math.floor(item.main.temp), day: formateDay(item.dt_txt), time: new Date(item.dt_txt).getHours() + ':00'})
            });
        }).then((result) => {
            let weather = 'Маямі (Miami) тригодинний прогноз.\n\n';
            for (let i = 0; i < result.length; i++) {
                weather += `${result[i].day} - ${result[i].time}, температура ${result[i].temp}\n`;
            }
            return weather;
        });

        return data;
    }

    async getOnSix () {

        const data = await API.getForecast().then((result) => {
            return result.data.list.map((item) => {
                return(
                {temp: Math.floor(item.main.temp), day: formateDay(item.dt_txt), time: new Date(item.dt_txt).getHours() + ':00'})
            });
        }).then((result) => {
            let weather = 'Маямі (Miami) шестигодинний прогноз.\n\n';
            for (let i = 0; i < result.length; i+=2) {
                weather += `${result[i].day} - ${result[i].time}, температура ${result[i].temp}\n`;
            }
            return weather;
        });

        return data;
    }


    async getWind () {

        const data = await API.getForecast().then((result) => {
            return result.data.list.map((item) => {
                return(
                {wind: Math.ceil(item.wind.speed), day: formateDay(item.dt_txt), time: new Date(item.dt_txt).getHours() + ':00'})
            });
        }).then((result) => {
            let weather = 'Маямі (Miami) вітер.\n\n';
            for (let i = 0; i < result.length; i++) {
                weather += `${result[i].day} - ${result[i].time}, швидкість вітру ${result[i].wind} км/год \n`;
            }
            return weather;
        });

        return data;
    }
}

module.exports = GetWeather;