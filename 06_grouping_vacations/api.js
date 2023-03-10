const BASE_URL = 'https://jsonbase.com/sls-team/vacations';

class Service {
    async getData () {
        return await fetch(BASE_URL)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    }
}

module.exports = Service;