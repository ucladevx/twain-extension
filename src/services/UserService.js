import React from 'react';
import axios from 'axios';

import AuthService from './AuthService'

async function setHours(start_time, end_time, setHoursHandler) {
  let setHoursCallback = async function(token){
    let body = {
      start: start_time,
      end: end_time
    }
    let url = 'http://localhost:31337/api/users/hours'

    let res = await axios.post(url, body, {
      headers: {
        'Access-Control-Allow-Origin': 'chrome-extension://',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.data.data)
      .catch(err => {
        console.log(err.response)
        return err
    });

    setHoursHandler(res)
  }
  AuthService.runWithAuthToken(setHoursCallback)
}

async function setPrimaryCalendar(primary_calendar, setPrimaryCalendarHandler) {
  let setPrimaryCalendarCallback = async function(token){
    let body = {
      primary_calendar: primary_calendar
    }

    let url = 'http://localhost:31337/api/users/calendars/primary'

    let res = await axios.post(url, body, {
      headers: {
        'Access-Control-Allow-Origin': 'chrome-extension://',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.data.data)
      .catch(err => {
        console.log(err.response)
        return err
    });

    setPrimaryCalendarHandler(res)
  }
  AuthService.runWithAuthToken(setPrimaryCalendarCallback)
}

async function setRelevantCalendars(relevant_calendars, setRelevantCalendarsHandler) {
  let setRelevantCalendarsCallback = async function(token){
    let body = {
      relevant_calendars: relevant_calendars
    }

    let url = 'http://localhost:31337/api/users/calendars/relevant'

    let res = await axios.post(url, body, {
      headers: {
        'Access-Control-Allow-Origin': 'chrome-extension://',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.data.data)
      .catch(err => {
        console.log(err.response)
        return err
    });

    setRelevantCalendarsHandler(res)
  }
  AuthService.runWithAuthToken(setRelevantCalendarsCallback)
}

async function getLoggedInUser(getLoggedInUserHandler) {
  let getLoggedInUserCallback = async function(token) {

    let url = 'http://localhost:31337/api/users/me'

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

    getLoggedInUserHandler(res)
  }
  AuthService.runWithAuthToken(getLoggedInUserCallback)
}

async function getUserCalendars(getUserCalendarsHandler) {
  let getuserCalendarsCallback = async function(token) {

    let url = 'http://localhost:31337/api/users/calendars/'

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

    getUserCalendarsHandler(res)
  }

  AuthService.runWithAuthToken(getuserCalendarsCallback)
}


export default {setHours, setPrimaryCalendar, setRelevantCalendars, getLoggedInUser, getUserCalendars}
