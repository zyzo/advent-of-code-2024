const readFileSync = require('fs').readFileSync;


const data = readFileSync('4.txt', 'utf8');

const lines = data.split('\n');


const VALID  = ["SSMM", "MMSS", "MSMS", "SMSM"];
const isXmas = (i, j) => {
    if (lines[i+1][j+1] !== 'A') {
        return false;
    }
    const letter1 = lines[i][j];
    const letter2= lines[i][j+2];
    const letter3 = lines[i+2][j];
    const letter4 = lines[i+2][j+2];
    const str = `${letter1}${letter2}${letter3}${letter4}`;
    if (!VALID.includes(str)
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