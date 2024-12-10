const readFileSync = require('fs').readFileSync;

const data = readFileSync('2.txt', 'utf8');

const lines = data.split('\n');



 const object =  lines.map((line) => {
    return line.split(" ").map((num) => parseInt(num));
 });

const isSafe = (array, order = null) => {
    if (array.length <= 1) {
        return true;
    }
    const diff = Math.abs(array[0] - array[1]);
    if (diff < 1 || diff > 3) {
        return false;
    }
    const currentOrder = array[0] - array[1] > 0 ? 'desc' : 'asc';
    if ((currentOrder !== order) && order) {
        return false;
    }
    return isSafe(array.slice(1), currentOrder);
}

const isSubArraySafe = (array) => {
    return array.some((_, index) => {
        const removed = [...array];
        removed.splice(index, 1);
        return isSafe(removed);
    });
};
    


console.log(object.reduce((acc, cur, index) => {
        return  isSafe(cur)
            || isSubArraySafe(cur)
        ? acc + 1 : acc;
 }, 0));
