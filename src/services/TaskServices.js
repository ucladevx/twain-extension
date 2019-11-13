import React from 'react';
import axios from 'axios';

async function getTask(id){
  const res = await fetch('http://localhost:31337/api/tasks/4', {
    mode: 'no-cors',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin'
  });
  const data = await res.json();
  return data;
}

const postTask = (object) => {
    return axios.post('http://localhost:31337/api/tasks', object).then(res => res.data);
}

export default { getTask, postTask };
