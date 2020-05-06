import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button, {FullButton,NextButton} from '../presentational/styled/Button';
import { Background, WalkthroughCentered } from '../presentational/styled/Layout';

const CreateTaskList = ({handleContinue}) =>{
  return(
    <div>
      <img
        src="personalizetask.gif"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>
      Create Your Task List
      </h2>

      <p
      style={{
        width: '90%',
        margin: '15px auto',
        textAlign: 'center'
      }}
      >Start by creating a to-do list of all your upcomming tasks.
      Click <strong>"New Task"</strong> to begin creating
      </p>

      <NextButton
      onClick = {handleContinue}
      >Next
      </NextButton>
    </div>
  );
}

const PersonalizeTask = ({handleContinue}) => {
  return(
    <div>
      <img
        src="personalizetask.gif"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>
      Personalize Your Task
      </h2>

      <p
      style={{
        width: '90%',
        margin: '15px auto',
        textAlign: 'center'
      }}
      >Fill in your task information including its estimated duration and due date
      for efficient scheduling.
      </p>

      <NextButton
      onClick = {handleContinue}
      >Next
      </NextButton>
    </div>
  );
}

const ScheduleTask = ({handleContinue}) => {
  return(
    <div>
      <img
        src="personalizetask.gif"
        style={{
          width: '300px',
          marginLeft: 'calc(-1 * (10%))',
          marginTop: '-65%',
          marginBottom: '-20%'
        }}
      />
      <h2 style={{ width: '90%', margin: '15px auto' }}>
      Schedule Your Task
      </h2>

      <p
      style={{
        width: '90%',
        margin: '15px auto',
        textAlign: 'center'
      }}
      >Now that you have created your task, it will innitially appear under
      <strong>"Not yet scheduled."</strong><br />
      Once you're ready to have twain schedule your task, select the tasks you want
      scheduled and click <strong>"Scheduled."</strong>
      </p>

      <NextButton
      onClick = {handleContinue}
      >Next
      </NextButton>
    </div>
  );
}

const Content = [
  {component: CreateTaskList},
  {component: PersonalizeTask},
  {component: ScheduleTask}
];

const Walkthrough = ()=>{
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
      <WalkthroughCentered>
        {getCurrent()}
        {Content[page].customButton}
      </WalkthroughCentered>
    </Background>
  );
}

export default Walkthrough
