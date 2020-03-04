import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button, { FullButton } from '../presentational/styled/Button';
import Dropdown, { Selection, TimePicker } from '../presentational/Dropdown';
import { Row } from '../presentational/styled/Layout';
import { Background, Centered } from '../presentational/styled/Layout';

import AuthService from '../../services/AuthService';

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
        <Row spaceEvenly style={{ marginTop: '-4px' }}>
          <img src="google.svg" style={{ width: '20px', height: '20px' }} />
          <p>Continue with Google</p>
        </Row>
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

  const options = ['lorem', 'ipsum', 'here'];

  return (
    <div>
      <img
        src="primary_calendar.png"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>
        Your Primary Calendar
      </h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          width: '90%',
          margin: '15px auto'
        }}
      >
        Which calendar do you want Twain to schedule your tasks in?
      </p>
      <Dropdown
        options={options}
        selected={selected ? selected : 'Default Calendar Name'}
        onSelect={(option) => setSelected(option)}
        onClose={(bool) => setClosed(bool)}
      />
      {closed ? (
        <Row
          flexEnd
          style={{
            width: 'calc(90% + 20px)',
            margin: '-10px auto'
          }}
        >
          <Button
            disabled={!selected}
            secondary={selected}
            onClick={handleContinue}
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

  const options = ['more', 'lorem', 'ipsum', 'here'];

  return (
    <div>
      <img
        src="secondary_calendar.png"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>Secondary Calendar</h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          width: '90%',
          margin: '15px auto'
        }}
      >
        Which other calendars do you want Twain to take into account?
      </p>
      <Selection
        options={options}
        selected={selected}
        onSelect={(newOpt) => {
          if (selected.includes(newOpt)) {
            setSelected(selected.filter((o) => o !== newOpt));
          } else {
            setSelected(selected.concat([newOpt]));
          }
        }}
      />
      <Row
        flexEnd
        style={{
          width: 'calc(90% + 20px)',
          margin: '-10px auto'
        }}
      >
        <Button
          disabled={!selected.length}
          secondary={selected.length}
          onClick={handleContinue}
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

  return (
    <div>
      <img
        src="hours_of_op.png"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>Hours of Operation</h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          width: '90%',
          margin: '15px auto'
        }}
      >
        From which times do you want to schedule your tasks?
      </p>
      <Row spaceBetween style={{ width: 'calc(90%)', margin: '-10px auto' }}>
        <p style={{ marginRight: '10px' }}>From</p>
        <Dropdown
          mini
          options={hours}
          selected={start}
          onSelect={(opt) => setStart(opt)}
          onClose={() => {}}
        />
        <p style={{ margin: '14px 10px' }}>to</p>
        <Dropdown
          mini
          options={hours}
          selected={end}
          onSelect={(opt) => setEnd(opt)}
          onClose={(bool) => setClosed(bool)}
        />
      </Row>
      {closed ? (
        <Row
          flexEnd
          style={{
            width: 'calc(90% + 20px)',
            margin: '-10px auto'
          }}
        >
          <Button
            secondary
            onClick={handleContinue}
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
