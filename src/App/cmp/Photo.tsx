import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
padding: 1rem;
flex-direction: column;

&, img {
  box-shadow: 0 0 4px 1px rgba(0,0,0,.18), 0 4px 8px 1px rgba(0,0,0,.22);
}
`;

const ImgWrapper = styled.div`
width: 100%;
margin-top: 2rem;

img {
  width: 100%;
}
`;

const Photo: React.FC<{ item: Photo; }> = ({item}) => (
  <Wrapper>
    <h1>{item.title}</h1>
    <ImgWrapper>
      <img src={item.imageUrl} alt={item.title}/>
    </ImgWrapper>
  </Wrapper>
);

export default Photo;
