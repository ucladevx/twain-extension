import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../presentational/styled/Icon';

import StorageService from '../../services/StorageService';

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

  p {
    width: 55px;
    margin: 10px;
    margin-right: auto; // text and right arrow icon
  }
`;

const Dropdown = styled.div`
  .content {
    position: absolute;
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.closed ? 0 : 1)}
    margin-top: 9px;

    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 4px;
    color: #000;
    transition: opacity 0.3s ease;
    z-index: 2;
  }
`;

const Navbar = () => {
  const [closed, setClosed] = useState(true);
  const [listsClosed, setListsClosed] = useState(true);
  const settingsNode = useRef();
  const listsNode = useRef();
  const history = useHistory();

  const handleClick = (e) => {
    if (!settingsNode.current.contains(e.target)) {
      setClosed(true);
    }
    if (!listsNode.current.contains(e.target)) {
      setListsClosed(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <Nav>
      <Header>Twain</Header>

      <Dropdown
        closed={listsClosed}
        onClick={() => setListsClosed(!listsClosed)}
        ref={listsNode}
      >
        <Icon src="/tasklist.svg" alt="Tasklist" />
        <div className="content" style={{ marginLeft: '-66px' }}>
          <StyledLink to="/tasklist">
            <img
              style={{ width: '20px', padding: '10px' }}
              src="/tasklist-grey.svg"
            />
            <p>Tasklist</p>
            <img
              style={{ width: '20px', padding: '10px', marginLeft: '10px' }}
              src="/arrow-right.svg"
            />
          </StyledLink>
          <StyledLink to="/completed" style={{ borderBottom: '0' }}>
            <img style={{ width: '20px', padding: '10px' }} src="/check.svg" />
            <p>Completed</p>
            <img
              style={{ width: '20px', padding: '10px', marginLeft: '10px' }}
              src="/arrow-right.svg"
            />
          </StyledLink>
        </div>
      </Dropdown>

      <Dropdown
        closed={closed}
        onClick={() => setClosed(!closed)}
        ref={settingsNode}
      >
        <Icon src="/settings.svg" alt="Menu" style={{ marginRight: '11px' }} />

        <div className="content" style={{ marginLeft: '-107px' }}>
          <StyledLink to="/settings">
            <img
              style={{ width: '20px', padding: '10px' }}
              src="/settings-grey.svg"
            />
            <p>Settings</p>
            <img
              style={{ width: '20px', padding: '10px', marginLeft: '10px' }}
              src="/arrow-right.svg"
            />
          </StyledLink>

          <StyledLink to="/help">
            <img style={{ width: '20px', padding: '10px' }} src="/help.svg" />
            <p>Help</p>
            <img
              style={{ width: '20px', padding: '10px', marginLeft: '10px' }}
              src="/arrow-right.svg"
            />
          </StyledLink>

          <button
            style={{
              backgroundColor: '#fff',
              color: '#5187ED',
              border: 'none',
              font: 'Roboto',
              fontSize: '17px',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={() => {
              StorageService.setLoggedIn(false, () => {
                history.push('/onboard');
              });
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
