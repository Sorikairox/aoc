import { input } from './input.js';

const getGameId = (line: string) => {
    const regex = /Game (\d+)/;
    const match = line.match(regex);
      return match![1];
}

const maxPerColor = {
    'red': 12,
    'green': 13,
    'blue': 14,
};

const sum = input.split('\n').filter(p => p.length > 0).reduce((ret, line) => {
    const gameId = getGameId(line);
    
const regex = /(\d+)\s+(\w+)/g;
const matches = [];

let isPossible = true;
let match;
while ((match = regex.exec(line)) !== null) {
  const number = match[1];
  const color = match[2];
  if (number > maxPerColor[color]) {
    isPossible = false;
    break;
  }
}
if (isPossible) 
    return ret + Number(gameId);
return ret;
}, 0);

console.log(sum);