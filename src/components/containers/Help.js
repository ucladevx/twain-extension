import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../presentational/styled/Icon';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? 'space-between' : 'flex-start'};
`;

const Nav = styled.nav`
  height: 63px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -6px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const Header = styled.h1`
  margin-left: 15px;
  margin-right: auto;
`;

const HelpHeader = styled.h2`
  margin-left: 15px;
  margin-right: auto;
  font:'Roboto';
  font-size: 17px;
`;

const StyledLink = styled(Link)`
    display: flex;    //left to right
    align-items: center;
    justify-content: flex-start;
  text-decoration: none;
  font-size: 14px;
  font:'Roboto';
  color: #000;

  & p {
    margin: 10px;
    margin-right: auto; //text and right arrow icon
  }
`;

const Dropdown = styled.div`
  & .content {
    position: absolute;
    visibility: ${props => props.closed ? 'hidden' : 'visible'};
    opacity: ${props => props.closed ? 0 : 1}
    margin-left: -34%;
    margin-top: 9px;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 4px;
    color: #000;
    transition: opacity 1s ease;
  }
`;

const Help = ({ onAdd }) => {

  return (
      <div>
        <Nav>
            <StyledLink to="/login" >
            <img style={{width:'20px', padding: '2px'}} src="arrow-left.svg"/>
            </StyledLink>  
        <HelpHeader>Help</HelpHeader>

        <img style={{width:'25px', padding: '2px'}} src="help.svg"/>
        </Nav>

      </div>
  );
};

export default Help;
