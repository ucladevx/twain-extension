import React, { useState } from 'react';
import Navbar from '../containers/Nav';
import styled, { css } from 'styled-components';
import { Row } from '../presentational/styled/Layout';
import Input, { Shared } from '../presentational/styled/Input';
import { Link } from 'react-router-dom';
import { StaticIcon } from '../presentational/styled/Icon';
import Dropdown, { Selection } from '../presentational/Dropdown';


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
  font: 'Roboto';
  font-size: 17px;
`;

const StyledLink = styled(Link)`
  display: flex; //left to right
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  font-size: 14px;
  font: 'Roboto';
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

  & .outside-content {
    display: block;
    visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
    max-height: ${(props) => (props.hide ? 0 : '300px')};
  }

  & img:hover {
    background-color: #eee;
  }
`;

const ContentHO = () => {
    const hours = [...Array(48).keys()].map((e) => {
      const i = parseInt(e / 2);
      const ampm = i > 12 ? 'pm' : 'am';
      const hour = ampm === 'am' ? i : i - 12;
      const minute = e % 2 === 0 ? '00' : '30';
      return `${hour < 10 ? '0' + hour : hour}:${minute} ${ampm}`;
    });
    const [start, setStart] = useState('08:00 am');
    const [end, setEnd] = useState('06:00 pm');

    return(<div style={{ display: 'flex' }}>
      <p style={{ verticalAlign: 'middle', padding: '0px 10px'}}>From</p>
      <div style={{ width: '33%' }}>
          <Dropdown
            mini
            options={hours}
            selected={start}
            onSelect={(opt) => setStart(opt)}
            onClose={() => {}}

          />
        </div>
        <p style={{ verticalAlign: 'middle', padding: '0px 10px'}}>to</p>
        <div style={{ width: '33%' }}>
          <Dropdown
            mini
            options={hours}
            selected={end}
            onSelect={(opt) => setEnd(opt)}
            onClose={() => {}}

          />
        </div>
      </div>
    );
}
const ContentCP = () => {
  const [selected, setSelected] = useState(null);
  const [closed, setClosed] = useState(true);

  const options = ['lorem', 'ipsum', 'here'];

    return (<Dropdown
        options={options}
        selected={selected ? selected : 'Default Calendar Name'}
        onSelect={(option) => {
            if(closed == true){
              console.log("Primary calendar selected")
              setSelected(option)
            }
          }
        }
        onClose={() => {}}
      />);
}
const ContentCat = () => {

  const [selectedMult, setSelectedMult] = useState([]);
  const optionsMult = ['more', 'lorem', 'ipsum', 'here'];

      return(<Selection
        options={optionsMult}
        selected={selectedMult}
        onSelect={(newOpt) => {
          if (selectedMult.includes(newOpt)) {
            setSelectedMult(selectedMult.filter((o) => o !== newOpt));
          } else {
            setSelectedMult(selectedMult.concat([newOpt]));
          }
        }}
      />
    );
}
const DropdownSetting = ({title, imageIcon, content}) => {
  const [hidden1, setHidden1] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [hidden3, setHidden3] = useState(true);

  console.log(content);
  if(content=="ContentCP"){
      return (
        <DropdownWrapper hide={hidden1} onClose={() => {}} interior={false}>
          <div style={{display:'flex' }}>
          <img style={{width:'20px', padding: '5px'}} src={imageIcon}/>
          {title}
          <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
            console.log("Toggle" + content)
            setHidden1(!hidden1)}
          }
          />
          </div>
          <div className="outside-content">
            <br></br>
            <ContentCP />
            <br></br>
          </div>
        </DropdownWrapper>
      );
    } else if(content=="ContentCat") {
      return (
        <DropdownWrapper hide={hidden2} onClose={() => {}} interior={false}>
          <div style={{display:'flex' }}>
          <img style={{width:'20px', padding: '5px'}} src={imageIcon}/>
          {title}
          <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
            console.log("Toggle" + content)
            setHidden2(!hidden2)}
          }
          />
          </div>
          <div className="outside-content">
            <br></br>
            <ContentCat />
            <br></br>
          </div>
        </DropdownWrapper>
      );
    } else if (content=="ContentHO") {
      return (
        <DropdownWrapper hide={hidden3} onClose={() => {}} interior={false}>
          <div style={{display:'flex' }}>
          <img style={{width:'20px', padding: '5px'}} src={imageIcon}/>
          {title}
          <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
            console.log("Toggle" + content)
            setHidden3(!hidden3)}
          }
          />
          </div>
          <div className="outside-content">
            <br></br>
            <ContentHO />
            <br></br>
          </div>
        </DropdownWrapper>
      );
    } else {
      return(<div></div>);
    }
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
  // UserService.getUserCalendars(function(res) {
  //   console.log('user info retrieved');
  //   console.log(res);
  // });

  return (
    <div>
      <Nav>
        <StyledLink to="/tasklist">
          <img style={{ width: '20px', padding: '2px' }} src="arrow-left.svg" />
        </StyledLink>
        <HelpHeader>Settings</HelpHeader>

        <img style={{ width: '25px', padding: '2px' }} src="settings.svg" />
      </Nav>

      <DropdownSetting title="Hours of Operation" imageIcon="time.svg" content="ContentHO"/>
      <br></br>
      <DropdownSetting title="Calendar Preferences" imageIcon="calendar.svg" content="ContentCP"/>
      <br></br>
      <DropdownSetting title="Categories" imageIcon="categories.svg" content="ContentCat"/>
    </div>
  );
};

export default Settings;
