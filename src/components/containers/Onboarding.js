import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FullButton } from '../presentational/styled/Button';

const Intro = ({ handleContinue }) => (
  <div>
    <h1>Scheduling your day so you don't have to</h1>
    <p>
      We optimize your free time, allowing you to be your most productive self.
    </p>
    <FullButton primary onClick={handleContinue}>
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
    <FullButton primary onClick={handleContinue}>
      Let's get started!
    </FullButton>
  </div>
);

const OptionPage = () => (
  <div>
    <p>Which calendar do you want Twain to schedule your tasks in?</p>
    <div>temp temp temp</div>
  </div>
);

const Content = [
  { component: Intro, customButton: true },
  { component: Welcome, customButton: true },
  { component: OptionPage, customButton: false }
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
    <div>
      {getCurrent()}
      {Content[page].customButton ? (
        ''
      ) : (
        <FullButton primary onClick={handleContinue}>
          continue
        </FullButton>
      )}
    </div>
  );
};

export default Onboarding;
