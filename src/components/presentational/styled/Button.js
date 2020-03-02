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

  background-image: ${(props) =>
    props.image ? `url(${props.image})` : 'none'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30px 90px;
  min-height: 40px;
  min-width: 80px;

  margin: 10px;
  padding: 8px 13px;
  color: ${(props) =>
    props.disabled || props.info || props.secondary ? '#666' : '#fff'};
  box-shadow: ${(props) =>
    props.disabled || props.info ? 'none' : '0 3px 6px 0 rgba(0, 0, 0, 0.2)'};
  background-color: ${(props) =>
    props.disabled
      ? '#ddd'
      : props.primary
      ? '#5187ed'
      : props.info || props.secondary
      ? '#fff'
      : '#828282'};
  border: ${(props) => (props.info ? '3px solid #ddd' : 'none')}

  &:hover {
    background-color: ${(props) =>
      props.disabled || props.secondary
        ? '#ddd'
        : props.primary
        ? '#739ff0'
        : props.info
        ? '#fff'
        : '#8f8f8f'};
  }
`;

export const FullButton = styled(Button)`
  width: 90%;
  height: 50px;
  border-radius: 10px;
`;

export default Button;
