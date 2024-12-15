const readFileSync = require('fs').readFileSync;

const input = readFileSync('7.txt', 'utf8');

let inputArr = input.split(/\r?\n/).filter(Boolean);
let firstSolution = 0, secondSolution = 0;

const rule1 = (p1,p2) => p1+p2
const rule2 = (p1,p2) => p1*p2
const rule3 = (p1,p2) => parseInt(`${p1}${p2}`)
let rulesPart1 = [rule1,rule2]
let rulesPart2 = [rule1,rule2,rule3]
    
function calculateNumber(tempResult, rest, answer, rules) {
    if (rest.length == 0) return tempResult == answer;
    return rules.some(rule => {
        let temp = rule(tempResult, rest[0])
        if (temp <= answer) return calculateNumber(temp,rest.slice(1),answer,rules)
        return false;
    })
}

inputArr.forEach((line, lineIndex) => {
    let temp = line.split(": ")
    let answer = parseInt(temp[0]);
    let numbers = temp[1].split(' ').map(Number);
    if (calculateNumber(numbers[0], numbers.slice(1),answer,rulesPart1)) {
        firstSolution += answer;
    } else if (calculateNumber(numbers[0], numbers.slice(1),answer,rulesPart2)) {
        secondSolution += answer;
    }
})
secondSolution += firstSolution

console.log({ firstSolution})