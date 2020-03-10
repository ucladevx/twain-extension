import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import { Background, Centered } from '../presentational/styled/Layout';
import { FullButton } from '../presentational/styled/Button';

const Success = (props) => {
  const history = useHistory();
  const num = parseInt(props.match.params.numsched);

  return (
    <Background image={'background.png'}>
      <Centered
        style={{
          fontFamily: 'roboto',
          backgroundColor: '#fff',
          borderRadius: '7px',
          padding: '15px 10px'
        }}
      >
        <img
          src="/primary_calendar.png"
          style={{
            width: '250px',
            marginTop: '-100px',
            marginBottom: '-50px'
          }}
        />
        <h3 style={{ textAlign: 'center', color: '#666' }}>
          Confirmation success!
        </h3>
        <p style={{ textAlign: 'center', color: '#828282' }}>
          {num} {num === 1 ? 'task' : 'tasks'} {num === 1 ? 'was' : 'were'}{' '}
          successfully scheduled onto your calendar!
        </p>
        <FullButton primary onClick={() => history.push('/tasklist')}>
          Continue
        </FullButton>
      </Centered>
    </Background>
  );
};

export default withRouter(Success);
