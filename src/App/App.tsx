import React, {createRef} from 'react';
import {Subscription} from 'rxjs';
import styled from 'styled-components';
import photoService from '../photoService';
import AppError from './cmp/AppError';
import Grid from './cmp/Grid';
import Loading from './cmp/Loading';
import Photo from './cmp/Photo';

interface AppState {
  error: unknown;
  photos: Photo[];
  failed: boolean;
  loading: boolean;
  parentWidth: number;
}

const FillHeight = styled.div`
height: 100%;
overflow-y: auto;
`;

const FlexCenter = styled.div`
display: flex;
padding: 1rem;
justify-content: center;
`;

class App extends React.Component<unknown, AppState> {
  state = {
    failed: false,
    error: null,
    photos: [],
    loading: false,
    parentWidth: null,

  };

  readonly container = createRef<HTMLDivElement>();
  private subscription: Subscription;

  infiniteScroll = (): void => {
    if (null == this.container || null == this.container.current) {
      return;
    }

    const {scrollHeight, scrollTop, clientHeight} = this.container.current;

    if (clientHeight * 2 > scrollHeight - (scrollTop + clientHeight)) {
      this.loadMore();
    }
  };

  componentDidMount() {
    this.infiniteScroll();
  }

  componentDidUpdate() {
    this.infiniteScroll();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const {error, failed, loading, photos} = this.state;

    if (failed) {
      return <AppError error={error}/>;
    }

    return (
      <FillHeight onScroll={this.infiniteScroll} ref={this.container}>
        <FlexCenter>
          <h1>this is not an actual gallery..</h1>
        </FlexCenter>
        {photos?.length
          ? <Grid parent={this.container} factor={380} items={photos} child={Photo}/>
          : null}
        {loading ? <Loading/> : null}
      </FillHeight>
    );
  }

  private loadMore(): void {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});

    photoService.list()
      .then(photo => this.setState({photos: this.state.photos.concat(photo)}))
      .catch(error => this.setState({error, failed: true}))
      .then(() => this.setState({loading: false}))
      .then(() => this.infiniteScroll());
  }
}


export default App;
