import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button, {
  FullButton,
  SkipButton
} from '../presentational/styled/Button';
import Dropdown, { Selection } from '../presentational/Dropdown';
import { Row } from '../presentational/styled/Layout';
import { Background, Centered } from '../presentational/styled/Layout';

import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import StorageService from '../../services/StorageService';

const Intro = ({ handleContinue }) => {
  const history = useHistory();

  const getUser = async () => {
    AuthService.signIn(function(user) {
      if (!user) {
        StorageService.setLoggedIn(true);
        history.push('/tasklist');
      }
    });
  };

  return (
    <div>
      <img
        src="logo.png"
        alt="logo"
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
          <img
            src="google.svg"
            alt="google"
            style={{ width: '20px', height: '20px' }}
          />
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
      alt="welcome-to-twain"
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
    UserService.setPrimaryCalendar(userCalendars[selected], handleContinue);
  };

  const [userCalendars, setCalendars] = useState({});
  const [calendarOptions, setCalendarOptions] = useState([]);

  useEffect(() => {
    UserService.getUserCalendars(function(res) {
      let summaries = [];
      let summaryToId = {};

      for (let i = 0; i < res.length; i++) {
        let cal = res[i];
        summaries.push(cal['summary']);
        summaryToId[cal['summary']] = cal['id'];
      }

      setCalendars(summaryToId);
      setCalendarOptions(summaries);
    });
  }, []);

  return (
    <div>
      <img
        src="primary_calendar.png"
        alt="primary-calendar"
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
        options={calendarOptions}
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
      return userCalendars[summary];
    });

    let commaSeparated = selectedIDs.join();
    UserService.setRelevantCalendars(commaSeparated, handleContinue);
  };

  const [userCalendars, setCalendars] = useState({});
  const [calendarOptions, setCalendarOptions] = useState([]);

  useEffect(() => {
    UserService.getUserCalendars(function(res) {
      let summaries = [];
      let summaryToId = {};

      for (let i = 0; i < res.length; i++) {
        let cal = res[i];
        let currSummary = cal['summary'];
        summaries.push(currSummary);

        // In case users have multiple calendars with the same summary
        if (currSummary in summaryToId) {
          summaryToId[currSummary] = summaryToId[currSummary] + ',' + cal['id'];
        } else {
          summaryToId[currSummary] = cal['id'];
        }
      }

      setCalendars(summaryToId);
      setCalendarOptions(summaries);
    });
  }, []);

  return (
    <div>
      <img
        src="secondary_calendar.png"
        alt="secondary-calendar"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>
        Other Relevant Calendars
      </h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          width: '90%',
          margin: '15px auto'
        }}
      >
        Which other calendars do you want Twain to take into account when
        scheduling?
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
          onClick={updateBackendAndContinue}
          style={{ padding: '10px 30px' }}
          image="arrow-forward.svg"
        />
      </Row>
    </div>
  );
};

const Times = ({ handleContinue }) => {
  const hours = [...Array(48).keys()].map((n) => {
    let e = Math.floor(n / 2);
    let ampm = e > 12 ? 'pm' : 'am';
    let hour = ampm === 'am' ? e : e - 12;
    let min = '30';
    if (e === 0) {
      hour = 12;
    }
    if (e === 12) {
      ampm = 'pm';
    }
    if ((n / 2) % 1 === 0) {
      min = '00';
    }
    return { key: n, text: `${hour < 10 ? '0' + hour : hour}:${min} ${ampm}` };
  });

  const [closed, setClosed] = useState(true);
  const [start, setStart] = useState({ key: 16, text: '08:00 am' });
  const [end, setEnd] = useState({ key: 36, text: '06:00 pm' });

  const updateBackendAndContinue = () => {
    UserService.setHours(start.text, end.text, handleContinue);
  };

  return (
    <div>
      <img
        src="hours_of_op.png"
        alt="hours-of-op"
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
        <p style={{ marginRight: '5px' }}>From</p>
        <Dropdown
          mini
          options={hours}
          selected={start.text}
          onSelect={(opt) => {
            setStart(opt);
          }}
          onClose={() => {}}
        />
        <p style={{ margin: '14px 5px' }}>to</p>
        <Dropdown
          mini
          options={hours.map((hr) =>
            hr.key <= start.key ? { ...hr, disabled: true } : hr
          )}
          selected={end.text}
          onSelect={(opt) => {
            setEnd(opt);
          }}
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

const WeekendSetting = ({ handleContinue }) => {
  const display = ['Yes', 'No'];
  const [selected, setSelected] = useState(null);

  const updateBackendAndContinue = () => {
    UserService.setWeekendOption(selected === 'Yes', handleContinue);
  };

  return (
    <div>
      <img
        src="weekend.png"
        alt="weekend"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>Weekend Settings</h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          width: '90%',
          margin: '15px auto'
        }}
      >
        Do you want to have twain schedule your tasks over the weekend?
      </p>
      <Dropdown
        options={display}
        selected={selected ? selected : 'Yes'}
        onSelect={(option) => setSelected(option)}
      />

      <Row
        flexEnd
        style={{
          width: 'calc(90% + 20px)',
          margin: '-10px auto'
        }}
      >
        <Button
          secondary
          onClick={updateBackendAndContinue}
          style={{ padding: '10px 30px' }}
          image="arrow-forward.svg"
        />
      </Row>
    </div>
  );
};

const WalkThroughPrompt = ({ handleContinue }) => {
  const history = useHistory();

  return (
    <div>
      <h1 style={{ marginTop: '20vh' }}>Welcome to Twain!</h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.7)',
          width: '90%',
          margin: '15px auto'
        }}
      >
        Let's show you how you can view, create, and schedule tasks.
      </p>
      <FullButton
        onClick={() => history.push('/walkthrough')}
        secondary
        style={{ color: '#5187ed' }}
      >
        Start WalkThrough
      </FullButton>
      <SkipButton onClick={handleContinue}>Skip</SkipButton>
    </div>
  );
};

const Content = [
  { component: Intro, customButton: true },
  { component: Welcome, customButton: true },
  { component: OptionDropdown, customButton: true },
  { component: OptionSelection, customButton: true },
  { component: Times, customButton: true },
  { component: WeekendSetting, customButton: true },
  { component: WalkThroughPrompt, customButton: true }
];

const Onboarding = () => {
  const [page, setPage] = useState(0);
  const history = useHistory();

  const handleContinue = () => {
    if (page === Content.length - 1) {
      StorageService.setLoggedIn(true);
      history.push('/tasklist');
    } else {
      setPage(page + 1);
    }
  };

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
