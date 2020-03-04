import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button, { FullButton } from '../presentational/styled/Button';
import Dropdown, { Selection, TimePicker } from '../presentational/Dropdown';
import { Row } from '../presentational/styled/Layout';
import { Background, Centered } from '../presentational/styled/Layout';

import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';

const Intro = ({ handleContinue }) => {
  const getUser = async () => {
    AuthService.signIn(function(user) {
      console.log('Signed-in user:', user);
    });
  };

  return (
    <div>
      <img
        src="logo.png"
        style={{
          width: '150px',
          position: 'absolute',
          top: '0',
          left: '10px'
        }}
      />
      <h1 style={{ marginTop: '20vh' }}>
        Scheduling your day so you don't have to.
      </h1>
      <p>
        We optimize your free time, allowing you to be your most productive
        self.
      </p>
      <FullButton
        secondary
        onClick={() => {
          getUser();
          handleContinue();
        }}
        style={{ color: '#5187ED' }}
      >
        Continue with Google
      </FullButton>
    </div>
  );
};

const Welcome = ({ handleContinue }) => (
  <div>
    <img
      src="welcome_to_twain.png"
      style={{ position: 'absolute', top: '0px' }}
    />
    <h1>
      Welcome to <br />
      Twain!
    </h1>
    <p>Your Twain to-do list:</p>
    <ul>
      <li>Tell us your scheduling preferences</li>
      <li>Create your list of tasks</li>
      <li>Let Twain schedule your tasks into your Google calendar</li>
    </ul>
    <FullButton secondary onClick={handleContinue}>
      Let's get started!
    </FullButton>
  </div>
);

const OptionDropdown = ({ handleContinue }) => {
  const [selected, setSelected] = useState(null);
  const [closed, setClosed] = useState(true);

  const updateBackendAndContinue = () => {
    UserService.setPrimaryCalendar(userCalendars[selected], handleContinue)
  }

  const [userCalendars, setCalendars] = useState({})
  const [calendarOptions, setCalendarOptions] = useState([])

  useEffect(() => {
    UserService.getUserCalendars(function(res) {
      let summaries = []
      let summaryToId = {}
      
      for (let i = 0; i < res.length; i++) {
        let cal = res[i]
        summaries.push(cal['summary'])
        summaryToId[cal['summary']] = cal['id']
      }
      console.log(summaries)
      console.log(summaryToId)

      setCalendars(summaryToId)
      setCalendarOptions(summaries)
    })
  }, [])

  return (
    <div>
      <img
        src="primary_calendar.png"
        style={{
          marginTop: '-200px',
          marginLeft: '-80px',
          marginBottom: '-80px'
        }}
      />
      <h2>Your Primary Calendar</h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          padding: '0 5%'
        }}
      >
        Which calendar do you want Twain to schedule your tasks in?
      </p>
      <Dropdown
        options={calendarOptions}
        selected={selected ? selected : 'Default Calendar Name'}
        onSelect={(option) => setSelected(option)}
        onClose={(bool) => setClosed(bool)}
      />
      {closed ? (
        <Row flexEnd>
          <Button
            disabled={!selected}
            secondary={selected}
            onClick={updateBackendAndContinue}
            style={{ padding: '10px 30px' }}
            image="arrow-forward.svg"
          />
        </Row>
      ) : (
        ''
      )}
    </div>
  );
};

const OptionSelection = ({ handleContinue }) => {
  const [selected, setSelected] = useState([]);

  const updateBackendAndContinue = () => {
    let selectedIDs = selected.map((summary) => {
      return userCalendars[summary]
    })

    let commaSeparated = selectedIDs.join()
    UserService.setRelevantCalendars(commaSeparated, handleContinue)
  }

  const [userCalendars, setCalendars] = useState({})
  const [calendarOptions, setCalendarOptions] = useState([])

  useEffect(() => {
    UserService.getUserCalendars(function(res) {
      let summaries = []
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
      }

      setCalendars(summaryToId)
      setCalendarOptions(summaries)
    })
  }, [])

  return (
    <div>
      <img
        src="secondary_calendar.png"
        style={{
          marginTop: '-200px',
          marginLeft: '-113px',
          marginBottom: '-70px'
        }}
      />
      <h2>Secondary Calendar</h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          padding: '0 5%'
        }}
      >
        Which other calendars do you want Twain to take into account?
      </p>
      <Selection
        options={calendarOptions}
        selected={selected}
        onSelect={(newOpt) => {
          if (selected.includes(newOpt)) {
            setSelected(selected.filter((o) => o !== newOpt));
          } else {
            setSelected(selected.concat([newOpt]));
          }
        }}
      />
      <br />
      <Row flexEnd>
        <Button
          disabled={!selected.length}
          secondary={selected.length}
          onClick={updateBackendAndContinue}
          style={{ padding: '10px 30px' }}
          image="arrow-forward.svg"
        />
      </Row>
    </div>
  );
};

const Times = ({ handleContinue }) => {
  const hours = [...Array(48).keys()].map((e) => {
    const i = parseInt(e / 2);
    const ampm = i > 12 ? 'pm' : 'am';
    const hour = ampm === 'am' ? i : i - 12;
    const minute = e % 2 === 0 ? '00' : '30';
    return `${hour < 10 ? '0' + hour : hour}:${minute} ${ampm}`;
  });

  const [closed, setClosed] = useState(true);
  const [start, setStart] = useState('08:00 am');
  const [end, setEnd] = useState('06:00 pm');

  const updateBackendAndContinue = () => {
    const startHourString = start.substring(0, 2)
    const endHourString = end.substring(0, 2)

    let startHour = parseInt(startHourString, 10)
    let endHour = parseInt(endHourString, 10)

    if (start.substring(6, 8) == 'pm') {
      startHour += 12
    }

    if (end.substring(6, 8) == 'pm') {
      endHour += 12
    }

    UserService.setHours(startHour, endHour, handleContinue);
  }

  return (
    <div>
      <img
        src="hours_of_op.png"
        style={{
          marginTop: '-200px',
          marginLeft: '-60px',
          marginBottom: '-70px'
        }}
      />
      <h2>Hours of Operation</h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          padding: '0 5%'
        }}
      >
        From which times do you want to schedule your tasks?
      </p>
      <Row spaceBetween style={{ width: '90%', margin: '0 auto' }}>
        <p>From</p>
        <div>
          <Dropdown
            mini
            options={hours}
            selected={start}
            onSelect={(opt) => setStart(opt)}
            onClose={() => {}}
            style={{ fontSize: '9px' }}
          />
        </div>
        <p>to</p>
        <div>
          <Dropdown
            mini
            options={hours}
            selected={end}
            onSelect={(opt) => setEnd(opt)}
            onClose={(bool) => setClosed(bool)}
            style={{ fontSize: '9px' }}
          />
        </div>
      </Row>
      {closed ? (
        <Row flexEnd>
          <Button
            secondary
            onClick={updateBackendAndContinue}
            style={{ padding: '10px 30px' }}
            image="arrow-forward.svg"
          />
        </Row>
      ) : (
        ''
      )}
    </div>
  );
};

const Content = [
  { component: Intro, customButton: true },
  { component: Welcome, customButton: true },
  { component: OptionDropdown, customButton: true },
  { component: OptionSelection, customButton: true },
  { component: Times, customButton: true }
];

const Onboarding = () => {
  const [page, setPage] = useState(0);
  const history = useHistory();

  const handleContinue = () =>
    page == Content.length - 1 ? history.push('/tasklist') : setPage(page + 1);

  const getCurrent = () => {
    const Component = Content[page].component;
    return <Component handleContinue={handleContinue} />;
  };

  return (
    <Background image={page === 0 ? 'login_background.png' : 'background.png'}>
      <Centered style={{ fontFamily: 'roboto' }}>
        {getCurrent()}
        {Content[page].customButton ? (
          ''
        ) : (
          <Row flexEnd>
            <Button
              secondary
              onClick={handleContinue}
              style={{ padding: '10px 30px' }}
              image="arrow-forward.svg"
            />
          </Row>
        )}
      </Centered>
    </Background>
  );
};

export default Onboarding;
