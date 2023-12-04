import { runExercice } from "../../util.ts";
import { input } from "./input.ts";

const numbers = '01234567889';
const map = [];
const signsPosition = [];
const parsedNumbers = {};
runExercice(input, (ret: number, line: string, row: number) => {
    let column = 0;
    let currentlyHavingNumber = false;
    let startPosition = column;
    let parsingNumber = '';
    line.split('').forEach((letter: string, index: number) => {
        if (numbers.includes(letter)) {
            if (!currentlyHavingNumber)
                startPosition = column;
            currentlyHavingNumber = true;
            parsingNumber += letter;
            column++;
            if (column === line.length) {
                parsedNumbers[`${row}:${startPosition}`] = Number(parsingNumber);
                parsedNumbers[`${row}:${column - 1}`] = Number(parsingNumber);
                parsingNumber = '';
                currentlyHavingNumber = false;
            }
            return;
        }
        if (letter !== '.') {
            signsPosition.push({row, column, letter});
        }
        if (currentlyHavingNumber) {
            parsedNumbers[`${row}:${startPosition}`] = Number(parsingNumber);
            parsedNumbers[`${row}:${column - 1}`] = Number(parsingNumber);
            parsingNumber = '';
            currentlyHavingNumber = false;
        }
        column++;
    });
    map.push(line);
})

let sum = 0;
signsPosition.forEach(({row, column, letter}) => {
    if (letter !== '*') return;

    const topLeftNumber = parsedNumbers[`${row - 1}:${column - 1}`] || 0;
    const topNumber = parsedNumbers[`${row - 1}:${column}`] || 0;
    const topRightNumber = parsedNumbers[`${row - 1}:${column + 1}`] || 0;
    const topRow = [topLeftNumber, topNumber, topRightNumber];
    let unique_values = [...new Set(topRow)];

    unique_values.push(parsedNumbers[`${row}:${column - 1}`] || 0);
    unique_values.push(parsedNumbers[`${row}:${column + 1}`] || 0);
 
    const bottomLeftNumber = parsedNumbers[`${row + 1}:${column - 1}`] || 0;
    const bottomNumber = parsedNumbers[`${row + 1}:${column}`] || 0;
    const bottomRightNumber = parsedNumbers[`${row +  1}:${column + 1}`] || 0;
    const bottomRow = [bottomLeftNumber, bottomNumber, bottomRightNumber];
    unique_values = unique_values.concat(...new Set(bottomRow)).filter(v => v !== 0);
    if (unique_values.length >= 2) {
        sum += unique_values.reduce((ret, number) => ret * number, 1);
    }
});

console.log(sum);