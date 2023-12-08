
import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const regex = /^(\w+) = \((\w+), (\w+)\)$/;
const map = {};
let instructions = '';
let actualPositions = [];


function findLCM(...numbers) {
  // Ensure that input values are positive integers
  if (numbers.some(num => num <= 0 || !Number.isInteger(num))) {
    throw new Error("Input values must be positive integers.");
  }

  // Find the GCD (Greatest Common Divisor) using Euclid's algorithm
  function findGCD(x, y) {
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }

  // Calculate LCM for two numbers
  function lcmOfTwo(a, b) {
    const gcd = findGCD(a, b);
    return Math.abs(a * b) / gcd;
  }

  // Calculate LCM for multiple numbers
  return numbers.reduce((lcm, num) => lcmOfTwo(lcm, num), 1);
}





runExercice(input, (_, line: string, index: number) => {
  if (index === 0) {
    instructions = line;
  } else {
    const match = line.match(regex);
    if (match[1].at(-1) === 'A') {
      actualPositions.push(match[1]);
    }
    map[match[1]] = {
      'L': match[2],
      'R': match[3]
    }
  }
});
let actualInstruction;
let instructionIndex = 0;
let moveNumber = 0;
const startPositions = [...actualPositions];
const lastReached = [...actualPositions.map(p => 0)]
const cycle = [...actualPositions.map(p => 0)];

while (!actualPositions.every(p => p.at(-1) === 'Z')) {
  actualInstruction = instructions[instructionIndex % instructions.length];
  actualPositions = actualPositions.map(p => {
    return map[p][actualInstruction];
  })
  startPositions.forEach((p, idx) => {
    if (actualPositions[idx].at(-1) === 'Z') {
      // console.log(`From ${p} to ${actualPositions[idx]} in ${moveNumber - lastReached[idx]} moves`);
      if (cycle[idx] === 0) {
        cycle[idx] = moveNumber - lastReached[idx];
      }
      if (cycle.every(n => n !== 0))
        console.log(findLCM(...cycle));
      lastReached[idx] = moveNumber;
    }
  });
  instructionIndex++;
  moveNumber++;
}
console.log(moveNumber);
