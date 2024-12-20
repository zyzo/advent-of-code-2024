const readFileSync = require('fs').readFileSync;

const data = readFileSync('8.txt', 'utf8');


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

// a + x / 2 = b
// => x = 2b - a
const findX = (a,b) => 2 * b- a;

const antinodes = pairs.reduce((acc, [a, b]) => {
    return  [...acc, [findX(a[0], b[0]), findX(a[1], b[1])], [findX(b[0], a[0]), findX(b[1], a[1])]];
}, []).filter(([x, y]) => x >= 0 && y >= 0 && x < map.length && y < map[0].length);

const sortedAntinodes = [...antinodes].sort((a,b) => a[0] - b[0] || a[1] - b[1]);
console.log("antinodes", sortedAntinodes);

const uniqueAntinodes = sortedAntinodes.reduce((acc, cur) => {
    const isUnique = !acc.some(([x, y]) => x === cur[0] && y === cur[1]);
    return isUnique ? [...acc, cur] : acc;
}, []);
console.log("result", uniqueAntinodes.length);