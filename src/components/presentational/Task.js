import React, { useState } from 'react';
import styled from 'styled-components';

import SpinButton from './Spin';
import { Text } from './styled/Global';
import { Row } from './styled/Layout';
import Button, { TextButton } from './styled/Button';
import Input, { TextArea } from './styled/Input';
import Icon, { Select } from './styled/Icon';

const Card = styled.div`
  max-height: ${(props) => (props.expanded ? '500px' : '45px')};
  width: 85%;
  margin: 10px auto;
  padding: 8px;
  text-align: left;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    border-color: #5187ed;
  }
`;

const DurationRow = styled(Row)`
  justify-content: space-between;
  width: 90%;
  margin: 0px 8px;
`;

const Task = ({ task }) => {
  const {
    title,
    scheduledDate,
    duration,
    dueDate,
    category,
    notes,
    created
  } = task;

  const initDuration = (duration) => {
    const hours = parseInt(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
  };

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [time, setTime] = useState(initDuration(duration));

  const setHours = (val) => setTime({ hours: val, minutes: time.minutes });
  const setMinutes = (val) => setTime({ hours: time.hours, minutes: val });

  return (
    <Card expanded={expanded}>
      <Row>
        <Select />
        <div>
          <Text primary>{title}</Text>
          <Text>{scheduledDate}</Text>
        </div>
        <Icon
          src={expanded ? 'arrow-up.svg' : 'arrow-down.svg'}
          alt={expanded ? 'Arrow-up' : 'Arrow-down'}
          onClick={() => setExpanded(!expanded)}
        />
      </Row>
      <DurationRow>
        <Text primary>Duration:</Text>
        <SpinButton
          units="hr"
          val={time.hours}
          setVal={setHours}
          min={0}
          max={23}
          hidden={!editing}
        />
        <SpinButton
          units="min"
          val={time.minutes}
          setVal={setMinutes}
          min={0}
          max={59}
          hidden={!editing}
        />
      </DurationRow>
      <Input placeholder="Due Date" value={dueDate} />
      <Input placeholder="Category" value={category} />
      <TextArea placeholder="Add notes" value={notes} />
      <Row spaceBetween>
        <Text>{created}</Text>
        <TextButton onClick={() => setEditing(!editing)}>
          {editing ? 'Save' : 'Edit'}
        </TextButton>
      </Row>
    </Card>
  );
};

export default Task;
