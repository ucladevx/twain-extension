import React, { useState } from 'react';

import Navbar from './Nav';
import Task from '../presentational/Task';
import { FullButton } from '../presentational/styled/Button';
import { TaskSection } from '../presentational/Dropdown';

import TaskService from '../../services/TaskService';

const initTasks = [...Array(5).keys()].map((num) => ({
  id: num,
  name: 'Placeholder Title',
  scheduledDate: 'Tues 3:00 pm - 4:00 pm',
  duration: 90,
  dueDate: 'Tue Dec 10 2019',
  category: 'Testing',
  notes: 'Lorem ipsum',
  created: '10/10/19',
  scheduled: false
}));

const scheduledTasks = initTasks.map((task) => ({ ...task, scheduled: true }));

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
  let time_now = new Date().toISOString()
  TaskService.postTask("Homework", "Alex", 1300, time_now, function (task) {
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
  const [schedTasks, setSchedTasks] = useState(scheduledTasks);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState([]);

  const selectTask = (id) => {
    if (selected.indexOf(id) === -1) setSelected(selected.concat([id]));
    else setSelected(selected.filter((num) => num !== id));
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const completeTask = (id) =>
    setSchedTasks(schedTasks.filter((task) => task.id !== id));

  const deleteSchedTask = (id) =>
    setSchedTasks(schedTasks.filter((task) => task.id !== id));

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
      <TaskSection title="Not yet scheduled">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            completeTask={deleteTask}
            deleteTask={deleteTask}
            toggleSelect={selectTask}
            selected={selected.indexOf(task.id) !== -1}
            categories={categories}
          />
        ))}
      </TaskSection>
      <FullButton primary>
        Schedule {selected.length ? selected.length : 'All'} Tasks
      </FullButton>
      <TaskSection title="Scheduled" defaultClosed={true}>
        {schedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteSchedTask}
            categories={categories}
          />
        ))}
      </TaskSection>
      <FullButton secondary onClick={() => setCreating(true)}>
        Create Task
      </FullButton>
    </div>
  );
};

export default TaskList;
