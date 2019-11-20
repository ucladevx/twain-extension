import React from 'react';
import axios from 'axios';

import Task from '../models/TaskModel'

function getTask(id){
  return axios.get('http://localhost:31337/api/tasks/4', {
    headers: {
      'Access-Control-Allow-Origin': 'chrome-extension://',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }).then(function(res){
    let task = new Task(id, res.data.data.name, res.data.data.duration, res.data.data.description);
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

