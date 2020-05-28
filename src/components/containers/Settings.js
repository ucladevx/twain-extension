import React, { useState, useEffect } from 'react';
import Navbar from '../containers/Nav';
import styled, { css } from 'styled-components';
import { Row } from '../presentational/styled/Layout';
import Input, { Shared } from '../presentational/styled/Input';
import { Link } from 'react-router-dom';
import { StaticIcon } from '../presentational/styled/Icon';
import { DropdownS, SelectionS } from '../presentational/Dropdown';


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

const OptionWrapper = styled.div`
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

// const ContentHO = () => {
//     return();
// }
// const ContentCP = () => {
//
//     return ();
// }
// const ContentCat = () => {
//
// }

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
  const hours = [...Array(48).keys()].map((e) => {
    const i = parseInt(e / 2);
    const ampm = i > 12 ? 'pm' : 'am';
    const hour = ampm === 'am' ? i : i - 12;
    const minute = e % 2 === 0 ? '00' : '30';
    return `${hour < 10 ? '0' + hour : hour}:${minute} ${ampm}`;
  });
  const [hidden1, setHidden1] = useState(true);
  const display = ['Yes', 'No'];
  const [changes, setChanges] = useState(false);
  const [start, setStart] = useState('08:00 am');
  const [end, setEnd] = useState('06:00 pm');
  const [hidden2, setHidden2] = useState(true);
  const [closed, setClosed] = useState(true);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userCalendars, setCalendars] = useState({})
  const [hidden3, setHidden3] = useState(true);
  const [selectedMult, setSelectedMult] = useState([]);
  const [userCalendarsMult, setCalendarsMult] = useState({});
  const [optionsMult, setOptionsMult] = useState([]);
  const [hidden4, setHidden4] = useState(true);
  const [selectedW, setSelectedW] = useState(true);
  const [closedW, setClosedW] = useState(true);

  const updateBackend = () => {
    let selectedIDs = selectedMult.map((summary) => { return userCalendarsMult[summary] });
    let commaSeparated = selectedIDs.join();
    UserService.setRelevantCalendars(commaSeparated, function(res){});
    UserService.setPrimaryCalendar(userCalendars[selected], function(res){});
    UserService.setHours(start, end, function(res){});
    UserService.setWeekendOption(selectedW === 'Yes', function(res){});
  }
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
      setCalendarsMult(summaryToId)
      setOptionsMult(summaries)
      UserService.getLoggedInUser(function(res){
        setSelected(idToSummary[res.primary_calendar])
        let sel = res.relevant_calendars.split(',')
        let selInit = sel.map((id) =>idToSummary[id])
        setSelectedMult(selInit);
        setSelectedW(res.weekend_setting ? "Yes" : "No")
        // Re-construct time strings
        let startHr = parseInt(res.hours_start.substring(0,2))
        let endHr = parseInt(res.hours_end.substring(0,2))
        let startHr12 = startHr;
        let endHr12 = endHr;

        if (startHr > 12) {
          startHr12 -= 12
        }

        if (endHr > 12) {
          endHr12 -= 12
        }

        let startString = (startHr12 < 10 ? "0" : "") + startHr12.toString() + ":" + res.hours_start.substring(3,5) + (startHr > 11 ? " pm" : " am")
        let endString = (endHr12 < 10 ? "0" : "") + endHr12.toString() + ":" + res.hours_end.substring(3,5) + (endHr > 11 ? " pm" : " am")

        setStart(startString)
        setEnd(endString)
      })
    })

  }, [])
  return (
    <div>
      <Nav>
        <StyledLink to="/tasklist">
          <img style={{ width: '20px', padding: '2px' }} src="arrow-left.svg" />
        </StyledLink>
        <HelpHeader>Settings</HelpHeader>

        <img style={{ width: '25px', padding: '2px' }} src="settings.svg" />
      </Nav>

      <OptionWrapper hide={hidden1} onClose={() => {}} interior={false}>
        <div style={{display:'flex' }}>
        <img style={{width:'20px', padding: '5px'}} src="time.svg"/>
        Hours of Operation
        <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
          setHidden1(!hidden1)
        }}
        />
        </div>
        <div className="outside-content">
          <br></br>
          <div style={{ display: 'flex' }}>
          <p style={{ verticalAlign: 'middle', padding: '0px 10px'}}>From</p>
          <div style={{ width: '33%', zIndex: '1'}}>
              <DropdownS
                mini
                options={hours}
                selected={start}
                onSelect={(opt) => {
                  setStart(opt)
                  setChanges(true)
                }}
                onClose={() => {}}
              />
            </div>
            <p style={{ verticalAlign: 'middle', padding: '0px 10px'}}>to</p>
            <div style={{ width: '33%', zIndex: '1' }}>
              <DropdownS
                mini
                options={hours}
                selected={end}
                onSelect={(opt) => {
                  setEnd(opt)
                  setChanges(true)
                }}
                onClose={() => {}}
              />
            </div></div>
          <br></br>
        </div>
      </OptionWrapper>
      <br></br>
      <OptionWrapper hide={hidden2} onClose={() => {}} interior={false}>
        <div style={{display:'flex' }}>
        <img style={{width:'20px', padding: '5px'}} src="calendar.svg"/>
        Primary Calendar
        <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
          setHidden2(!hidden2)}
        }
        />
        </div>
        <div className="outside-content">
          <br></br>
          <DropdownS
            options={options}
            selected={selected ? selected : 'Default'}
            onSelect={(option) => {
                if(closed == true){
                  setSelected(option)
                }
                setChanges(true)
              }
            }
            onClose={() => {}}
          />
          <br></br>
        </div>
      </OptionWrapper>
      <br></br>
      <OptionWrapper hide={hidden3} onClose={() => {}} interior={false}>
        <div style={{display:'flex' }}>
        <img style={{width:'20px', padding: '5px'}} src="categories.svg"/>
        Relevant Calendars
        <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {setHidden3(!hidden3)}}/>
        </div>
        <div className="outside-content">
          <br></br>
          <SelectionS
            options={optionsMult}
            selected={selectedMult}
            onSelect={(newOpt) => {
              if (selectedMult.includes(newOpt)) {
                setSelectedMult(selectedMult.filter((o) => o !== newOpt));
              } else {
                setSelectedMult(selectedMult.concat([newOpt]));
              }
              setChanges(true)
            }}
          />
          <br></br>
        </div>
      </OptionWrapper>
      <br></br>
      <OptionWrapper hide={hidden4} onClose={() => {}} interior={false}>
        <div style={{display:'flex' }}>
        <img style={{width:'20px', padding: '5px'}} src="calendar.svg"/>
        Schedule on Weekends?
        <img style={{width:'20px', padding: '2px', marginLeft: 'auto'}} src="arrow-down.svg" onClick={()=> {
          setHidden4(!hidden4)}
        }
        />
        </div>
        <div className="outside-content">
          <br></br>
          <DropdownS
            options={display}
            selected={selectedW ? selectedW : 'Yes'}
            onSelect={(option) => {
                setSelectedW(option);
                setChanges(true);
            }}
            onClose={(bool) => setClosedW(bool)}
          />
          <br></br>
        </div>
      </OptionWrapper>
      <br></br>
      <div>
      <button
        id="saveCur"
        style={{
          fontSize:'18px', border:"1px solid", borderRadius:'4px', fontFamily:'Roboto', padding:'4px 12px'
        }}
        disabled={!changes}
        onClick={updateBackend}>
        <Link
          style={{
            color:'black',
            textDecoration:'none',
            pointerEvents: changes ? 'auto' : 'none'
            }}
          to="/tasklist">
        Save
        </Link>
      </button>
      </div>
    </div>
  );
};

export default Settings;
