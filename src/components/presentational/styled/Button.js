import styled, { css } from 'styled-components';

import { Font } from './Global';

const Shared = css`
  ${Font}

  border: none;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.5s;

  &:hover {
    cursor: ${(props) =>
      props.disabled || props.info ? 'default' : 'pointer'};
  }
`;

export const TextButton = styled.button`
  ${Shared}

  padding: 8px 13px;
  margin-right: 7px;
  color: #5187ed;
  background-color: #ddd;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const Button = styled.button`
  ${Shared}

  margin: 10px;
  padding: 8px 13px;
  color: ${(props) => (props.disabled || props.info ? '#999' : '#fff')};
  box-shadow: ${(props) =>
    props.disabled || props.info ? 'none' : '0 3px 6px 0 rgba(0, 0, 0, 0.2)'};
  background-color: ${(props) =>
    props.disabled
      ? '#ddd'
      : props.primary
      ? '#5187ed'
      : props.info
      ? '#eee'
      : '#828282'};

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? '#ddd'
        : props.primary
        ? '#739ff0'
        : props.info
        ? '#eee'
        : '#8f8f8f'};
  }
`;

export const FullButton = styled(Button)`
  width: 90%;
  height: 60px;
  border-radius: 10px;
`;

export default Button;
