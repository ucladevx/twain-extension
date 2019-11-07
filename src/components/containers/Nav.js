import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../presentational/styled/Icon';

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

const Navbar = () => {
  return (
    <Nav>
      <Header>Twain</Header>

      <Link to="/tasklist">
        <Icon src="add.svg" alt="Add" />
      </Link>
      <Link to="/tasklist">
        <Icon src="search.svg" alt="Search" />
      </Link>
      <Link to="/login">
        <Icon src="menu.svg" alt="Menu" />
      </Link>
    </Nav>
  );
};

export default Navbar;
