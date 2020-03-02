import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Task from '../presentational/Task';
import { FullButton } from '../presentational/styled/Button';

const tempScheduling = [
  {
    id: 0,
    name: 'Task 1',
    duration: 60,
    description: 'cool tasks',
    created_date: '',
    scheduled_date: new Date().toISOString(),
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
    scheduled_date: new Date().toISOString(),
    completed: false,
    scheduled: false,
    due_date: new Date().toISOString()
  }
];

const SchedulingList = (props) => {
  const [scheduling, setScheduling] = useState(tempScheduling);
  const [errors, setErrors] = useState(tempScheduling);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const ids = props.match.params.ids.split(',');
  }, []);

  const deleteTask = (id) =>
    setScheduling(scheduling.filter((task) => task.id !== id));

  const selectTask = (id) => {
    if (selected.indexOf(id) === -1) {
      setSelected(selected.concat([id]));
    } else {
      setSelected(selected.filter((num) => num !== id));
    }
  };

  return (
    <div>
      <h3>
        We were able to find times in your schedule for the following{' '}
        {scheduling.length} tasks:
      </h3>
      {scheduling.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleSelect={selectTask}
          selected={selected.indexOf(task.id) !== -1}
        />
      ))}
      <h3>
        With the current scheduling settings, we were unable to find time for
        the following tasks:
      </h3>
      {scheduling.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleSelect={selectTask}
          selected={selected.indexOf(task.id) !== -1}
        />
      ))}
      <FullButton onClick={() => {}}>
        Confirm {selected.length ? selected.length : 'All'}{' '}
        {selected.length === 1 ? 'Task' : 'Tasks'}
      </FullButton>
    </div>
  );
};

export default withRouter(SchedulingList);
