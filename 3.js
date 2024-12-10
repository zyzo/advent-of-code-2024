const readFileSync = require('fs').readFileSync;
const regexp = /mul\((\d+),(\d+)\)/g;

const data = readFileSync('3.txt', 'utf8');
console.log([...data.matchAll(regexp)]);
const result = [...data.matchAll(regexp)];

console.log( result.reduce((acc, cur) => {
    return acc+ parseInt(cur[1]) * parseInt(cur[2]);
}, 0));