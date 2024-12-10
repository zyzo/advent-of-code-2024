const readFileSync = require('fs').readFileSync;


const data = readFileSync('4_test.txt', 'utf8');

const lines = data.split('\n');

const reg1 = /XMAS/g;
const reg2 = /SAMX/g;
const countXmas = (string) => [...string.matchAll(reg1)].length + [...string.matchAll(reg2)].length;

const LENGTH = lines.length;
const initialArray = new Array(LENGTH).fill(0);

const toString = (array) => array.reduce((acc, cur) => `${acc}${cur}`, "");
const allCols = initialArray.map((_, i) =>
    initialArray.reduce((acc, cur, j) => `${acc}${lines[j][i]}`, "")
)
const getDiags = (arr) => {
    return [...new Set([
        ...initialArray.map((_, i) => 
          toString(new Array(LENGTH - i).fill(0).map((_, j) => arr[j][j + i]))
        ),
        ...initialArray.map((_, i) => 
          toString(new Array(LENGTH - i).fill(0).map((_, j) => arr[j + i][j]))
        )])]
}

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);


console.log(
    sum(lines.map(countXmas)) + 
    sum(allCols.map(countXmas)) + 
    sum(getDiags(lines).map(countXmas)) +
    sum(getDiags(lines.map(l => [...l].reverse())).map(countXmas))
);
