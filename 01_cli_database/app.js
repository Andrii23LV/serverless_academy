const inquirer = require('inquirer');
const fs = require('fs');

let name;
let gender;
let age;

const findName = (name) => {
    const currentUser = JSON.parse(fs.readFileSync('db.txt')).find((user) => user.name == name);
    if(currentUser.name == name) {
        console.log(`User ${currentUser.name} was found.`);
        console.log(currentUser);
        process.exit();
    } else {
        console.log(`User ${name} was not found.`);
        process.exit(1);
    }
}

const search = () => {
    return inquirer.prompt(
        {
            name: 'search-confirm',
            message: 'Would you like to search values in DB?',
            type: 'confirm',
        },
    ).then((answers) => {
        if(answers) {
           console.log(JSON.parse(fs.readFileSync('db.txt')))
        }
        inquirer.prompt(
            {
                name: 'findName',
                message: 'Enter user`s name you wanna find in DB?',
                type: 'input',
            },
        ).then((answers) => {
            return findName(answers.findName);
        })
    })
}

const getAge = () => {
    inquirer.prompt([
        {
            name: 'age',
            message: 'Enter your age. To cancel press ENTER:',
            type: 'input',
        }
    ]).then((answers) => {
        if(answers.age === '') return search();
        age = answers.age;
        const fileData = JSON.parse(fs.readFileSync('db.txt'));
        fileData.push({name: name, gender: gender, age: age});
        fs.writeFileSync('db.txt', JSON.stringify(fileData));
        getName();
    })
}

const getGender = () => {
    inquirer.prompt([
        {
            name: "gender",
            message: "Choose your Gender.",
            type: "list",
            choices: ["Male", "Female"],
        }
    ]).then((answers) => {
        gender = answers.gender;
        getAge();
    })
}

const getName = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Enter the user`s name. To cancel press ENTER:',
            type: 'input',
        }
    ]).then((answers) => {
        if(answers.name === '') return search();
        name = answers.name;
        getGender();
    })
}

getName();