const fs = require('fs');

const filesArray = [
    'out0.txt', 'out1.txt', 'out2.txt', 'out3.txt', 'out4.txt', 'out5.txt', 
    'out6.txt', 'out7.txt', 'out8.txt', 'out9.txt', 'out10.txt', 'out11.txt',
    'out12.txt', 'out13.txt', 'out14.txt', 'out15.txt', 'out16.txt', 'out17.txt',
     'out18.txt', 'out19.txt'
]  

const uniqueValues = () => {
    const startTime = performance.now();

    const usernames = new Set();

    const addUsername = (username) => {
        usernames.add(username);
    }

    filesArray.forEach(file => {
        const data = fs.readFileSync('./data/' + file);
        const lines = data.toString('utf8').split('\n');
        lines.forEach(line => {
            const username = line.trim();
            if (username !== '') {
                try {
                    addUsername(username);
                } catch (e) {
                    console.error(e);
                }
            }
        })
    });

    const endTime = performance.now();

    console.log(`Call to uniqueValues took ${endTime - startTime} ms`);

    return usernames.size;
}

const existInAllFiles = () => {
    const startTime = performance.now();

    const uniqueUsernames = [];
    const numExistInAllFiles = new Set();

    filesArray.forEach(file => {
        const fileArr = new Set();
        const data = fs.readFileSync('./data/' + file);
        const lines = data.toString('utf8').split('\n');
        lines.forEach(line => {
            const username = line.trim();
            fileArr.add(username);
        })
        uniqueUsernames.push(fileArr);
    });

    uniqueUsernames.forEach(file => {
        file.forEach(username => {
            uniqueUsernames.every(subArr => {
                if(subArr.has(username)) numExistInAllFiles.add(username);
            });
        })
    });

    const endTime = performance.now();

    console.log(`Call to existInAllFiles took ${endTime - startTime} ms`);

    return numExistInAllFiles.size;
}

const existInAtLeastTenFiles = () => {
    const startTime = performance.now();

    const uniqueUsernames = [];
    const numExistInTenFiles = new Set();

    filesArray.forEach(file => {
        const fileArr = new Set();
        const data = fs.readFileSync('./data/' + file);
        const lines = data.toString('utf8').split('\n');
        lines.forEach(line => {
            const username = line.trim();
            fileArr.add(username);
        })
        uniqueUsernames.push(fileArr);
    });

    const usernameCounts = new Map();

    uniqueUsernames.forEach(file => {
        file.forEach(username => {
            const count = usernameCounts.get(username) || 0;
            usernameCounts.set(username, count + 1);
            if(count + 1 >= 10) numExistInTenFiles.add(username);
        });
    });

    const endTime = performance.now();

    console.log(`Call to existInAllFiles took ${endTime - startTime} ms`);

    return numExistInTenFiles.size;
}

console.log(uniqueValues());
console.log(existInAllFiles());
console.log(existInAtLeastTenFiles());