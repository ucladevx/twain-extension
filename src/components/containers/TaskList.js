import React, { useState } from 'react';

import Task from '../presentational/Task';
import Button from '../presentational/styled/Button';

const TaskList = () => {
  const [tasks, setTasks] = useState(
    [...Array(5).keys()].map((num) => ({
      id: num,
      title: 'Placeholder Title',
      scheduledDate: 'Tues 3:10 pm - 4:00 pm',
      duration: 90,
      dueDate: '11/3/19',
      category: 'Testing',
      notes: 'Lorem ipsum',
      created: '10/10/19'
    }))
  );

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <Button primary>Create Task</Button>
      <Button disabled>Schedule</Button>
    </div>
  );
};

export default TaskList;
