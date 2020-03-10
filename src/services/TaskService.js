import React from 'react';
import axios from 'axios';

import AuthService from './AuthService';

async function getTask(id, taskHandler) {
  let getTaskCallback = async function(token) {
    let url = 'http://localhost:31337/api/tasks/' + id.toString();

    let res = await axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'chrome-extension://',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        withCredentials: true
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });

    taskHandler(res);
  };

  AuthService.runWithAuthToken(getTaskCallback);
}

const getAllTasks = (taskHandler) => {
  let getAllTasksCallback = async function(token) {
    let url = 'http://localhost:31337/api/tasks/me';

    let res = await axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'chrome-extension://',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        withCredentials: true
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });

    taskHandler(res);
  };

  AuthService.runWithAuthToken(getAllTasksCallback);
};

const postTask = async (
  name,
  description,
  duration,
  due_date,
  postTaskHandler
) => {
  let postTaskCallback = async function(token) {
    let body = {
      name: name,
      description: description,
      duration: duration,
      due_date: due_date
    };

    let header = {
      Authorization: 'Bearer ' + token
    };

    let res = await axios
      .post('http://localhost:31337/api/tasks', body, {
        headers: header
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });
    postTaskHandler(res);
  };

  AuthService.runWithAuthToken(postTaskCallback);
};

const taskComplete = async (taskIds, taskCompleteHandler) => {
  let taskCompleteCallback = async function(token) {
    let body = {
      ids: taskIds
    };
    let header = {
      Authorization: 'Bearer ' + token
    };
    let res = await axios
      .post('http://localhost:31337/api/tasks/complete', body, {
        headers: header
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });
    taskCompleteHandler(res);
  };
  AuthService.runWithAuthToken(taskCompleteCallback);
};

const scheduleTasks = async (ids, minTime, timezone, taskScheduleHandler) => {
  let taskScheduleCallback = async function(token) {
    let body = {
      ids,
      timeMin: minTime,
      timeZone: timezone
    };
    let header = {
      Authorization: 'Bearer ' + token
    };
    let res = await axios
      .post('http://localhost:31337/api/schedule/', body, {
        headers: header
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });
    taskScheduleHandler(res);
  };
  AuthService.runWithAuthToken(taskScheduleCallback);
};

const confirmTasks = async (ids, forceTasks, timezone, taskConfirmHandler) => {
  let taskConfirmCallback = async function(token) {
    let body = {
      good_ids: ids,
      force: forceTasks,
      timeZone: timezone
    };
    let header = {
      Authorization: 'Bearer ' + token
    };
    let res = await axios
      .post('http://localhost:31337/api/schedule/confirm', body, {
        headers: header
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });
    taskConfirmHandler(res);
  };
  AuthService.runWithAuthToken(taskConfirmCallback);
};

export default {
  getTask,
  getAllTasks,
  postTask,
  taskComplete,
  scheduleTasks,
  confirmTasks
};
