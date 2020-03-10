import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import Task from '../presentational/Task';
import { Text } from '../presentational/styled/Global';
import { FullButton } from '../presentational/styled/Button';
import { Row } from '../presentational/styled/Layout';
import TaskService from '../../services/TaskService';

const dummyScheduling = [
  {
    id: 0,
    name: 'Task 1',
    duration: 60,
    description: 'cool tasks',
    created_date: '',
    scheduled_time: new Date().toISOString(),
    completed: false,
    scheduled: false,
    due_date: new Date().toISOString()
  },
  {
    id: 1,
    name: 'Task 2',
    duration: 90,
    description: 'a task',
    created_date: '',
    scheduled_time: new Date().toISOString(),
    completed: false,
    scheduled: false,
    due_date: new Date().toISOString()
  }
];

const dummyErrors = [
  {
    id: 3,
    name: 'Task 3',
    duration: 60,
    description: 'cool tasks',
    created_date: '',
    scheduled_time: new Date().toISOString(),
    completed: false,
    scheduled: false,
    due_date: new Date().toISOString()
  }
];

const SchedulingList = (props) => {
  const [scheduling, setScheduling] = useState(dummyScheduling);
  const [errors, setErrors] = useState(dummyErrors);
  const [selected, setSelected] = useState(dummyScheduling.map((e) => e.id));
  const [selectedForce, setSelectedForce] = useState([]);
  const [force, setForce] = useState([]);

  const history = useHistory();

  useEffect(() => {
    // console.log(props.match, props.location);
    const ids = props.match.params.ids.split(',');
    const startTime = props.location.search.substring(7);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(ids, startTime, timezone);
    TaskService.scheduleTasks(ids, startTime, timezone, (res) => {
      console.log(res);
      const tempScheduling = [],
        tempErrors = [];
      res.data.forEach((task) => {
        if (task.scheduled) {
          tempScheduling.push(task);
        } else {
          tempErrors.push(task);
        }
      });
      setScheduling(tempScheduling);
      setErrors(tempErrors);
      setSelected(tempScheduling.map((e) => e.id));
    });
  }, []);

  const deleteTask = (id) =>
    setScheduling(scheduling.filter((task) => task.id !== id));

  const selectTask = (force = false) => (id) => {
    const thisSelected = force ? selectedForce : selected;
    const thisSetSelected = force ? setSelectedForce : setSelected;
    if (thisSelected.indexOf(id) === -1) {
      thisSetSelected(thisSelected.concat([id]));
    } else {
      thisSetSelected(thisSelected.filter((num) => num !== id));
    }
  };

  const errText = errors.length
    ? `With the current scheduling settings, we couldn't find slots for ${errors.length} tasks:`
    : '';

  return (
    <div>
      <Text primary style={{ textAlign: 'left' }}>
        We found slots for {scheduling.length} tasks:
      </Text>
      {scheduling.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleSelect={selectTask(task.force)}
          selected={
            selected.indexOf(task.id) !== -1 ||
            selectedForce.indexOf(task.id) !== -1
          }
          scheduling={true}
        />
      ))}
      <Text primary style={{ textAlign: 'left' }}>
        {errText}
      </Text>
      {errors.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleSelect={() => {}}
          updateTask={(newTask) => {
            console.log(newTask);
            // const newArr = scheduling.map((task) =>
            //   task.id === newTask.id ? newTask : task
            // );
            // console.log(newArr);
            setScheduling(scheduling.concat({ ...newTask, force: true }));
            setSelectedForce(selectedForce.concat(newTask.id));
            setErrors(errors.filter((task) => task.id !== newTask.id));
            setForce(force.concat(newTask));

            console.log(scheduling, errors, force);
          }}
          selected={false}
          failed={true}
        />
      ))}
      <Row>
        <FullButton>Make Changes</FullButton>
        <FullButton
          onClick={() => {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const forceTasks = force.map((task) => ({
              id: task.id,
              time: task.scheduled_time
            }));
            console.log(selected, forceTasks, timezone);
            TaskService.confirmTasks(selected, forceTasks, timezone, (res) => {
              history.push('/success/' + res.data.length);
            });
          }}
        >
          Confirm{' '}
          {selected.length + selectedForce.length === scheduling.length
            ? 'All'
            : selected.length + selectedForce.length === 0
            ? 'No'
            : selected.length + selectedForce.length}
          {selected.length + selectedForce.length === 1 ? 'Task' : 'Tasks'}
        </FullButton>
      </Row>
    </div>
  );
};

export default withRouter(SchedulingList);
