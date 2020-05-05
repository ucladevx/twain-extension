import styled, { css } from 'styled-components';

import { Font } from './Global';

export const Walkthroughbackground = styled.div`
  ${Font}
  color:#fff;
  background-image: url('background.png');
  background-repeat: no-repeat;
  position: absolute;
  width: 77%;
  height: 45vh;
  top: 40vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 7vw;
  padding-right: 7vw;
  overflow: hidden;
  border-radius: 10px;
  text-align: left;
`;

export const SkipButton = styled.button`
  background: none;
  color: #fff;
  margin-top: 4vh;
  border: none;
  text-decoration: underline;
  position: absolute;
  right: 5vw;
  bottom: 5vh;

  &:hover {
    color: #5187ed;
    cursor: pointer;
  }
`;
