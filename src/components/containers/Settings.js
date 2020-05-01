import React, { useState, useEffect } from 'react';
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
    const [hidden, setHidden] = useState(true);
    const [start, setStart] = useState('08:00 am');
    const [end, setEnd] = useState('06:00 pm');

    useEffect(() => {
      UserService.getLoggedInUser(function(res){
        setStart(res.hours_start)
        setEnd(res.hours_end)
      })
    }, [])
    return(
    <DropdownWrapper hide={hidden} onClose={() => {}} interior={false}>
      <div style={{display:'flex' }}>
      <img style={{width:'20px', padding: '5px'}} src="time.svg"/>
      Hours of Operation
      <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
        if(!hidden){
          UserService.setHours(start, end, function(res) {
            console.log(res);
          });
        }
        setHidden(!hidden)
      }}
      />
      </div>
      <div className="outside-content">
        <br></br>
        <div style={{ display: 'flex' }}>
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
          </div></div>
        <br></br>
      </div>
    </DropdownWrapper>

    );
}
const ContentCP = () => {
  const [hidden, setHidden] = useState(true);
  const [closed, setClosed] = useState(true);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userCalendars, setCalendars] = useState({})

  useEffect(() => {
    UserService.getUserCalendars(function(res){
      let summaries = []
      let idToSummary = {}

      let summaryToId = {}
      for (let i = 0; i < res.length; i++) {
        let cal = res[i]
        let currSummary = cal['summary']
        summaries.push(currSummary)

        // In case users have multiple calendars with the same summary
        if (currSummary in summaryToId) {
          summaryToId[currSummary] = summaryToId[currSummary] + ',' + cal['id']
        } else {
          summaryToId[currSummary] = cal['id']
        }

        idToSummary[summaryToId[currSummary]] = currSummary
      }
      setOptions(summaries)
      setCalendars(summaryToId)
      UserService.getLoggedInUser(function(res){
        setSelected(idToSummary[res.primary_calendar])
      })
    })

  }, [])
    return (
      <DropdownWrapper hide={hidden} onClose={() => {}} interior={false}>
        <div style={{display:'flex' }}>
        <img style={{width:'20px', padding: '5px'}} src="calendar.svg"/>
        Calendar Preferences
        <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
          setHidden(!hidden)}
        }
        />
        </div>
        <div className="outside-content">
          <br></br>
          <Dropdown
            options={options}
            selected={selected ? selected : 'Default'}
            onSelect={(option) => {
                if(closed == true){
                  console.log("Primary calendar selected")
                  setSelected(option)
                }
                UserService.setPrimaryCalendar(userCalendars[option], function(res){
                  console.log(res);
                });
              }
            }
            onClose={() => {}}
          />
          <br></br>
        </div>
      </DropdownWrapper>);
}
const ContentCat = () => {
  const [hidden, setHidden] = useState(true);
  const [selectedMult, setSelectedMult] = useState([]);
  const [userCalendars, setCalendars] = useState({});
  const [optionsMult, setOptionsMult] = useState([]);

  useEffect(() => {
    UserService.getUserCalendars(function(res) {
      let summaries = []
      let sel = []
      let idToSummary = {}
      let summaryToId = {}
      for (let i = 0; i < res.length; i++) {
        let cal = res[i]
        let currSummary = cal['summary']
        summaries.push(currSummary)

        // In case users have multiple calendars with the same summary
        if (currSummary in summaryToId) {
          summaryToId[currSummary] = summaryToId[currSummary] + ',' + cal['id']
        } else {
          summaryToId[currSummary] = cal['id']
        }
        idToSummary[summaryToId[currSummary]] = currSummary
      }
      setCalendars(summaryToId)
      setOptionsMult(summaries)
      UserService.getLoggedInUser(function(res){
        sel = res.relevant_calendars.split(',')
        let selInit = sel.map((id) =>idToSummary[id])
        setSelectedMult(selInit);
      });
    })
  }, [])
      return(<DropdownWrapper hide={hidden} onClose={() => {}} interior={false}>
        <div style={{display:'flex' }}>
        <img style={{width:'20px', padding: '5px'}} src="categories.svg"/>
        Categories
        <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
          if(!hidden){
            let selectedIDs = selectedMult.map((summary) => { return userCalendars[summary] });
            console.log("Relevant cals selected")
            let commaSeparated = selectedIDs.join();
            console.log(commaSeparated);
            UserService.setRelevantCalendars(commaSeparated, function(res){console.log(res)});
          }
          setHidden(!hidden);
        }}
        />
        </div>
        <div className="outside-content">
          <br></br>
          <Selection
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
          <br></br>
        </div>
      </DropdownWrapper>
    );
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

      <ContentHO />
      <br></br>
      <ContentCP />
      <br></br>
      <ContentCat />
    </div>
  );
};

export default Settings;
