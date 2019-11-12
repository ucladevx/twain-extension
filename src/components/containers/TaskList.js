import React, { useState } from 'react';

import Task from '../presentational/Task';
import Button from '../presentational/styled/Button';
import Navbar from './Nav';

const initTasks = [...Array(5).keys()].map((num) => ({
  id: num,
  title: 'Placeholder Title',
  scheduledDate: 'Tues 3:10 pm - 4:00 pm',
  duration: 90,
  dueDate: '11/3/19',
  category: 'Testing',
  notes: 'Lorem ipsum',
  created: '10/10/19'
}));

const emptyTask = {
  id: 0,
  title: '',
  scheduledDate: '',
  duration: 90,
  dueDate: '',
  category: '',
  notes: '',
  created: ''
};

const categories = [];

const TaskList = () => {
  const [tasks, setTasks] = useState(initTasks);
  const [creating, setCreating] = useState(false);

  const deleteTask = (id) =>
    setTasks(initTasks.filter((task) => task.id != id));

  return (
    <div>
      <Navbar onAdd={() => setCreating(true)} />
      {creating ? (
        <Task task={emptyTask} deleteTask={() => setCreating(false)} creating />
      ) : (
        ''
      )}
      {tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} />
      ))}
      <Button primary onClick={() => setCreating(true)}>
        Create Task
      </Button>
      <Button disabled>Schedule</Button>
    </div>
  );
};

export default TaskList;
