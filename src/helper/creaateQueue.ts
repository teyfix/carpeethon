import {Subject} from 'rxjs';
import {first, skip, tap} from 'rxjs/operators';

const createQueue = (): [() => void, () => Promise<void>] => {
  let queue = 0;
  const change = new Subject<void>();

  return [
    () => change.next(),
    (): Promise<void> => {
      return change.pipe(
        skip(queue++),
        first(),
        tap(() => queue--),
      ).toPromise();
    },
  ];
};

export default createQueue;
