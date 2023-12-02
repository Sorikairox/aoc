export const runExercice = (input: string, callback: any) => {
    return input.split('\n').filter(p => p.length > 0).reduce(callback, 0);
}