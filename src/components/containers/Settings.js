import React, { useState } from 'react';
import Navbar from '../containers/Nav';
import styled, { css } from 'styled-components';
import { Row } from '../presentational/styled/Layout';
import Input, { Shared } from '../presentational/styled/Input';
import { Link } from 'react-router-dom';
import { StaticIcon } from '../presentational/styled/Icon';

import UserService from '../../services/UserService';


const Nav = styled.nav`
  height: 63px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -6px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
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

const DropdownWrapper = styled.div`
  width: 92%;
  justify-content: flex-start;
  padding: 15px;
  background-color: #eee;

  & .content {
    display: block;
    visibility: ${props => props.hide ? 'hidden' : 'visible'};
    max-height: ${props => props.hide ? 0 : '300px'};
  }

  & img:hover {
    background-color: #eee;
  }
`;

const Dropdown = ({title, imageIcon}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <DropdownWrapper hide={hidden}>

      <div style={{display:'flex' }}>
      <img style={{width:'20px', padding: '5px'}} src={imageIcon}/>
      {title}
      <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=>setHidden(!hidden)}/>

      </div>
      <div className="content">
        <br></br>
        Settings<br></br>
        Content
      </div>
    </DropdownWrapper>
  )
}

const Settings = () => {
  /* Sample UserService use: */
  // UserService.setHours(9, 20, function(res) {
  //   console.log('Hours set');
  //   console.log(res);
  // });
  //
  // UserService.setPrimaryCalendar("cal6", function(res) {
  //   console.log('Primary calendar set');
  //   console.log(res);
  // });
  // UserService.setRelevantCalendars("cal1,cal3,cal6,cal7", function(res) {
  //   console.log('Relevant calendars set');
  //   console.log(res);
  // });
  // UserService.getLoggedInUser(function(res) {
  //   console.log('user info retrieved');
  //   console.log(res);
  // });

  return (
    <div>
      <Nav>
            <StyledLink to="/login" >
            <img style={{width:'20px', padding: '2px'}} src="arrow-left.svg"/>
            </StyledLink>
        <HelpHeader>Settings</HelpHeader>

        <img style={{width:'25px', padding: '2px'}} src="settings.svg"/>
      </Nav>

      <Dropdown title="Hours of Operation" imageIcon="time.svg"/>
      <br></br>
      <Dropdown title="Calendar Preferences" imageIcon="calendar.svg"/>
      <br></br>
      <Dropdown title="Categories" imageIcon="categories.svg"/>
    </div>
  );
};

export default Settings;
