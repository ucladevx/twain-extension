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
  opacity: ${(props) => (props.hide ? 0 : 1)}
  border: 1px solid #ccc;
  border-radius: 30px;
  transition: all 0.15s;

  &:hover {
    border: 1px solid transparent;
    background-color: #00e676;
  }
`;

export default Icon;
