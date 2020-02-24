import styled from 'styled-components';

export const Background = styled.div`
  // background-color: #0dbab1;
  //background-image: url('background.png');
  background-image: ${(props) => (props.image ? `url(${props.image})` : '')};
  background-size: 400px 100%;
  background-repeat: no-repeat;
  position: absolute;
  margin-top: -8px;
  margin-left: -8px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Centered = styled.div`
  margin: 20% auto;
  width: 80%;
  color: #fff;

  p,
  li,
  h1 {
    text-align: left;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween
      ? 'space-between'
      : props.spaceEvenly
      ? 'space-evenly'
      : props.flexEnd
      ? 'flex-end'
      : 'flex-start'};
`;
