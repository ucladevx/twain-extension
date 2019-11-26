import React, { useState, useEffect } from 'react';

import Navbar from './Nav';
import Task from '../presentational/Task';
import { FullButton } from '../presentational/styled/Button';
import { TaskSection } from '../presentational/Dropdown';

import TaskService from '../../services/TaskService';

const emptyTask = {
  id: 0,
  name: '',
  duration: 90,
  description: '',
  category: '',
  created: '',
  scheduledDate: '',
  dueDate: new Date().toDateString()
};

const categories = ['School', 'Work', 'Personal', 'Holidays']; // temporary

const TaskList = () => {
  /* Sample TaskService use: */
  /* let time_now = new Date().toISOString()
  TaskService.postTask("Homework", "Alex", 1300, time_now, function (task) {
    console.log("Task Posted")
    console.log(task)

    TaskService.getTask(4, function (task) {
      console.log("Task Retrieved")
      console.log(task)
    })
    TaskService.taskComplete([4,5], function (task) {
      console.log("Task Retrieved")
      console.log(task)
    })
  }) */

  const [tasks, setTasks] = useState([]);
  const [unscheduled, setUnscheduled] = useState([]);
  const [scheduled, setScheduled] = useState([]);

  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState([]);

  const splitTasks = () => {
    let schedArr = [],
      unschedArr = [];
    tasks.forEach((task) => {
      if (task.scheduled) {
        schedArr.push(task);
      } else {
        unschedArr.push(task);
      }
    });
    setUnscheduled(unschedArr);
    setScheduled(schedArr);
  };

  useEffect(() => {
    /* split into scheduled and unscheduled every time tasks updates */
    splitTasks();
  }, [tasks]);

  const createTask = (task) => {
    const { name, description, duration, due } = task;
    TaskService.postTask(name, description, duration, due, (task) => {
      console.log('Creating:', task);
      setTasks(
        tasks.concat({
          /* temporarily filling out extra fields */
          ...task,
          created: '10/10/10',
          category: 'School',
          dueDate: 'Tue Dec 10 2019',
          scheduledDate: 'Tues 3-4'
        })
      );
      setCreating(false);
    });
  };

  const selectTask = (id) => {
    if (selected.indexOf(id) === -1) {
      setSelected(selected.concat([id]));
    } else {
      setSelected(selected.filter((num) => num !== id));
    }
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const completeTask = deleteTask; // temporary

  const scheduleTask = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, scheduled: true } : task
      )
    );

  const scheduleSelected = () => {
    /* schedule selected tasks or all */
    if (selected.length) {
      selected.forEach((id) => scheduleTask(id));
    } else {
      tasks.forEach((task) => {
        if (!task.scheduled) scheduleTask(task.id);
      });
    }
    setSelected([]);
  };

  return (
    <div>
      <Navbar onAdd={() => setCreating(true)} signedIn={signedIn} />
      {creating ? (
        <Task
          task={emptyTask}
          deleteTask={() => setCreating(false)}
          createTask={createTask}
          categories={categories}
          creating
        />
      ) : (
        ''
      )}
      <TaskSection title="Not yet scheduled" emptyPrompt="No created tasks">
        {unscheduled.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleSelect={selectTask}
            selected={selected.indexOf(task.id) !== -1}
            categories={categories}
          />
        ))}
      </TaskSection>
      <FullButton
        primary={unscheduled.length}
        disabled={!unscheduled.length}
        onClick={() => scheduleSelected()}
      >
        Schedule {selected.length ? selected.length : 'All'} Tasks
      </FullButton>
      <TaskSection title="Scheduled" emptyPrompt="No scheduled tasks">
        {scheduled.map((task) => (
          <Task
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
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
