const readFileSync = require('fs').readFileSync;

const data = readFileSync('6.txt', 'utf8');

const initialMap = data.split('\n').filter(Boolean).map(l => l.split(""));
const map = initialMap.map(l => [...l]);


let guardPos = [0,0];
for (let i =  0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "^") {
            guardPos = [i,j];
            break;
        }
    }
}

let left = false;
let count = 1;
let nextDir = 'up';
const prettyPrint = (map) => map.map(l => l.join("")).join("\n");

while (!left) {
    if (nextDir === 'up') {
        for (let i = guardPos[0]; i >= 0; i--) {
            if (map[i][guardPos[1]] === "#") {
                nextDir = "right";
                guardPos = [i+1, guardPos[1]];
                break;
            }
            if (map[i][guardPos[1]] === ".") {
                count+=1;
                map[i][guardPos[1]] = "X";
            }
            if (i === 0) {
                left = true;
                break;
            } 
        }
    } else if (nextDir === "right") {
        for (let i = guardPos[1]; i < map[0].length; i++) {
            if (map[guardPos[0]][i] === "#") {
                nextDir = "down";
                guardPos = [guardPos[0], i-1];
                break;
            }
            if (map[guardPos[0]][i] === ".") {
                count+=1;
                map[guardPos[0]][i] = "X";
            }
            if (i === map[0].length -1) {
                left = true;
                break;
            } 
        }
    } else if (nextDir === "down") {
        for (let i = guardPos[0]; i < map.length; i++) {
            if (map[i][guardPos[1]] === "#") {
                nextDir = "left";
                guardPos = [i-1, guardPos[1]];
                break;
            }
            if (map[i][guardPos[1]] === ".") {
                count+=1;
                map[i][guardPos[1]] = "X";
            }
            if (i === map.length -1) {
                left = true;
                break;
            } 
        }
    } else if (nextDir === "left") {
        for (let i = guardPos[1]; i >= 0; i--) {
            if (map[guardPos[0]][i] === "#") {
                nextDir = "up";
                guardPos = [guardPos[0], i+1];
                break;
            }
            if (map[guardPos[0]][i] === ".") {
                count+=1;
                map[guardPos[0]][i] = "X";
            }
            if (i === 0) {
                left = true;
                break;
            } 
        }
    }
}




const possiblePositions = map.reduce((acc, cur,i) => {
    
    return [...acc, ...cur
        .map((_, j) =>[i, j])
        .filter(([i,j]) => map[i][j] === "X" )
    ];
}, []);

const isLoop = (map) => {
let loop = 0;
let guardPos = [0,0];
for (let i =  0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "^") {
            guardPos = [i,j];
            break;
        }
    }
}
let left = false;
let count = 1;
let nextDir = 'up';
while (!left && loop < 1000) {
    loop+=1;
    if (nextDir === 'up') {
        for (let i = guardPos[0]; i >= 0; i--) {
            if (map[i][guardPos[1]] === "#") {
                nextDir = "right";
                guardPos = [i+1, guardPos[1]];
                break;
            }
            if (map[i][guardPos[1]] === ".") {
                count+=1;
                map[i][guardPos[1]] = "X";
            }
            if (i === 0) {
                left = true;
                break;
            } 
        }
    } else if (nextDir === "right") {
        for (let i = guardPos[1]; i < map[0].length; i++) {
            if (map[guardPos[0]][i] === "#") {
                nextDir = "down";
                guardPos = [guardPos[0], i-1];
                break;
            }
            if (map[guardPos[0]][i] === ".") {
                count+=1;
                map[guardPos[0]][i] = "X";
            }
            if (i === map[0].length -1) {
                left = true;
                break;
            } 
        }
    } else if (nextDir === "down") {
        for (let i = guardPos[0]; i < map.length; i++) {
            if (map[i][guardPos[1]] === "#") {
                nextDir = "left";
                guardPos = [i-1, guardPos[1]];
                break;
            }
            if (map[i][guardPos[1]] === ".") {
                count+=1;
                map[i][guardPos[1]] = "X";
            }
            if (i === map.length -1) {
                left = true;
                break;
            } 
        }
    } else if (nextDir === "left") {
        for (let i = guardPos[1]; i >= 0; i--) {
            if (map[guardPos[0]][i] === "#") {
                nextDir = "up";
                guardPos = [guardPos[0], i+1];
                break;
            }
            if (map[guardPos[0]][i] === ".") {
                count+=1;
                map[guardPos[0]][i] = "X";
            }
            if (i === 0) {
                left = true;
                break;
            } 
        }
    }
}
return loop === 1000;
}
let countLoop = 0;
possiblePositions.forEach(([i,j]) => {
    console.log(i,j)
    if (isLoop(initialMap.map((l,a) => [...l.map((v, b) => (a===i && b===j) ? "#" : v)]))) {
        countLoop+=1;
    }
});

console.log(countLoop);
