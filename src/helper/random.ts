type Fn<T> = (index: number, array: T[], thisArg?: unknown) => T;

// generate pseudo random values
export function random(): string; // what is this ???? oh i remember.. this was random string generator
export function random(min: number, max: number): number; // no need to explain
export function random<T>(min: number, max: number, items: T[]): T[]; // ok.. min, max amount of random items from an array..
export function random<T>(min: number, max: number, fn: Fn<T>, thisArg?: unknown): T[]; // create a min, max length array and fill it!
export function random<T>(array: T[]): T; // pick a random item from an array
export function random<T = unknown>(min?: number | T[], max?: number, fn?: Fn<T> | T[], thisArg?: unknown): number | string | T | T[] { // a function
  if (min instanceof Array) {
    return min[random(0, min.length)];
  }

  if ('number' === typeof min && 'number' === typeof max) {
    if (fn instanceof Array) {
      return random(min, max, () => random(fn));
    }

    if ('function' === typeof fn) {
      const count = random(min, max);
      const array = [];

      for (let i = 0; i < count; i++) {
        array.push(fn.apply(thisArg, [i, array]));
      }

      return array;
    }

    return Math.floor(Math.random() * Math.abs(min - max)) + Math.min(min, max);
  }

  if (null == min && null == max && null == fn && null == thisArg) {
    return Math.random().toString(36).substring(2);
  }

  throw new TypeError('min and max values must be numbers');
}
