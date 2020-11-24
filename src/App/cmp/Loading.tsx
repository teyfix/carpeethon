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
  
  h1 {
    font-weight: 300;
    background: transparent linear-gradient(to right, #fff, #e6e9ed, #fff) left top / 300% 100%;  
    animation: loadingH1 linear 2s infinite;
    
    @keyframes loadingH1 {
      from {
        background-position: 0 0;
      }
  
      to {
        background-position: 300% 0;
      }
    }
  }
  
  p {
    margin-top: .6rem;
    animation: loadingP linear 2s infinite;
    background: transparent linear-gradient(to right, #e6e9ed, #fff, #e6e9ed) left top / 200% 100%;

    @keyframes loadingP {
      from {
        background-position: 0 0;
      }
  
      to {
        background-position: 200% 0;
      }
    }  
  }
}
`;

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <h1>Loading</h1>
        <p>Please wait</p>
      </div>
    </Wrapper>
  );
};

export default Loading;
