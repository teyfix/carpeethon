import React, {RefObject} from 'react';
import {Subscription} from 'rxjs';
import {debounceTime, pluck} from 'rxjs/operators';
import styled from 'styled-components';
import watchResize from '../../helper/watchResize';

type Cls<T> = new () => T;
type GridItem<T extends Item = Item> = React.FC<GridItemProps<T>> | Cls<React.Component<GridItemProps<T>>>;

interface GridProps<T extends Item = Item> {
  items: T[];
  factor: number;
  child: GridItem<T>;
  parent: RefObject<HTMLElement>;
}

interface GridState {
  width: number;
}


interface GridItemProps<T extends Item = Item> {
  item: T;
}

const Flex = styled.div`
display: flex;
padding: 2rem;
`;

const FlexFill = styled.div`
flex: 1;

& + & {
  margin-left: 2rem;
}
`;

const ChildWrapper = styled.div`
& + & {
  margin-top: 2rem;
}
`;

class Grid<T extends Item = Item> extends React.Component<GridProps<T>, GridState> {
  state = {width: 0};

  private subscription: Subscription;

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const {props: {items}, state: {width}} = this;

    if (!items || !items.length || !width) {
      return null;
    }

    const {factor, child: Child} = this.props;
    const {min, max, floor} = Math;
    const columns = max(
      1,
      min(
        items.length,
        floor(width / factor),
      ),
    );

    return <Flex>{
      Array.from({length: columns}).map((_, i) => {
        return <FlexFill key={i}>{
          Array.from({length: Math.ceil(items.length / columns)}).map((_, j) => {
            const item = items[i + j * columns];

            if (null == item) {
              return null;
            }

            return <ChildWrapper key={item.id}><Child item={item}/></ChildWrapper>;
          })
        }</FlexFill>;
      })
    }</Flex>;
  }

  private subscribe() {
    const {parent} = this.props;

    if (this.subscription || !parent || !parent.current) {
      return;
    }

    this.subscription = watchResize(parent.current).pipe(
      pluck('width'),
      debounceTime(50),
    ).subscribe((width) => {
      this.setState({width});
    });
  }
}

export default Grid;
