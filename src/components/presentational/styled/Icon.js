import styled from 'styled-components';

export const Select = styled.div`
  height: 25px;
  width: 25px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;

  &:hover {
    background-color: #ccc;
  }
`;

const Icon = styled.img`
  width: 25px;
  margin-left: auto;
  padding: 8px;

  &:hover {
    background-color: #eee;
    border-radius: 25px;
  }
`;

export default Icon;
