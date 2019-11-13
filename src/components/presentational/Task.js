import React, { useState } from 'react';
import styled from 'styled-components';

import { Text } from './styled/Global';
import { Row } from './styled/Layout';
import { TextButton } from './styled/Button';
import { TextArea, Mini } from './styled/Input';
import Icon, { Select } from './styled/Icon';
import SpinButton from './Spin';
import Dropdown, { DatePicker } from './Dropdown';

const Card = styled.div`
  max-height: ${(props) => (props.expanded ? '500px' : '45px')};
  width: 85%;
  margin: 10px auto;
  padding: 8px;
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

const Task = ({ task, deleteTask, categories, creating = false }) => {
  const { id, scheduledDate, created } = task;

  const initDuration = (duration) => {
    const hours = parseInt(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
  };

  /* default to a collapsed, uneditable task */
  const [expanded, setExpanded] = useState(creating);
  const [editing, setEditing] = useState(creating);

  const [title, setTitle] = useState(task.title);
  const [time, setTime] = useState(initDuration(task.duration));
  const [due, setDue] = useState(task.dueDate);
  const [category, setCategory] = useState(task.category);
  const [notes, setNotes] = useState(task.notes);

  const setHours = (val) => setTime({ hours: val, minutes: time.minutes });
  const setMinutes = (val) => setTime({ hours: time.hours, minutes: val });

  return (
    <Card expanded={expanded}>
      <Row>
        <Select />
        <div style={{ width: '80%', textAlign: 'left' }}>
          <Mini
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.value)}
            disabled={!editing}
          />
          <Text>{scheduledDate}</Text>
        </div>
        <Icon
          src={
            editing ? 'close.svg' : expanded ? 'arrow-up.svg' : 'arrow-down.svg'
          }
          alt={editing ? 'Close' : expanded ? 'Up' : 'Down'}
          onClick={() => {
            if (editing) {
              if (!creating) {
                if (window.confirm('Delete task?')) deleteTask(id);
              } else {
                deleteTask(id);
              }
            } else setExpanded(!expanded);
          }}
        />
      </Row>
      <DurationRow>
        <Text>Duration:</Text>
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
      <DatePicker
        placeholder="Due Date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        disabled={!editing}
      />
      <Dropdown
        selected={category}
        onSelect={(option) => setCategory(option)}
        options={categories}
        disabled={!editing}
      />
      <TextArea
        placeholder="Add notes"
        value={notes}
        onChange={(e) => setNotes(e.value)}
        disabled={!editing}
      />
      <Row spaceBetween>
        <Text>Created {created}</Text>
        <TextButton onClick={() => setEditing(!editing)}>
          {editing ? 'Save' : 'Edit'}
        </TextButton>
      </Row>
    </Card>
  );
};

export default Task;
