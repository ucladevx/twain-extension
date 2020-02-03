import React, { useState, useEffect } from 'react';

import Task from '../presentational/Task';
import { FullButton } from '../presentational/styled/Button';
import { TaskSection } from '../presentational/Dropdown';

import TaskService from '../../services/TaskService';

const emptyTask = {
  id: 0,
  name: '',
  duration: 60,
  description: '',
  category: '',
  created_date: '',
  scheduled_date: '',
  completed: false,
  scheduled: false,
  due_date: new Date().toISOString()
};

const categories = ['School', 'Work', 'Personal', 'Holidays']; // temporary

const TaskList = () => {
  /* Sample TaskService use: */
  // let time_now = new Date().toISOString();
  // TaskService.postTask('Homework', 'Alex', 1300, time_now, function(task) {
  //   console.log('Task Posted');
  //   console.log(task);

  //   TaskService.getTask(1, function(task) {
  //     console.log('Task Retrieved');
  //     console.log(task);
  //   });
  //   TaskService.taskComplete([1], function(task) {
  //     console.log('Task Completed');
  //     console.log(task);
  //   });
  // });

  const [tasks, setTasks] = useState([]);
  const [unscheduled, setUnscheduled] = useState([]);
  const [scheduled, setScheduled] = useState([]);

  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState([]);

  const splitTasks = () => {
    let schedArr = [],
      unschedArr = [];
    tasks.forEach((task) => {
      if (!task.completed) {
        if (task.scheduled) {
          schedArr.push(task);
        } else {
          unschedArr.push(task);
        }
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
    const { name, description, duration, due_date } = task;
    TaskService.postTask(name, description, duration, due_date, (task) => {
      console.log('Creating:', task);
      setTasks(
        tasks.concat({
          /* temporarily filling out extra fields */
          ...task,
          category: 'Twain'
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

  const completeTask = (id) =>
    TaskService.taskComplete([id], (completedTasks) =>
      completedTasks.forEach((completedTask) => {
        console.log('Task completed:', completedTask);
        setTasks(
          tasks.map((task) =>
            task.id === completedTask.id
              ? { ...completedTask, category: 'Twain' }
              : task
          )
        );
      })
    );

  const scheduleTask = (id) => {
    console.log('Scheduling task with id:', id);
    TaskService.scheduleTask(id, (updatedTask) => {
      console.log('Updated scheduled task:', updatedTask);
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id
            ? updatedTask
            : // previous scheduling logic:
              //    {
              //       ...task,
              //       scheduled: true,
              //       start_time: new Date(
              //         Date.now() + 2 * 60 * 60 * 1000
              //       ).toISOString(),
              //       end_time: new Date(
              //         Date.now() + 3 * 60 * 60 * 1000
              //       ).toISOString()
              //     }
              task
        )
      );
    });
  };

  const scheduleSelected = () => {
    /* schedule selected tasks or all */
    if (selected.length) {
      selected.forEach((id) => scheduleTask(id));
    } else {
      tasks.forEach((task) => {
        if (!task.scheduled) {
          scheduleTask(task.id);
        }
      });
    }
    setSelected([]);
  };

  const scheduleButton = (
    <FullButton
      primary={unscheduled.length}
      disabled={!unscheduled.length}
      onClick={() => scheduleSelected()}
    >
      Schedule {selected.length ? selected.length : 'All'}{' '}
      {selected.length === 1 ? 'Task' : 'Tasks'}
    </FullButton>
  );

  return (
    <div>
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
      <TaskSection
        title="Not yet scheduled"
        emptyPrompt="No created tasks"
        actionButton={scheduleButton}
      >
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
