import React from 'react';
import axios from 'axios';

import Task from '../models/TaskModel'
import AuthService from './AuthService'

function createTaskFromResponse(data) {
  let task = new Task(
      data.id, 
      data.name, 
      data.description, 
      data.duration,
      data.scheduled,
      data.completed,
      data.userID
    );
    return task;
}

async function getTask(id) {
  return AuthService.getGoogleAuthToken(async function(token) {
    let url = 'http://localhost:31337/api/tasks/' + id.toString()
    
    let res = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': 'chrome-extension://',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      withCredentials: true,
    }).then(res => createTaskFromResponse(res.data.data))
      .catch(err => {
        console.log(err.response)
        return err
    });

    console.log(res)
  });
}

const postTask = async (name, description, duration) => {

  return AuthService.getGoogleAuthToken(async function(token) {
    let body = {
      name: name,
      description: description,
      duration: duration,
    }

    let header = {
      "Authorization": "Bearer " + token,
    }

    let res = await axios.post('http://localhost:31337/api/tasks', body,
      {
        headers: header,
      })
      .then(res => createTaskFromResponse(res.data.data))
      .catch(err => {
        console.log(err.response)
      });
    console.log(res);
  });
}

export default { getTask, postTask };
