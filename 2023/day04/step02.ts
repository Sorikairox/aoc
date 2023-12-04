import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const pattern = /(?:Card\s+\d+: )?(\d+\s+(?:\s*\d+\s*)*)\s*\|\s*(\d+\s+(?:\s*\d+\s*)*)/;
const copyNumber = [1];
function getIntersection(set1, set2) { 
  const ans = new Set(); 
  for (let i of set2) { 
      if (set1.has(i)) { 
          ans.add(i); 
      } 
  } 
  return ans; 
}

runExercice(input, (_, line: string, index: number) => {
  if (!copyNumber[index])
    copyNumber[index] = 1;
  const match = line.match(pattern);
  const numbersListBeforePipe = new Set(match[1].replace(/\s+/g, ' ').trim().split(' ').map(Number)); // Normalize spaces
  const numbersListAfterPipe = new Set(match[2].replace(/\s+/g, ' ').trim().split(' ').map(Number)); // Normalize spaces

  const winningNumbers = getIntersection(numbersListBeforePipe, numbersListAfterPipe);
  
  if (winningNumbers.size !== 0) {
    for (let i = 1; i <= winningNumbers.size; i++) {
        if (!copyNumber[index + i]) {
          copyNumber[index + i] = 1;
        }
        copyNumber[index + i] += copyNumber[index];
    }
  }

});

console.log(copyNumber.reduce((ret, number) => ret + number, 0));