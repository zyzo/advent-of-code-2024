const readFileSync = require('fs').readFileSync;


const data = readFileSync('4.txt', 'utf8');

const lines = data.split('\n');


const isXmas = (i, j) => {
    if (lines[i+1][j+1] !== 'A') {
        return false;
    }
    if (`${lines[i][j]}${lines[i][j +2]}` !== `${lines[i+2][j]}${lines[i+2][j+2]}`
        && 
        `${lines[i][j]}${lines[i+2][j]}` !== `${lines[i][j+2]}${lines[i+2][j+2]}`
    ) {
        return false;
    }
    return true;
}

let result = 0;
for (let i = 0; i < lines.length - 2 ; i++) {
   for (let j = 0; j < lines[i].length - 2; j++) {
      if (isXmas(i, j)) {
         result++;
      }
   }
}

console.log({ result});