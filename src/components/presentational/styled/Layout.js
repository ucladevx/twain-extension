import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? 'space-between' : 'flex-start'};
`;
