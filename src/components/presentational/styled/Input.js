import styled, { css } from 'styled-components';

import { Font } from './Global';

export const Shared = css`
  ${Font}

  margin: 5px;
  padding: 8px;
  background-color: ${(props) => (props.disabled ? '#fff' : '#ddd')};
  border: none
  border-bottom: 2px solid transparent;
  border-radius: 5px;
  transition: border-color 0.2s, border-radius 0.1s, all 0.3s;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'text')};
  }

  &:focus {
    outline-style: none;
  }
`;

const Input = styled.input`
  ${Shared}

  width: 90%;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

export const TextArea = styled.textarea`
  ${Shared}

  width: 90%;
  resize: ${(props) => (props.disabled ? 'none' : 'vertical')};

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

export const Mini = styled.input`
  ${Shared}

  width: 90%;
  margin: 0px;
  padding: 3px;
  background-color: #fff;
  border-bottom: ${(props) =>
    props.disabled ? '2px solid transparent' : '2px solid #ccc'};
  border-radius: 0px;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

export default Input;
