const readFileSync = require('fs').readFileSync;

const data = readFileSync('7.txt', 'utf8');

const lines = data.split('\n').filter(Boolean);

let count = 0;
for (const line of lines) {
    const split = line.split(": ");
    const result = parseInt(split[0]);
    const numbers = split[1].split(" ").map(l => parseInt(l));
    
    let possibleResults = [null];
    for (const number of numbers) {
        possibleResults = [
            ...possibleResults.map(l => (l || 0) + number),
            ...possibleResults.map(l => (l || 1) * number)
        ]
    }
    if (possibleResults.includes(result)) {
        console.log("possible", result)
       count += result;
    }
}

console.log({count});