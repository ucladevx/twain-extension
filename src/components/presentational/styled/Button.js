import styled, { css } from 'styled-components';

import { Font } from './Global';

const Shared = css`
  ${Font}

  border: none;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.5s;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`;

export const TextButton = styled.button`
  ${Shared}

  padding: 8px 13px;
  color: #5187ed;
  background-color: #fff;

  &:hover {
    background-color: #eee;
  }
`;

const Button = styled.button`
  ${Shared}

  margin: 10px;
  padding: 8px 13px;
  color: ${(props) => (props.disabled ? '#999' : '#fff')};
  background-color: ${(props) =>
    props.disabled ? '#ddd' : props.primary ? '#5187ed' : '#828282'};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? '#ddd' : props.primary ? '#739ff0' : '#828282'};
  }
`;

export default Button;
