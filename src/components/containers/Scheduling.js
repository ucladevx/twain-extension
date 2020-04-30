import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import Task from '../presentational/Task';
import { Text } from '../presentational/styled/Global';
import { FullButton } from '../presentational/styled/Button';
import { Row } from '../presentational/styled/Layout';
import Loading from '../presentational/styled/Loading';

import TaskService from '../../services/TaskService';

const SchedulingList = (props) => {
  const [scheduling, setScheduling] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedForce, setSelectedForce] = useState([]);
  const [force, setForce] = useState([]);

  const history = useHistory();

  const newDateNextHour = () => {
    const initDate = new Date();
    initDate.setTime(initDate.getTime() + 60 * 60 * 1000);
    initDate.setMinutes(0);
    return initDate.toISOString();
  };

  useEffect(() => {
    const ids = props.match.params.ids.split(',');
    const startTime = props.location.search.substring(7);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    TaskService.scheduleTasks(ids, startTime, timezone, (res) => {
      const tempScheduling = [],
        tempErrors = [];
      res.data.forEach((task) => {
        if (task.scheduled_time) {
          tempScheduling.push(task);
        } else {
          tempErrors.push({ ...task, scheduled_time: newDateNextHour() });
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
    ? `With the current scheduling settings, we couldn't find slots for ${
        errors.length
      } ${errors.length === 1 ? 'task' : 'tasks'}:`
    : '';

  const schedText = scheduling.length
    ? `We found slots for ${scheduling.length} ${
        scheduling.length === 1 ? 'task' : 'tasks'
      }:`
    : '';

  if (!scheduling.length && !errors.length) {
    return (
      <Row style={{ marginTop: '30vh' }}>
        <Loading />
      </Row>
    );
  }

  return (
    <div>
      <Text primary style={{ textAlign: 'left' }}>
        {schedText}
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
            setScheduling(scheduling.concat({ ...newTask, force: true }));
            setSelectedForce(selectedForce.concat(newTask.id));
            setErrors(errors.filter((task) => task.id !== newTask.id));
            setForce(force.concat(newTask));
          }}
          selected={false}
          failed={true}
        />
      ))}
      <Row>
        <FullButton
          onClick={() => {
            let ids = scheduling
              .map((t) => t.id)
              .concat(errors.map((t) => t.id))
              .join(',');
            history.push(`/changelist/${ids}`);
          }}
        >
          Make Changes
        </FullButton>
        <FullButton
          disabled={!selected.length && !force.length}
          primary
          onClick={() => {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const forceTasks = force.map((task) => ({
              id: task.id,
              time: task.scheduled_time
            }));
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
            : selected.length + selectedForce.length}{' '}
          {selected.length + selectedForce.length > 1 ||
          selected.length + selectedForce.length === scheduling.length
            ? 'Tasks'
            : 'Task'}
        </FullButton>
      </Row>
    </div>
  );
};

export default withRouter(SchedulingList);
