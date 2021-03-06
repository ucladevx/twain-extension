import React, { useState } from 'react';
import styled from 'styled-components';

import { Text } from './styled/Global';
import { Row } from './styled/Layout';
import { TextButton } from './styled/Button';
import { TextArea, Mini } from './styled/Input';
import Icon, { Select } from './styled/Icon';

import SpinButton from './Spin';
import { DateTimePicker } from './Dropdown';

const Card = styled.div`
  max-height: ${(props) => (props.expanded ? '500px' : '50px')};
  width: 85%;
  margin: 10px auto;
  padding: 8px;
  background-color: ${(props) => (props.selected ? '#edf3fb' : '#fff')};
  border: ${(props) =>
    props.selected ? '2px solid #5187ed' : '2px solid #ccc'};
  border-radius: 10px;
  overflow: ${(props) => (props.expanded ? 'visible' : 'hidden')};
  transition: all 0.3s, max-height 0s;

  &:hover {
    box-shadow: ${(props) =>
      props.failed ? '' : '0px 3px 6px 0 rgba(0, 0, 0, 0.2)'};
    cursor: ${(props) =>
      props.expanded || props.failed ? 'default' : 'pointer'};
  }
`;

const DurationRow = styled(Row)`
  justify-content: space-between;
  width: calc(90% + 16px);
  margin: 0 auto;
`;

const Label = styled(Text)`
  visibility: ${(props) => (props.editing ? 'visible' : 'hidden')};
  height: ${(props) => (props.editing ? 'auto' : '0')};
  width: calc(90% + 16px);
  margin: 0 auto;
  text-align: left;
`;

const Button = styled.p`
  border-radius: 5px;
  background-color: #4f4f4f;
  color: #fff;
  font-size: 11px;
  padding: 10px 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Task = ({
  task,
  completeTask,
  deleteTask,
  createTask,
  editTask,
  toggleSelect,
  selected,
  updateTask = () => {},
  creating = false,
  scheduling = false,
  failed = false
}) => {
  const {
    id,
    created_time,
    completed,
    completed_time,
    duration,
    scheduled,
    scheduled_time
  } = task;

  const initDuration = (duration) => {
    const hours = parseInt(duration / 60);
    const minutes = duration % 60;
    return { hours, minutes };
  };

  /* default to a collapsed, uneditable task */
  const [expanded, setExpanded] = useState(creating);
  const [editing, setEditing] = useState(creating);
  const [deleting, setDeleting] = useState(false);

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [time, setTime] = useState(initDuration(task.duration));
  const [due, setDue] = useState(task.due_date);
  const [sched, setSched] = useState(task.scheduled_time);
  
  const setHours = (val) => setTime({ hours: val, minutes: time.minutes });
  const setMinutes = (val) => setTime({ hours: time.hours, minutes: val });

  const makeTaskObj = () => {
    const obj = {
      name,
      description,
      duration: parseInt(time.hours) * 60 + parseInt(time.minutes),
      due_date: new Date(due).toISOString()
    };
    return obj;
  };

  const makeEditedTaskObj = () => {
    const newDuration = parseInt(time.hours) * 60 + parseInt(time.minutes);
    const obj = {
      ...(task.name !== name && {name}),
      ...(task.description !== description && {description}),
      ...(task.duration !== newDuration && {duration: newDuration}),
      ...(task.due_date !== due && {due_date: new Date(due).toISOString()})
    };
    return obj;
  };

  const formatScheduledDate = () => {
    let start_time = new Date(scheduled_time);
    let end_time = new Date(start_time.getTime() + 1000 * 60 * duration);
    if (task.start_time && task.end_time) {
      start_time = new Date(task.start_time);
      end_time = new Date(task.end_time);
    }
    const time = start_time.toLocaleTimeString('en-US', {
      timeStyle: 'short'
    });
    const end = end_time.toLocaleTimeString('en-US', {
      timeStyle: 'short'
    });
    const date = start_time.toDateString();
    let datetext;
    if (start_time.getDate() < new Date().getDate() + 7) {
      datetext = date.substring(0, 3);
    } else {
      datetext = date.substring(4, 10);
    }
    return `${time.substring(0, 5)}-${end} ${datetext}`;
  };

  let content = (
    <>
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
      <Label editing={true}>Due:</Label>
      <DateTimePicker
        placeholder="Due Date"
        value={new Date(due).toISOString()}
        onChange={(e) => setDue(e.target.value)}
        disabled={!editing}
      />
      {!description.length && !editing ? (
        ''
      ) : (
        <>
          <Label editing={editing}>Description:</Label>
          <TextArea
            placeholder="Add Description."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            myDisabled={!editing}
            disabled={!editing}
          />
        </>
      )}
      <Row spaceBetween style={{ width: 'calc(90% + 16px)', margin: '0 auto' }}>
        <Text>
          {editing && created_time
            ? 'Created ' + new Date(created_time).toDateString()
            : completed
            ? 'Completed ' + new Date(completed_time).toDateString()
            : ''}
        </Text>
        {!completed ? (
          <TextButton
            tabIndex="-1"
            onClick={(e) => {
              if (creating) {
                createTask(makeTaskObj());
              } else {
                setEditing(!editing);
                let editedTask = makeEditedTaskObj();
                if (Object.keys(editedTask).length !== 0) 
                  editTask(id, editedTask);
              }
              e.stopPropagation();
            }}
          >
            {creating ? 'Create' : editing ? 'Save' : 'Edit'}
          </TextButton>
        ) : (
          ''
        )}
      </Row>
    </>
  );

  if (failed) {
    content = (
      <>
        <Label editing={true}>Start Date and Time:</Label>
        <DateTimePicker
          placeholder="Start Date and Time"
          value={new Date(sched).toISOString()}
          onChange={(e) => {
            setSched(e.target.value);
          }}
          disabled={false}
        />
        <Row
          spaceBetween
          style={{
            width: 'calc(90% + 16px)',
            margin: '0 auto',
            marginTop: '10px'
          }}
        >
          <Text></Text>
          <TextButton
            tabIndex="-1"
            onClick={() => {
              updateTask({
                ...task,
                scheduled_time: new Date(sched).toISOString()
              });
            }}
          >
            Schedule
          </TextButton>
        </Row>
      </>
    );
  }

  return (
    <Card
      failed={failed || scheduled}
      expanded={expanded}
      select={!scheduled}
      onClick={
        !scheduled && !editing
          ? () => {
              toggleSelect(id);
            }
          : () => {deleting && setDeleting(false)}
      }
      selected={selected}
    >
      <Row style={{ height: '50px', marginBottom: '8px' }}>
        <Select
          image="/background.png"
          style={{ flex: completed || !scheduled ? '0 0 0' : '0 0 25px' }}
          hide={completed || !scheduled}
          onClick={() => {
            if (scheduled) {
              completeTask(id);
            }
          }}
        />
        <div
          style={{
            width: failed ? '50%' : '80%',
            textAlign: 'left',
            margin: '0 auto 0 8px'
          }}
        >
          <Mini
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            myDisabled={!editing}
            disabled={!editing}
            pointer={!editing && !expanded && !failed && !scheduled}
            text={editing && expanded}
          />
          {!editing ? (
            <Text pointer={!editing && !expanded && !failed && !scheduled}>
              {!scheduled && !scheduling
                ? time.hours + ' hr ' + time.minutes + ' min'
                : formatScheduledDate()}
            </Text>
          ) : (
            ''
          )}
        </div>
        {!scheduling && !failed ? (
          <Icon delete = {deleting}
            src={
              editing && !deleting
                ? '/close.svg'
                : deleting
                ? '/redclose.svg'
                : expanded
                ? '/arrow-up.svg'
                : failed
                ? ''
                : '/arrow-down.svg'
            }
            alt={editing ? 'Close' : expanded ? 'Up' : 'Down'}
            onClick={(e) => {
              if (editing) {
                if (!creating && !deleting) {
                  setDeleting(true);
                } else {
                  deleteTask(id);
                }
              } else {
                setExpanded(!expanded);
                e.stopPropagation();
              }
            }}
          />
        ) : !scheduling && !expanded ? (
          <Button onClick={() => setExpanded(true)}>Force Schedule</Button>
        ) : !scheduling ? (
          <Icon src="/close.svg" onClick={() => setExpanded(false)} />
        ) : (
          ''
        )}
      </Row>
      {content}
    </Card>
  );
};

export default Task;
