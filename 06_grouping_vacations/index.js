const Service = require('./api');
const API = new Service();

const groupVacations = async () => {
    const response = await API.getData();
    const data = response.map(item => {
        return {
            userId: item.user._id,
            userName: item.user.name,
            vacations:[
                {
                    startDate: item.startDate,
                    endDate: item.endDate,
                    usedDays: item.usedDays,
                    status: item.status ? item.status : 'unknown'
                }
            ]
        }
    })

    const groupData = data.reduce((obj, item) => {
        obj[item.userId] 
            ? obj[item.userId].vacations.push(...item.vacations)
            : obj[item.userId] = { ...item };
        return obj;
    }, {});

    const groupedData = Object.values(groupData);

    console.log(groupedData);
}

groupVacations();