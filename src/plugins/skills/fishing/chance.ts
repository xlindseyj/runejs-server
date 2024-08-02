export { randomBetween } from '@engine/util';

export const randomChoice = (array: number[]): number => {
    return array[Math.floor(Math.random() * array.length)];
};
