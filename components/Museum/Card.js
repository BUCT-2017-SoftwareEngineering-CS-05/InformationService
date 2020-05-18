import React from 'react';
import styled from 'styled-components';

const MYCard = props => (
  <Container>
    <Cover>
      <Image source={props.image} />
    </Cover>
    <Content>
      <Title>{props.Title}</Title>
    </Content>
  </Container>
);

export default MYCard;

const Content = styled.View`
  align-items: center;
  height: 80px;
  text-align: center;
  justify-content: center;
`;

const Container = styled.View`
  background: white;
  width: 350px;
  height: 280px;
  border-radius: 20px;
  margin-left: 30px;
  margin-top: 30px;
  border-width: 0.1px;
`;

const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  overflow: hidden;
`;

const Title = styled.Text`
  font-size: 40;
  text-align: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
