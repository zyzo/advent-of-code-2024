const readFileSync = require('fs').readFileSync;
const data = readFileSync('11.txt', 'utf8');

const initialStoneNumbers = data.split(" ").map(x => parseInt(x));

const BLINKING_TIMES = 25;

let result = [...initialStoneNumbers]; 

const transformItem = (item, index) => {
    if (item === 0) {
        return 1;
    }
    const itemStr = `${item}`;
    const digits = itemStr.length;
  if (digits % 2 === 0) {
    return [
        parseInt(itemStr.slice(0, digits /2)),
        parseInt(itemStr.slice(digits / 2, digits ))
    ];
  }
  return item * 2024;
}

new Array(BLINKING_TIMES).fill(0).forEach((_, i) => {
    console.log('blinking', i,  result.length);
    result = result.map(transformItem).flat();
});

console.log(result.length);