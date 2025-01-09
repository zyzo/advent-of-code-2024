const readFileSync = require('fs').readFileSync;
const data = readFileSync('11.txt', 'utf8');

const initialStoneNumbers = data.split(" ").map(x => parseInt(x));

const BLINKING_TIMES = 75;



const transformItem = (item, index) => {
    if (item === 0) {
        return [1];
    }
    const itemStr = `${item}`;
    const digits = itemStr.length;
  if (digits % 2 === 0) {
    return [
        parseInt(itemStr.slice(0, digits /2)),
        parseInt(itemStr.slice(digits / 2, digits ))
    ];
  }
  return [item * 2024];
}

const cache = {};


const getCountOfNumber = (number, blinkingTimes) => {
  if (blinkingTimes === 0) {
      return 1;
  }
  if (cache[`${number}-${blinkingTimes}`]) {
      return cache[`${number}-${blinkingTimes}`];
  }
  const result = [number].map(transformItem).flat().map(x => getCountOfNumber(x, blinkingTimes - 1)).reduce((acc, item) => acc + item, 0);
  cache[`${number}-${blinkingTimes}`] = result;

  return result;
}



const getCountOfArray = (array, blinkingTimes) => {
  return array.map(x => getCountOfNumber(x, blinkingTimes)).reduce((acc, item) => acc + item, 0);
}

  console.log(getCountOfArray(initialStoneNumbers, BLINKING_TIMES));
