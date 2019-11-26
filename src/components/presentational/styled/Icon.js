import styled from 'styled-components';

const Icon = styled.img`
  width: 25px;
  padding: 8px;

  &:hover {
    background-color: #ddd;
    border-radius: 25px;
    cursor: pointer;
  }
`;

export const StaticIcon = styled.img`
  width: 19px;
  height: 19px;
  margin-left: auto;
`;

export const Select = styled.div`
  height: 25px;
  width: ${(props) => (props.hide ? 0 : '25px')}
  margin: ${(props) => (props.hide ? 0 : '10px')}
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
