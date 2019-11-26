import styled, { css } from 'styled-components';

export const Font = css`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
`;

export const Text = styled.p`
  margin: 3px;
  color: ${(props) => (props.primary ? '#000' : '#999')};
  font-size: ${(props) => (props.primary ? '16px' : '14px')};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
`;

const Global = styled.div`
  ${Font}

  text-align: center;
  background-color: #fff;
`;

export default Global;
