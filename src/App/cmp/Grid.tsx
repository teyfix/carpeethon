import React from 'react';
import styled from 'styled-components';

type Cls<T> = new () => T;
type GridItem<T extends Item = Item> = React.FC<GridItemProps<T>> | Cls<React.Component<GridItemProps<T>>>;

interface GridProps<T extends Item = Item> {
  items: T[];
  factor: number;
  child: GridItem<T>;
  parentWidth: number;
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

class Grid<T extends Item = Item> extends React.Component<GridProps<T>, { columns: number; }> {
  state = {
    columns: this.calculateColumns(),
  };

  componentDidMount() {
    this.tick();
    window.addEventListener('resize', this.tick);
  }

  componentDidUpdate() {
    this.tick();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.tick);
  }

  render() {
    if (null == this.props.parentWidth) {
      return null;
    }

    const {items, child: Child} = this.props;
    const {columns} = this.state;

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

  private tick = (): void => {
    const columns = this.calculateColumns();

    if (columns === this.state.columns) {
      return;
    }

    this.setState({columns});
  };

  private calculateColumns(): number {
    return Math.min(
      this.props.items.length,
      Math.floor(this.props.parentWidth / this.props.factor),
    );
  }
}

export default Grid;
