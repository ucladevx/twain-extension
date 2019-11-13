import styled from 'styled-components';

const Icon = styled.img`
  width: 25px;
  padding: 8px;

  &:hover {
    background-color: #ddd;
    border-radius: 25px;
  }
`;

export const StaticIcon = styled.img`
  width: 19px;
  height: 19px;
  margin-left: auto;
`;

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

export default Icon;
