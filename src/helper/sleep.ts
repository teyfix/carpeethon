import {random} from './random';

// i think you can realize what this is
function sleep(ms: number): Promise<void>;
function sleep(from: number, to: number): Promise<void>;
function sleep(ms: number, to?: number): Promise<void> {
  if ('number' === typeof ms) {
    if ('number' === typeof to) {
      ms = random(ms, to);
    } else if (null != to) {
      throw new Error('to must be a number'); // redundant..
    }

    return new Promise(_ => setTimeout(_, ms));
  }

  if ('number' === typeof ms) {
    throw new Error('from must be a number'); // redundant..
  }

  throw new Error('ms must be a number'); // redundant..
}

export default sleep;
