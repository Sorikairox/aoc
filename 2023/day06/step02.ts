// import { runExercice } from '../../util.ts';
import { input } from './input.ts';

export const step02 = (input: string): number => {
  
  const pattern = /Time:\s*((?:\d+\s*)+)\s*Distance:\s*((?:\d+\s*)+)/;

const match = input.match(pattern);
    const timeList = [Number(match![1].replace(/\s+/g, ' ').trim().split(' ').join(''))] // Normalize spaces
    const distanceList = [Number(match![2].replace(/\s+/g, ' ').trim().split(' ').join(''))]; // Normalize spaces
    let total = 1;

    for (let i = 0; i < timeList.length; i++) {
      const time = timeList[i];
      const record = distanceList[i];
      let firstBreak = 0;
      let lastBreak = 0;
      for (let timeSpentPushing = 0;timeSpentPushing < time;timeSpentPushing++) {
        let distanceTravelled = (timeSpentPushing * (time - timeSpentPushing));
        if (distanceTravelled > record) {
          firstBreak = timeSpentPushing;
          break;
        }
      }
      for (let timeSpentPushing = time;timeSpentPushing > 0;timeSpentPushing--) {
        let distanceTravelled = (timeSpentPushing * (time - timeSpentPushing));
        if (distanceTravelled > record) {
          lastBreak = timeSpentPushing;
          break;
        }
      }
      total *= (lastBreak - firstBreak) + 1;
    }
    return total;
}

console.log(step02(input));