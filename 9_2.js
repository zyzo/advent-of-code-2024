const readFileSync = require('fs').readFileSync;

const data = readFileSync('9_test.txt', 'utf8');

const blocks = data.split("").map(a => parseInt(a)).map((item, i) => 
({
    count: item,
    value: i % 2 === 0 ?  i /2 : '.'
})
);

let reArrangedBlocks = [...blocks];
let swap = false;

const print = block => block.reduce((acc, cur) => acc + `${cur.value} `.repeat(cur.count), '');

let cnt = 0;
do {
    swap = false
    console.log('count', cnt);
    cnt++;
    reArrangedBlocks = reArrangedBlocks.reduce((acc, cur, index) => {
        if (cur.value === '.') {
            const lastNumberIndex = acc.findLastIndex(a => a.value !== '.' && a.count <= cur.count);
            if (lastNumberIndex < index) {
                return acc;
            }
            swap = true;
            const lastNumberIndexValue = acc[lastNumberIndex]

            acc[lastNumberIndex] = {
                count: lastNumberIndexValue.count,
                value: '.'
            }
            acc.splice(index, 1, [lastNumberIndexValue, ...(lastNumberIndexValue.count < acc[index].count ? [{
                count: acc[index].count - lastNumberIndexValue.count,
                value: '.'
            }] : [])]);
            
            return acc;
        };
        return acc;
    }, [...reArrangedBlocks]);
    reArrangedBlocks = reArrangedBlocks.flat();

} while (swap);

const count = reArrangedBlocks.reduce((acc, cur) => {
    if (cur.value === '.') {
        return {
            sum: acc.sum,
            index: acc.index + cur.count
        };
    }
    return acc + cur.value * cur.count;
}, {
    sum: 0,
    index: 0
});

const values =  reArrangedBlocks.reduce((acc, cur) => [...acc, ...new Array(cur.count).fill(cur.value)], []);


console.log(print(values));

const result = values.reduce((acc, cur, index) => {
    if (cur === '.') {
        return acc;
    }
    return acc + index * cur;
}, 0);
console.log(result);