import { input } from './input.ts';

const total = input.split('\n').filter(p => p.length > 0).reduce((ret: number, line: string) => {
    const parsedNumber = line.replace(/\D/g, '');
    return ret + Number((parsedNumber.split('').at(0) + parsedNumber.split('').at(-1)));
}, 0);

console.log(total);