const BASE_URL = 'https://jsonbase.com/sls-team/json-';

class Service {
    async getData (id) {
        return await fetch(BASE_URL + id)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    }
}

module.exports = Service;