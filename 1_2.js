const readFileSync = require('fs').readFileSync;

const data = readFileSync('1.txt', 'utf8');

const lines = data.split('\n');

const first = [];
const second = [];

 lines.forEach((line) => {
    const numbers = line.split("   ");
    first.push(parseInt(numbers[0]));
    second.push(parseInt(numbers[1]));
});



const result = first.reduce((acc, cur, index) => {
    return acc+ cur  * second.reduce((acc2, cur2) => (
        cur === cur2 ? acc2 + 1 : acc2
    ), 0);
}, 0);


console.log(result);