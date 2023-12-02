import { runExercice } from '../../util.ts';
import { input } from './input.ts';

const floor = runExercice(input, (ret: number, line: string) => {
    let actualFloor = 0;
    for (const instruction of line) {
        if (instruction === ')')
        actualFloor--;
        else
        actualFloor++;
    }
    return actualFloor;
});

console.log(floor);