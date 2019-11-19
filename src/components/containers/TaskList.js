import React, { useState, Component } from 'react';

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

function TaskList () {
  // const testTasks = await [...Array(5).keys()].map((num) => (TaskService.getTask(4)));
  const [tasks, setTasks] = useState(initTasks);
  console.log(tasks);

  const [creating, setCreating] = useState(false);

  const deleteTask = (id) =>
    console.log("test");
    // setTasks(testTasks.filter((task) => task.id !== id));

  console.log(tasks);
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

// export default class TaskList extends Component{
//   constructor(props){
//     super(props);
//     this.state={
//       tasks:[...Array(5).keys()].map((num) => ({
//         id: num,
//         title: 'Placeholder Title',
//         scheduledDate: 'Tues 3:00 pm - 4:00 pm',
//         duration: 90,
//         dueDate: 'Tue Dec 10 2019',
//         category: 'Testing',
//         notes: 'Lorem ipsum',
//         created: '10/10/19'
//       })),
//       emptyTask: {
//         id: 0,
//         title: '',
//         scheduledDate: '',
//         duration: 90,
//         dueDate: new Date().toDateString(),
//         category: '',
//         notes: '',
//         created: ''
//       },
//       categories: ['School', 'Work', 'Personal', 'Holidays'],
//       creating: false,
//     }
//   }
//   const deleteTask = (id) => {
//     const newTasks = this.state.tasks.filter((task) => task.id !== id);
//     this.setState({tasks: newTasks});
//   }
//   componentDidMount(){
//     TaskService.getTask(4).then(res => {
//       this.setState({
//         tasks: [...Array(5).keys()].map((num) => res)
//       });
//     });
//   }
//   render(){
//       return (
//         <div>
//           <Navbar onAdd={() => this.setState({creating: true})} />
//           {this.state.creating ? (
//             <Task
//               task={this.state.emptyTask}
//               deleteTask={() => this.setState({creating: false})}
//               categories={this.state.categories}
//               creating
//             />
//           ) : (
//             ''
//           )}
//           {this.state.tasks.map((task) => (
//             <Task
//               key={task.id}
//               task={task}
//               deleteTask={deleteTask}
//               categories={this.state.categories}
//             />
//           ))}
//           <Button primary onClick={() => this.setState({creating: true})}>
//             Create Task
//           </Button>
//           <Button disabled>Schedule</Button>
//         </div>
//       );
//   };
// }
