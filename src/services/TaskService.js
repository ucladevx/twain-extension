import React from 'react';
import axios from 'axios';

import Task from '../models/TaskModel'

async function getTask(id){
  return axios.get('http://localhost:31337/api/tasks/4', {
    headers: {
      'Access-Control-Allow-Origin': 'chrome-extension://',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }).then(function(res){
    console.log(res)
    console.log(res.data)
    let name = res.data.data.name
    let duration = res.data.data.duration
    let desc = res.data.data.description
    let task = new Task(id, name, duration, desc);
    console.log(task)
    return task;
  }).catch(err => {
    let task = new Task(id, '', 0, '');
    return task;
  });
}

const postTask = (object) => {
    return axios.post('http://localhost:31337/api/tasks', object).then(res => res.data);
}

export default { getTask, postTask };
