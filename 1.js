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

first.sort();
second.sort();

console.log(first, second);

const result = first.reduce((acc, cur, index) => {
    return acc+ Math.abs(second[index] - cur);
}, 0);


console.log(result);