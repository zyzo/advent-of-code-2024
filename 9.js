const readFileSync = require('fs').readFileSync;

const data = readFileSync('9_test2.txt', 'utf8');

// 0..111....22222
   
 

// 02.111....2222.
// 022111....222..
// 0221112...22...
// 02211122..2....
// 022111222......

const numbers = data.split("").map(a => parseInt(a));

const blocks = numbers.reduce((acc, cur, index) => {
    if (index % 2) {
        return [...acc, ...new Array(cur).fill('.')];
    }
    return [...acc, ...new Array(cur).fill(index / 2)];
}, []);


const reArrangedBlocks = blocks.reduce((acc, cur, index) => {
    if (cur === '.') {
        const lastNumberIndex = acc.findLastIndex(a => a !== '.');
        if (lastNumberIndex < index) {
            return acc;
        }
        acc[index]=  acc[lastNumberIndex];
        acc.splice(lastNumberIndex, 1);
        return acc;
    };
    return acc;
}, [...blocks]);

console.log(reArrangedBlocks);

const values = reArrangedBlocks.reduce((acc, cur, index) => {
    if (cur === '.') {
        return acc;
    }
    return acc + index * cur;
}, 0);

console.log(values);