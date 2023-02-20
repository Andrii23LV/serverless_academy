const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const optionList = [
    {index: 'a', text: 'Sort words alphabetically'},
    {index: 'b', text: 'Show numbers from lesser to greater'},
    {index: 'c', text: 'Show numbers from bigger to smaller'},
    {index: 'd', text: 'Display words in ascending order by number of letters in the word'},
    {index: 'e', text: 'Show only unique words'},
    {index: 'f', text: 'Display only unique values from the set of words and numbers entered by the user'}
]

const selectSorting = (array) => {
    optionList.map(option => console.log(`${option.index}. ${option.text}`));
    readline.question(`Choose sorting option (type only index of option or "exit" to stop): `, input => {
        switch (input){
            case 'a':
                console.log(array.sort((a, b) => a.localeCompare(b)));
                return getInput();
            case 'b':
                console.log(array.sort((a, b) => parseInt(a) - parseInt(b)));
                return getInput();
            case 'c': 
                console.log(array.sort((a, b) => parseInt(b) - parseInt(a)));
                return getInput();
            case 'd':
                console.log(array.sort((a, b) => a.length - b.length));
                return getInput();
            case 'e':
                console.log(array.filter((item, index, self) => self.indexOf(item) === index));
                return getInput();
            case 'f':
                console.log(array.filter((item, index, self) => self.indexOf(item) == index));
                return getInput();
            case 'exit':
                return process.exit();
            default: 
                console.log('Unknown command');
                return selectSorting(array);
        }
    });
}

const getInput = () => {
    let array;

    readline.question(`Hello. Enter 10 words or digits deviding them in spaces:`, input => {
        array = input.split(' ');
        return selectSorting(array);
    });
}

getInput();
