
import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const regex = /^(\w+) = \((\w+), (\w+)\)$/;
const map = {};
let instructions = '';

runExercice(input, (_, line: string, index: number) => {
  if (index === 0) {
    instructions = line;
  } else {
    const match = line.match(regex);
    map[match[1]] = {
      'L': match[2],
      'R': match[3]
    }
  }
});
let position = 'AAA';
let actualInstruction;
let instructionIndex = 0;
let moveNumber = 0;
while (position !== 'ZZZ') {
  actualInstruction = instructions[instructionIndex % instructions.length];
  position = map[position][actualInstruction];
  instructionIndex++;
  moveNumber++;
}
console.log(moveNumber);
