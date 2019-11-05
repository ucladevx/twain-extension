import styled, { css } from 'styled-components';

import { Font } from './Global';

const Shared = css`
  ${Font}

  margin: 8px;
  padding: 10px;
  background-color: #e5e5e5;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.5s;

  &:hover {
    cursor: text;
  }

  &:focus {
    outline-style: none;
  }
`;

export const NumberInput = styled.input`
  ${Shared}

  margin: 0px 5px;
  padding: 5px;
  height: 20px;
  width: 25px;
  border-radius: 10px;
  text-align: center;

  /* Hide spin buttons */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

export const TextArea = styled.textarea`
  ${Shared}

  width: 90%;
  height: 150px;
  resize: vertical;

  &:focus {
    border-bottom: 2px solid #5187ed;
    border-radius: 5px 5px 0px 0px;
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

export default Input;
