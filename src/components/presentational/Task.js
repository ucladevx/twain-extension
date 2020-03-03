import React, { useState } from 'react';
import styled from 'styled-components';

import { Text } from './styled/Global';
import { Row } from './styled/Layout';
import { TextButton } from './styled/Button';
import { TextArea, Mini } from './styled/Input';
import Icon, { Select } from './styled/Icon';
import SpinButton from './Spin';
import Dropdown, { DateTimePicker } from './Dropdown';

const Card = styled.div`
  max-height: ${(props) => (props.expanded ? '500px' : '50px')};
  width: 85%;
  margin: 10px auto;
  padding: 8px;
  background-color: #fff;
  border: ${(props) =>
    props.selected ? '2px solid #5187ed' : '2px solid #ccc'};
  border-radius: 10px;
  overflow: ${(props) => (props.expanded ? 'visible' : 'hidden')};
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.2);
    cursor: ${(props) => (props.expanded ? 'default' : 'pointer')};
  }
`;

const DurationRow = styled(Row)`
  justify-content: space-between;
  width: calc(90% + 16px);
  margin: 0 auto;
  // margin-right: 5px;
`;

const Label = styled(Text)`
  visibility: ${(props) => (props.editing ? 'visible' : 'hidden')};
  height: ${(props) => (props.editing ? 'auto' : '0')};
  width: calc(90% + 16px);
  margin: 0 auto;
  // margin-left: 3px;
  text-align: left;
`;

const Task = ({
  task,
  completeTask,
  deleteTask,
  createTask,
  toggleSelect,
  selected,
  categories,
  creating = false
}) => {
  const {
    id,
    created_time,
    completed,
    completed_time,
    scheduled,
    scheduled_time,
    start_time,
    end_time
  } = task;

  const initDuration = (duration) => {
    const hours = parseInt(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
  };

  /* default to a collapsed, uneditable task */
  const [expanded, setExpanded] = useState(creating);
  const [editing, setEditing] = useState(creating);

  const [name, setName] = useState(task.name);
  const [time, setTime] = useState(initDuration(task.duration));
  const [due, setDue] = useState(task.due_date);
  const [dueTime, setDueTime] = useState({ hours: 15, minutes: 30 });
  const [category, setCategory] = useState(task.category);
  const [description, setDescription] = useState(task.description);

  const setHours = (val) => setTime({ hours: val, minutes: time.minutes });
  const setMinutes = (val) => setTime({ hours: time.hours, minutes: val });

  const setDueHours = (val) =>
    setDueTime({ hours: val, minutes: dueTime.minutes });
  const setDueMinutes = (val) =>
    setDueTime({ hours: dueTime.hours, minutes: val });

  const makeTaskObj = () => {
    const obj = {
      name,
      description,
      duration: parseInt(time.hours) * 60 + parseInt(time.minutes),
      due_date: new Date(due).toISOString()
    };
    return obj;
  };

  const categoriesDropdown = (
    <>
      <Label editing={editing}>Category:</Label>
      <Dropdown
        selected={category}
        onSelect={(option) => setCategory(option)}
        options={categories}
        disabled={!editing}
      />
    </>
  );

  const formatScheduledDate = () => {
    const start_time = new Date(task.start_time);
    const time = start_time.toLocaleTimeString('en-US', {
      timeStyle: 'short'
    });
    const date = start_time.toDateString();
    return `${time} ${date}`;
  };

  return (
    <Card
      expanded={expanded}
      select={!scheduled}
      onClick={
        !scheduled && !expanded
          ? () => {
              toggleSelect(id);
            }
          : () => {}
      }
      selected={selected}
    >
      <Row style={{ height: '50px', marginBottom: '8px' }}>
        <Select
          hide={!scheduled}
          onClick={() => {
            if (scheduled) {
              completeTask(id);
            }
          }}
        />
        <div
          style={{ width: '70%', textAlign: 'left', margin: '0 auto 0 8px' }}
        >
          <Mini
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            myDisabled={!editing}
            disabled={!editing}
            pointer={!editing && !expanded}
            text={editing && expanded}
          />
          {!editing ? (
            <Text pointer={!editing && !expanded}>
              {!scheduled
                ? time.hours + ' hr ' + time.minutes + ' min'
                : `${new Date(task.start_time).toLocaleTimeString('en-US', {
                    timeStyle: 'short'
                  })} ${new Date(task.start_time).toDateString()}`}
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
          <Text style={{ marginLeft: '0', marginRight: '10px' }}>
            Duration:
          </Text>
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
      <DateTimePicker
        placeholder="Due Date"
        value={new Date(due).toISOString()}
        onChange={(e) => {
          setDue(e.target.value);
        }}
        disabled={!editing}
      />
      <Label editing={editing}>Description:</Label>
      <TextArea
        placeholder="Add Description."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        myDisabled={!editing}
        disabled={!editing}
      />
      <Row spaceBetween style={{ width: 'calc(90% + 16px)', margin: '0 auto' }}>
        <Text>
          {editing && created_time
            ? 'Created ' + new Date(created_time).toDateString()
            : ''}
        </Text>
        <TextButton
          tabIndex="-1"
          onClick={() =>
            creating ? createTask(makeTaskObj()) : setEditing(!editing)
          }
        >
          {creating ? 'Create' : editing ? 'Save' : 'Edit'}
        </TextButton>
      </Row>
    </Card>
  );
};

export default Task;
