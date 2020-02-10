import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button, { FullButton } from '../presentational/styled/Button';
import Dropdown, { Selection, TimePicker } from '../presentational/Dropdown';
import { Row } from '../presentational/styled/Layout';

import { Background, Centered } from '../presentational/styled/Layout';

const Intro = ({ handleContinue }) => (
  <div>
    <h2>Scheduling your day so you don't have to.</h2>
    <p>
      We optimize your free time, allowing you to be your most productive self.
    </p>
    <FullButton secondary onClick={handleContinue}>
      Continue with Google
    </FullButton>
  </div>
);

const Welcome = ({ handleContinue }) => (
  <div>
    <h1>Welcome to Twain!</h1>
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
      <p>Which calendar do you want Twain to schedule your tasks in?</p>
      <Dropdown
        options={options}
        selected={selected ? selected : 'Default Calendar Name'}
        onSelect={(option) => setSelected(option)}
        onClose={(bool) => setClosed(bool)}
      />
      {closed ? (
        <Button
          disabled={!selected}
          secondary={selected}
          onClick={handleContinue}
          style={{ padding: '10px 30px', marginLeft: '70%' }}
        >
          <img src="arrow-right.svg" />
          Next
        </Button>
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
      <p>Which other calendars do you want Twain to take into account?</p>
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
      <br />
      <Button
        disabled={!selected.length}
        secondary={selected.length}
        onClick={handleContinue}
        style={{ padding: '10px 30px', marginLeft: '70%' }}
      >
        <img src="arrow-right.svg" />
        Next
      </Button>
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

  const [start, setStart] = useState('08:00 am');
  const [end, setEnd] = useState('06:00 pm');

  return (
    <div>
      <p>From which times do you want to schedule your tasks?</p>
      <Row spaceBetween>
        From
        <div style={{ width: '33%' }}>
          <Dropdown
            mini
            options={hours}
            selected={start}
            onSelect={(opt) => setStart(opt)}
            onClose={() => {}}
          />
        </div>
        to
        <div style={{ width: '33%' }}>
          <Dropdown
            mini
            options={hours}
            selected={end}
            onSelect={(opt) => setEnd(opt)}
            onClose={() => {}}
          />
        </div>
      </Row>
    </div>
  );
};

const Content = [
  { component: Intro, customButton: true },
  { component: Welcome, customButton: true },
  { component: OptionDropdown, customButton: true },
  { component: OptionSelection, customButton: true },
  { component: Times, customButton: false }
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
    <Background>
      <Centered>
        {getCurrent()}
        {Content[page].customButton ? (
          ''
        ) : (
          <Button
            secondary
            onClick={handleContinue}
            style={{ padding: '10px 30px', marginLeft: '70%' }}
          >
            <img src="arrow-right.svg" />
            Next
          </Button>
        )}
      </Centered>
    </Background>
  );
};

export default Onboarding;
