const readFileSync = require('fs').readFileSync;


const data = readFileSync('5_test.txt', 'utf8');

const [orders, updates] = data.split('\n\n').map(l => l.split("\n"));


const splittedOrders = orders.map(o => o.split("|").map(l => parseInt(l)));


let ordersMap = [];

let i = 0;
for (const v of splittedOrders) {
   const [n1, n2] =v;
    const index1 = ordersMap.indexOf(n1);
   const index2 = ordersMap.indexOf(n2);

    if (index1 === -1 || index2 === -1) {
        if (index1 === -1 && index2 === -1) {
            ordersMap.push(n1);
            ordersMap.push(n2);
        } else if (index1 === -1) {
            ordersMap.splice(index2 , 0, n1);
        } else {
           ordersMap.splice(index1 +1, 0, n2);
        }
    } else if (index1 > index2) {
        const middleItemsToMove = []
        for (let i = index2+1; i < index1; i++) {
            const shouldBeMoved = !splittedOrders.some(([a,b]) => a=== n2 && b === ordersMap[i]);

            if (shouldBeMoved) {
               middleItemsToMove.push(ordersMap[i]);
            }
        }
        ordersMap = ordersMap.map(i => i === n1 ? n2 : i === n2 ? n1 : i);
        ordersMap.splice(index2 , 0, ...middleItemsToMove);
        ordersMap = [...new Set(ordersMap)];
    }
    console.log(ordersMap)
}


const splittedUdates = updates.map(u => u.split(",").map(l => parseInt(l)));

const correctUpdates = splittedUdates.filter(update => 
    update.reduce((acc, cur, index) => acc && (index === update.length - 1 ||
        ordersMap.indexOf(cur) < ordersMap.indexOf(update[index + 1])
    ), true)
)

console.log(correctUpdates);

console.log(correctUpdates.reduce((acc, cur) => acc + 
    cur.at(Math.floor((cur.length -1) / 2))
, 0));

console.log(
    splittedUdates.filter(update => 
        ! update.reduce((acc, cur, index) => acc && (index === update.length - 1 ||
            splittedOrders.every(([a,b]) => a!== update[index+1] || b !== cur)
        ), true)
    
    ).map(update => {
        return update.map(i => ordersMap.indexOf(i)).sort().map(i => ordersMap[i]);
    }).reduce((acc, cur) => acc + 
    cur.at(Math.floor((cur.length -1) / 2))
, 0)
)