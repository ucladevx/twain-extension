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
  max-height: ${(props) => (props.expanded ? '500px' : '44px')};
  width: 85%;
  margin: 10px auto;
  padding: 8px;
  background-color: #fff;
  border: ${(props) =>
    props.selected ? '2px solid #5187ed' : '2px solid #ccc'};
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

const DurationRow = styled(Row)`
  justify-content: space-between;
  width: 90%;
  margin: 0 0;
`;

const Label = styled(Text)`
  visibility: ${(props) => (props.editing ? 'visible' : 'hidden')};
  height: ${(props) => (props.editing ? 'auto' : '0')};
  margin: 0;
  margin-left: 3px;
  text-align: left;
`;

const Task = ({
  task,
  completeTask,
  deleteTask,
  toggleSelect,
  selected,
  categories,
  creating = false
}) => {
  const { id, created } = task;

  const initDuration = (duration) => {
    const hours = parseInt(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
  };

  const selectMultiple = !task.scheduled;

  /* default to a collapsed, uneditable task */
  const [expanded, setExpanded] = useState(creating);
  const [editing, setEditing] = useState(creating);

  const [name, setName] = useState(task.name);
  const [time, setTime] = useState(initDuration(task.duration));
  const [due, setDue] = useState(task.dueDate);
  const [category, setCategory] = useState(task.category);
  const [notes, setNotes] = useState(task.notes);

  const setHours = (val) => setTime({ hours: val, minutes: time.minutes });
  const setMinutes = (val) => setTime({ hours: time.hours, minutes: val });

  return (
    <Card
      expanded={expanded}
      select={selectMultiple}
      onClick={
        selectMultiple && !expanded
          ? (e) => {
              toggleSelect(id);
            }
          : () => {}
      }
      selected={selected}
    >
      <Row>
        <Select
          hide={selectMultiple}
          onClick={() => {
            if (!selectMultiple) completeTask(id);
          }}
        />
        <div style={{ width: '80%', textAlign: 'left' }}>
          <Mini
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.value)}
            myDisabled={!editing}
            disabled={!editing}
          />
          {!editing ? (
            <Text>
              {!selectMultiple
                ? time.hours + ' hr ' + time.minutes + ' min'
                : task.scheduledDate}
            </Text>
          ) : (
            ''
          )}
        </div>
        <Icon
          src={
            editing ? 'close.svg' : expanded ? 'arrow-up.svg' : 'arrow-down.svg'
          }
          alt={editing ? 'Close' : expanded ? 'Up' : 'Down'}
          onClick={(e) => {
            if (editing) {
              if (!creating) {
                if (window.confirm('Delete task?')) deleteTask(id);
              } else {
                deleteTask(id);
              }
            } else {
              setExpanded(!expanded);
              e.stopPropagation();
            }
          }}
        />
      </Row>
      {editing ? (
        <DurationRow>
          <Text style={{ marginRight: '30px' }}>Duration:</Text>
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
      ) : (
        ''
      )}
      <Label editing={editing}>Due:</Label>
      <DatePicker
        placeholder="Due Date"
        value={!editing ? 'Due on ' + due : due}
        onChange={(e) => setDue(e.target.value)}
        disabled={!editing}
      />
      <Label editing={editing}>Category:</Label>
      <Dropdown
        selected={category}
        onSelect={(option) => setCategory(option)}
        options={categories}
        disabled={!editing}
      />
      <Label editing={editing}>Notes:</Label>
      <TextArea
        placeholder="Add notes"
        value={notes}
        onChange={(e) => setNotes(e.value)}
        myDisabled={!editing}
        disabled={!editing}
      />
      <Row spaceBetween>
        <Text>{editing ? 'Updated ' + created : ''}</Text>
        <TextButton onClick={() => setEditing(!editing)}>
          {editing ? 'Save' : 'Edit'}
        </TextButton>
      </Row>
    </Card>
  );
};

export default Task;
