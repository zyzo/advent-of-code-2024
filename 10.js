const readFileSync = require('fs').readFileSync;
const data = readFileSync('10.txt', 'utf8');


const lines = data.split("\n").map(a => a.split("").map(x => parseInt(x)));

const trailHeads = lines.map((line, x) => line.map((item, y) => {
    if (item === 0) {
        return {
            x,
            y
        }
    }
    return null;
})).reduce((acc, cur) => [...acc, ...cur], []).filter(a => a !== null);



let count = 0;
const traverse = (th, prevDests = []) => {

    count += 1;
    
    const item = lines[th.x][th.y];
    if (item === 9) {
        return prevDests.some(d => d.x === th.x && d.y === th.y) ? {
            score: 0,
            prevDests
        }
            : {
                score: 1,
                prevDests: [...prevDests, th]
            };
    }

    const nextPos = [{
        x: th.x - 1,
        y: th.y
    }, {
        x: th.x + 1,
        y: th.y
    }, {
        x: th.x,
        y: th.y - 1
    }, {
        x: th.x,
        y: th.y + 1
    }];

    let prevDestsCopy = [...prevDests];
    let result = 0;
    nextPos.forEach(
        (nextIndex, i) => {
            if (!lines[nextIndex.x] || !lines[nextIndex.x][nextIndex.y]) {
                return;
            }
            const next = lines[nextIndex.x][nextIndex.y];
            const { score:nextScore, prevDests: nextPrevDests } =  
                next === item + 1 ? traverse(nextPos[i],
                    prevDestsCopy
                ) : {
                    score: 0,
                    prevDests: []
                };
            prevDestsCopy = [...new Set([...prevDestsCopy, ...nextPrevDests])];
            result += nextScore;
        }
    )

    return {
        score: result,
        prevDests: prevDestsCopy
    }

} 


let result = 0;
for (let th of trailHeads) {
    result += traverse(th).score;
}

console.log(result);