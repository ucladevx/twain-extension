import React, { useState, Component } from 'react';

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
    })));

  const [creating, setCreating] = useState(false);
  const [taskData, setTaskData] = useState(
    [...Array(5).keys()].map((num) => ({ id: num }))
  );

  return (
    <div>
      {taskData.map((task) => (
        <Task key={task.id} name="TITLE" description="Description"/>
      ))}
      <Button primary>Create Task</Button>
      <Button disabled>Schedule</Button>
    </div>
  );
};

export default TaskList;

// export default class TaskList extends Component{
//   constructor(props){
//     super(props);
//     const [creating, setCreating] = useState(false);
//     const [taskData, setTaskData] = useState(
//       [...Array(5).keys()].map((num) => ({ id: num }))
//     );
//     this.state={
//       creating:creating,
//       setCreating:setCreating,
//       taskData:taskData,
//       setTaskData:setTaskData
//     }
//   }
//
//   updateList(){
//     this.state.setCreating(!this.state.creating);
//     this.state.setTaskData(this.state.taskData);
//   }
//
//   render(props){
//     return(
//           <div>
//             {this.state.taskData.map((task) => (
//               <Task key={task.id} title="TITLE" description="Description"/>
//             ))}
//             {this.state.creating ? (
//               <div>
//                 <NewTask />
//                 <Button onClick={() => this.updateList()}>CREATE</Button>
//               </div>
//             ) : (
//               <Button onClick={() => this.updateList()}>CREATE TASK</Button>
//             )}
//           </div>
//     );
//   }
// }
