import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const index = runExercice(input, (ret: number, line: string) => {
    let actualFloor = 0;
    let index = 1;
    for (const instruction of line) {
        if (instruction === ')')
        actualFloor--;
        else
        actualFloor++;
        if (actualFloor == -1) {
            return index;
        }
        index++;
    }
});

console.log(index);