import styled, { css } from 'styled-components';

import { Font } from './Global';

export const Shared = css`
  ${Font}

  margin: ${(props) => (props.myDisabled ? '1px' : '5px')};
  padding: ${(props) => (props.myDisabled ? '2px' : '8px')};
  background-color: ${(props) => (props.myDisabled ? '#fff' : '#ddd')};
  border: none
  border-bottom: 2px solid transparent;
  border-radius: 5px;
  transition: border-color 0.2s, border-radius 0.1s, all 0.25s;

  &:focus {
    outline-style: none;
  }
`;

const Input = styled.input`
  ${Shared}

  width: 90%;
  color: #000;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }

  &:hover {
    cursor: ${(props) =>
      props.myDisabled ? 'default' : props['no-hover'] ? 'pointer' : 'text'};
  }
`;

export const TextArea = styled.textarea`
  ${Shared}

  width: 90%;
  height: ${(props) => (props.myDisabled ? '20px' : '100px')};
  overflow: auto;
  resize: ${(props) => (props.myDisabled ? 'none' : 'none')};

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
    props.myDisabled ? '2px solid transparent' : '2px solid #ccc'};
  border-radius: 0px;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
  }
`;

export default Input;
