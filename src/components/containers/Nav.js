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

const StyledLink = styled(Link)`
    display: flex;    //left to right
    align-items: center;
    justify-content: flex-start;
  text-decoration: none;
  font-size: 14px;
  font:'Roboto';
  color: #000;
  border-bottom: 2px solid #ddd;

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

const Navbar = ({ onAdd }) => {
  const [closed, setClosed] = useState(true);

  return (
    <Nav>
      <Header>Twain</Header>

      <Icon src="add.svg" alt="Add" onClick={onAdd} />
      <Link to="/tasklist">
        <Icon src="list2.svg" alt="Search" />
      </Link>
      
      <Dropdown closed={closed} onClick={()=>setClosed(!closed)}>
        <Icon src="settings.svg" alt="Menu" />
     
      <div className="content">
          
        <StyledLink to="/settings" >
        <img style={{width:'20px', padding: '10px'}} src="settings.svg"/>
          <p>Settings</p>
          <img style={{width:'20px', padding: '10px', marginLeft: '30px'}} src="arrow-right.svg"/>
          </StyledLink>

        <StyledLink to="/help" >
        <img style={{width:'20px', padding: '10px'}} src="help.svg"/>
          <p>Help</p>
        <img style={{width:'20px', padding: '10px', marginLeft: '30px'}} src="arrow-right.svg"/>
        </StyledLink>

        <button style={{color: '#5187ED', border: 'none', font:'Roboto', fontSize:'17px', padding: '10px'}}>Log out</button>
      </div>
      </Dropdown>
    </Nav>
  );
};

export default Navbar;