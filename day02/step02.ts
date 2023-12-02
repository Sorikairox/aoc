import { runExercice } from '../util.js';
import { input } from './input.ts';

const sum = runExercice(input, (ret, line) => {
    const minPerColor = {
      'red': 0,
      'green': 0,
      'blue': 0,
    };
const regex = /(\d+)\s+(\w+)/g;
let match;
while ((match = regex.exec(line)) !== null) {
  const number = Number(match[1]);
  const color = match[2];
  if (number > minPerColor[color]) {
    minPerColor[color] = number;
  }
}
console.log(minPerColor);
  return ret + (minPerColor['blue'] * minPerColor['red'] * minPerColor['green']);
});

console.log(sum);