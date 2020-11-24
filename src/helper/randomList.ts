import createQueue from './creaateQueue';
import {random} from './random';
import sleep from './sleep';

const randomList = <T>(items: T[], min = 100, max = 300): () => Promise<T> => {
  items = items.slice(); // i may have trust issues

  const [next, queue] = createQueue();

  return async () => {
    if (!items.length) {
      await queue();
    }

    const e = random(items);

    items = items.filter(f => e !== f);

    sleep(min, max) // although i dont like setTimeouts that goes to the empty space..
      .then(() => {   // i dont think i have any other choice here :(
        items = items.concat(e);
        next();
      });

    return e;
  };
};

export default randomList;
