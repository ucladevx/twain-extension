import React from 'react';
import axios from 'axios';

function Task(id, title, duration, description){
  this.id = id;
  this.title = title;
  this.scheduledDate= '';
  this.duration= duration;
  this.dueDate = new Date().toDateString();
  this.startTime = '';
  this.endTime = '';
  this.category = '';
  this.notes= description;
  this.created = '';
  this.scheduled = false;
  this.completed = false;
  this.calendarId = 0;
}

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
