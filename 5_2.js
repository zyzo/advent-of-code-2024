const readFileSync = require('fs').readFileSync;


const data = readFileSync('5.txt', 'utf8');

const [orders, updates] = data.split('\n\n').map(l => l.split("\n"));


const splittedOrders = orders.map(o => o.split("|").map(l => parseInt(l)));
const splittedUdates = updates.map(u => u.split(",").map(l => parseInt(l)));

const fixUpdate = (update) => {
    
    const result = [...update].sort((a,b)=> (
        splittedOrders.some(([x,y]) => (x === b) && (y === a)) ? -1 : 0
    ))
    return result;
}


const fixedUpdates = splittedUdates.map(update =>  {
    const isCorrect = update.reduce((acc, cur, index) => acc && (index === update.length - 1 ||
        splittedOrders.every(([a,b]) => a!== update[index+1] || b !== cur)
    ), true)
    return isCorrect ? [0] : fixUpdate(update);
    })

console.log(fixedUpdates);


console.log(fixedUpdates.reduce((acc, cur) => acc + 
    cur.at(Math.floor(cur.length / 2))
, 0));