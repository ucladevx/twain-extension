import styled, { css } from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? 'space-between' : 'flex-start'};
`;

const TimeBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0px 8px;
  align-items: center;
`;
