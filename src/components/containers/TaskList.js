import React, { useState } from 'react';

import Navbar from './Nav';
import Task from '../presentational/Task';
import Button from '../presentational/styled/Button';

import TaskService from '../../services/TaskService';

const initTasks = [...Array(5).keys()].map((num) => ({
  id: num,
  title: 'Placeholder Title',
  scheduledDate: 'Tues 3:00 pm - 4:00 pm',
  duration: 90,
  dueDate: 'Tue Dec 10 2019',
  category: 'Testing',
  notes: 'Lorem ipsum',
  created: '10/10/19'
}));

const emptyTask = {
  id: 0,
  title: '',
  scheduledDate: '',
  duration: 90,
  dueDate: new Date().toDateString(),
  category: '',
  notes: '',
  created: ''
};

const categories = ['School', 'Work', 'Personal', 'Holidays'];

const TaskList = () => {
  // EXAMPLE CREATE AND RETRIEVE TASK
  
  TaskService.postTask("Homework", "Alex", 1300, function (task) {
    console.log("Task Posted")
    console.log(task)

    TaskService.getTask(1, function (task) {
      console.log("Task Retrieved")
      console.log(task)
    })
  })

  // TaskService.getTask(1, function (task) {
  //   console.log("Task Retrieved")
  //   console.log(task)
  // })

  const [tasks, setTasks] = useState(initTasks);
  const [creating, setCreating] = useState(false);

  const deleteTask = (id) =>
    setTasks(initTasks.filter((task) => task.id !== id));

  return (
    <div>
      <Navbar onAdd={() => setCreating(true)} />
      {creating ? (
        <Task
          task={emptyTask}
          deleteTask={() => setCreating(false)}
          categories={categories}
          creating
        />
      ) : (
        ''
      )}
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          categories={categories}
        />
      ))}
      <Button primary onClick={() => setCreating(true)}>
        Create Task
      </Button>
      <Button disabled>Schedule</Button>
    </div>
  );
};

export default TaskList;
