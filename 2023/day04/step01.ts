import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const pattern = /(?:Card\s+\d+: )?(\d+\s+(?:\s*\d+\s*)*)\s*\|\s*(\d+\s+(?:\s*\d+\s*)*)/;


function getIntersection(set1, set2) { 
  const ans = new Set(); 
  for (let i of set2) { 
      if (set1.has(i)) { 
          ans.add(i); 
      } 
  } 
  return ans; 
}

const sum = runExercice(input, (ret: number, line: string) => {
  const match = line.match(pattern);
  const numbersListBeforePipe = new Set(match[1].replace(/\s+/g, ' ').trim().split(' ').map(Number)); // Normalize spaces
  const numbersListAfterPipe = new Set(match[2].replace(/\s+/g, ' ').trim().split(' ').map(Number)); // Normalize spaces

  const winningNumbers = getIntersection(numbersListBeforePipe, numbersListAfterPipe);

  if (winningNumbers.size !== 0)
    return ret + (2 ** (winningNumbers.size - 1));
  return ret;
});

console.log(sum);