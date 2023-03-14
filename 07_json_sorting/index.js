const Service = require('./api');
const API = new Service();

const endpoint_ids = [793, 955, 231, 931, 93, 342, 770, 
    491, 281, 718, 310, 806, 469, 258, 516, 79, 706, 521, 350, 64
]

const BASE_URL = 'https://jsonbase.com/sls-team/json-';

const isDone = (obj) => {
    if (obj.isDone !== undefined) {
        return obj.isDone;
    } else {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                const result = isDone(obj[key]);
                if (result !== undefined) {
                    return result;
                }
            }
        }
    }
}

const checkData = async () => {
    let trueNumber = 0;
    let falseNumber = 0;
    for (const id of endpoint_ids) {
      try {
        const response = await API.getData(id);
        const result = isDone(response);
  
        if (result === true) {
          console.log(`[Success] ${BASE_URL}${id}: isDone - ${result}`);
          trueNumber++;
        } else if (result === false) {
          console.log(`[Success] ${BASE_URL}${id}: isDone - ${result}`);
          falseNumber++;
        }
      } catch (error) {
        console.log(`[Fail] ${BASE_URL}${id}: The endpoint is unavailable`);
      }
    }
  
    console.log(`Found True values: ${trueNumber}`);
    console.log(`Found False values: ${falseNumber}`);
};

checkData();