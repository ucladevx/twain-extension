import React, { useState, useEffect } from 'react';

import Task from '../presentational/Task';
import { TaskSection } from '../presentational/Dropdown';

import TaskService from '../../services/TaskService';

const CompletedList = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    TaskService.getAllCompleted((res) => {
      setCompleted(res.data);
    });
  }, []);

  return (
    <TaskSection
      title="Completed"
      emptyPrompt="No completed tasks"
      emptyOpen={true}
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
