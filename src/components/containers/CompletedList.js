import React, { useState, useEffect } from 'react';

import Task from '../presentational/Task';
import { TaskSection } from '../presentational/Dropdown';

import TaskService from '../../services/TaskService';

const newDateNextDay = () => {
  const initDate = new Date();
  initDate.setTime(initDate.getTime() + 24 * 60 * 60 * 1000);
  initDate.setMinutes(0);
  return initDate.toISOString();
};

const placeholder = [
  {
    id: 1,
    name: 'Task 1',
    duration: 30,
    description: 'Testing.',
    created_time: newDateNextDay(),
    scheduled_time: newDateNextDay(),
    completed_time: newDateNextDay(),
    completed: true,
    scheduled: true,
    due_date: newDateNextDay()
  },
  {
    id: 2,
    name: 'Task 2',
    duration: 60,
    description: 'More testing.',
    created_time: newDateNextDay(),
    scheduled_time: newDateNextDay(),
    completed_time: newDateNextDay(),
    completed: true,
    scheduled: true,
    due_date: newDateNextDay()
  }
];

const CompletedList = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setCompleted(placeholder); // temp
  }, []);

  return (
    <TaskSection
      title="Completed"
      emptyPrompt="No completed tasks"
      actionButton={''}
      customHeight={'90vh'}
    >
      {completed.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={() => {}}
          toggleSelect={() => {}}
          selected={false}
        />
      ))}
    </TaskSection>
  );
};

export default CompletedList;
