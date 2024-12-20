const readFileSync = require('fs').readFileSync;


const data = readFileSync('8_test.txt', 'utf8');


const map = data.split('\n').filter(Boolean).map(l => l.split(""));

const antennas = map.reduce((acc, line, i) => {
    const antennasIndex = line.map((l, j) => l !== '.' ? j : null).filter(Boolean);
    return [...acc, ...antennasIndex.map(j => [line[j], [i, j]])];
}, []);

console.log('antennas', antennas)

const pairs = antennas.reduce((acc, cur, index) => {
    const matched = antennas.slice(0, index).filter(a => a[0] === cur[0]);
    return [...acc, ...matched.map(m => [cur[1], m[1]])];
}, []);

console.log("pairs", pairs);

// y1 = ax1 + b
// y2 = ax2 + b
// a = (y2 - y1) / (x2 - x1)
// b = y1 - ax1
const findLineParameters = ([x1, y1], [x2, y2]) => {
    const a = new Decimal(y2 - y1).dividedBy(x2 - x1);
    const b = a.times(x1).sub(y1);
    return [a, b];
}

// 5 = -3 *2 +11
// 8 = -3 *1 +11
// 11 = -3 * 0 + 11

const allPos = new Array(map.length).fill(0).map((_, i) => new Array(map[0].length).fill(0).map((_, j) => [i, j])).flat();

// 0 =  4 / -3 * 7 + 9.333333333333332

const antinodes = pairs.reduce((acc, [a, b]) => {
    const [lineParamsA, lineParamsB] = findLineParameters(a,b);
    console.log(lineParamsA.toString(), lineParamsB.toString(), allPos.filter(([x, y]) => lineParamsA.times(x).sub(lineParamsB).equals(y)));
    return  [
        ...acc, 
        ...allPos.filter(([x, y]) => lineParamsA.times(x).sub(lineParamsB).equals(y))
    ];
}, []);

 // console.log("antinodes", antinodes);

const uniqueAntinodes = antinodes.reduce((acc, cur) => {
    const isUnique = !acc.some(([x, y]) => x === cur[0] && y === cur[1]);
    return isUnique ? [...acc, cur] : acc;
}, []);
 console.log("result", uniqueAntinodes.length);


 // 4 4 
 // 1 8
 // 7 0