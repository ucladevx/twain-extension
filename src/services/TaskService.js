import React from 'react';
import axios from 'axios';

import AuthService from './AuthService'

async function getTask(id, taskHandler) {
  let getTaskCallback = async function(token) {
    let url = 'http://localhost:31337/api/tasks/' + id.toString()
    
    let res = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': 'chrome-extension://',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      withCredentials: true,
    }).then(res => res.data.data)
      .catch(err => {
        console.log(err.response)
        return err
    });

    taskHandler(res)
  }

  AuthService.runWithAuthToken(getTaskCallback)
}

const postTask = async (name, description, duration, postTaskHandler) => {

 let postTaskCallback = async function(token) {
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
      .then(res => res.data.data)
      .catch(err => {
        console.log(err.response)
        return err
      });
    postTaskHandler(res)
  }

  AuthService.runWithAuthToken(postTaskCallback)
}

export default { getTask, postTask };
