const readFileSync = require('fs').readFileSync;
const regexp = /mul\((\d+),(\d+)\)/g;

const invaligRegexp = /don't\(\).*do\(\)/g;

const data = readFileSync('3_2.txt', 'utf8');


const result = [...data.matchAll(regexp)];

const invalidGroups = [...data.matchAll(invaligRegexp)].map(match => [match.index, match.index + match[0].length]);

let count = 0;
console.log( result.reduce((acc, cur) => {
    const isInvalid = invalidGroups.some(([start, end])=> start < cur.index && cur.index < end);
      count +=1;
    
    return acc+  parseInt(cur[1]) * parseInt(cur[2]);
}, 0));
console.log({ count})