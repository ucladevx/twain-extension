import React from 'react';
import axios from 'axios';

function getTask(id){
  return axios.get('http://localhost:31337/api/tasks/4', {
    headers: {
      'Access-Control-Allow-Origin': 'chrome-extension://',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }).then(res => res.data);
}

const postTask = (object) => {
    return axios.post('http://localhost:31337/api/tasks', object).then(res => res.data);
}

export default { getTask, postTask };
