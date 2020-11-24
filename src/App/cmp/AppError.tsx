import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
justify-content: center;

&, div {
  padding: 1rem;
}

div {
  min-width: 400px;
  max-width: 100%;

  h1, p {
    padding: .4rem 1rem; 
    border-radius: 6px;
  }

  p {
    margin-top: .6rem;
  }
}
`;

const AppError: React.FC<{ error?: object }> = ({error}) => {
  if (null == error) {
    error = new Error('null error occured');
  }

  if (error instanceof Error) {
    return (
      <Wrapper>
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
        </div>
      </Wrapper>
    );
  }

  if ('object' === typeof error && error.hasOwnProperty('toString')) {
    return <AppError error={new Error(error.toString())}/>;
  }

  if ('string' === typeof error) {
    error = new Error(error);
  } else {
    error = new Error('Unknown error');
  }

  return <AppError error={error}/>;
};

export default AppError;
