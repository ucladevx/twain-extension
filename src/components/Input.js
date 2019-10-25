import styled from 'styled-components';

const Input = styled.input`
  width: 90%;
  background-color: #fff;
  margin: 8px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 5px;

  &:hover {
    background-color: #eee;
    border-bottom: 2px solid #3c99dc;
    cursor: text;
  }

  &:focus {
    outline-style: none;
    border-bottom: 2px solid #3c99dc;
  }
`;

export default Input;
