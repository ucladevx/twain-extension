import React, { useState } from 'react';
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
  background-image: url('navbar.png');
  background-repeat: no-repeat;

  height: 67px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: -10px -8px 12px -8px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
`;

const Header = styled.p`
  font-size: 18px;
  color: #fff;
  margin-left: 5%;
  margin-right: auto;
`;

const StyledLink = styled(Link)`
  display: flex; // left to right
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  font-size: 14px;
  font: 'Roboto';
  color: #000;
  border-bottom: 2px solid #ddd;

  & p {
    margin: 10px;
    margin-right: auto; // text and right arrow icon
  }
`;

const Dropdown = styled.div`
  & .content {
    position: absolute;
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.closed ? 0 : 1)}
    margin-left: -41%;
    margin-top: 9px;

    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 4px;
    color: #000;
    transition: opacity 1s ease;
    z-index: 2;
  }
`;

const Navbar = () => {
  const [closed, setClosed] = useState(true);

  return (
    <Nav>
      <Header>Twain</Header>

      <Link to="/tasklist">
        <Icon src="/tasklist.svg" alt="Tasklist" />
      </Link>

      <Dropdown closed={closed} onClick={() => setClosed(!closed)}>
        <Icon src="/settings.svg" alt="Menu" style={{ marginRight: '11px' }} />

        <div className="content">
          <StyledLink to="/settings">
            <img
              style={{ width: '20px', padding: '10px' }}
              src="/settings.svg"
            />
            <p>Settings</p>
            <img
              style={{ width: '20px', padding: '10px', marginLeft: '30px' }}
              src="/arrow-right.svg"
            />
          </StyledLink>

          <StyledLink to="/walkthrough">
            <img style={{ width: '20px', padding: '10px' }} src="/help.svg" />
            <p>Help</p>
            <img
              style={{ width: '20px', padding: '10px', marginLeft: '30px' }}
              src="/arrow-right.svg"
            />
          </StyledLink>

          <button
            style={{
              color: '#5187ED',
              border: 'none',
              font: 'Roboto',
              fontSize: '17px',
              padding: '10px'
            }}
          >
            Log out
          </button>
        </div>
      </Dropdown>
    </Nav>
  );
};

export default Navbar;
