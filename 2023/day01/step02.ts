import { input } from './input.js';
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const spelledToDigitMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

const findFirstDigit = (line: string) => {
    let numberIndex = +Infinity;
    let spelledNumber = '';
    
    for (const number of numbers) {
        const actualIndex = line.indexOf(number);
        if (actualIndex !== -1 && actualIndex < numberIndex) {
            numberIndex = actualIndex;
            spelledNumber = number;
        }
    }
    const parsedNumber = Number(spelledNumber);
    if (isNaN(parsedNumber)) {
        return spelledToDigitMap[spelledNumber];
    }
    return parsedNumber;
}


const findLastDigit = (line: string) => {
    let numberIndex = -Infinity;
    let spelledNumber = '';
    
    for (const number of numbers) {
        const actualIndex = line.lastIndexOf(number);
        if (actualIndex !== -1 && actualIndex > numberIndex) {
            numberIndex = actualIndex;
            spelledNumber = number;
        }
    }
    const parsedNumber = Number(spelledNumber);
    if (isNaN(parsedNumber)) {
        return spelledToDigitMap[spelledNumber];
    }
    return parsedNumber;
}

const total = input.split('\n').filter(p => p.length > 0).reduce((ret: number, line: string) => {
    let firstDigit = findFirstDigit(line);
    let secondDigit = findLastDigit(line);
    
    console.log(line);
    console.log(firstDigit);
    console.log(secondDigit);

    return ret + Number(`${firstDigit}${secondDigit}`);
}, 0);

console.log(total);