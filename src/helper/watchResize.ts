import {ResizeSensor} from 'css-element-queries';
import {Observable} from 'rxjs';

type Size = { width: number; height: number; };
const watchResize = <T extends HTMLElement>(element: T): Observable<Size> => {
  return new Observable<Size>(observer => {
    const sensor = new ResizeSensor(element, size => {
      observer.next(size);
    });

    observer.next({
      width: element.clientWidth,
      height: element.clientHeight,
    });

    return () => sensor.detach();
  });
};

export default watchResize;
