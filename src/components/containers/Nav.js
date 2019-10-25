import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -12px;
`;

const Icon = styled.img`
  width: 25px;
  padding: 8px;

  &:hover {
    background-color: #eee;
    border-radius: 25px;
  }
`;

const Header = styled.h1`
  margin-left: 8px;
  margin-right: auto;
`;

const Navbar = () => {
  return (
    <Nav>
      <Header>TWAIN</Header>

      <Link to="/login">
        <Icon src="home.svg" alt="Home" />
      </Link>
      <Link to="/tasklist">
        <Icon src="checkmark.svg" alt="Tasklist" />
      </Link>
      <Link to="/settings">
        <Icon src="settings.svg" alt="Settings" />
      </Link>
    </Nav>
  );
};

export default Navbar;
