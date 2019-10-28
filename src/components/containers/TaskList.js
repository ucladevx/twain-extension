import React, { useState } from 'react';

import Task, { NewTask } from '../Task';
import Button from '../Button';

const TaskList = () => {
  const [creating, setCreating] = useState(false);
  const [taskData, setTaskData] = useState(
    [...Array(5).keys()].map((num) => ({ id: num }))
  );

  return (
    <div>
      {taskData.map((task) => (
        <Task key={task.id} title="TITLE" description="Description"/>
      ))}
      {creating ? (
        <div>
          <NewTask />
          <Button onClick={() => setCreating(!creating)}>CREATE</Button>
        </div>
      ) : (
        <Button onClick={() => setCreating(!creating)}>CREATE TASK</Button>
      )}
    </div>
  );
};

export default TaskList;
