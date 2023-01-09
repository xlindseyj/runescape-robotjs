import { Coordinates } from '../interfaces';

export class UtilitiesService {

    iterations: number = 0;

    constructor() {}

    increase = () => {
        this.iterations ++;
        console.log(`[INVENTORY]: ${this.iterations}`);
    }

    getCoordinatesBetween = (x1: number, y1: number, x2: number, y2: number): Coordinates => {
        const coordinates: Coordinates = { x: this.getRandomInteger(x1, x2), y: this.getRandomInteger(y1, y2) };
        return coordinates;
    }

    getRandomInteger = (min: number, max: number): number => {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
    }

    sleep = (ms: number): void => {
        // console.log(`[SLEEPING]: ${ms} milliseconds`);
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }
}
