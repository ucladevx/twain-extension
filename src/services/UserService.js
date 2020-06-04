import axios from 'axios';

import AuthService from './AuthService';

const backend_url = 'https://twaintasks.com/api'

// Time format is "08:30 am" or "10:00 pm"
async function setHours(start_time, end_time, setHoursHandler) {
  let startHr = parseInt(start_time.substring(0, 2));
  let endHr = parseInt(end_time.substring(0, 2));

  if (start_time.substring(6, 8) === 'am' && startHr === 12) {
    startHr = 0;
  }

  if (end_time.substring(6, 8) === 'am' && endHr === 12) {
    endHr = 0;
  }

  if (start_time.substring(6, 8) === 'pm' && startHr !== 12) {
    startHr += 12;
  }

  if (end_time.substring(6, 8) === 'pm' && endHr !== 12) {
    endHr += 12;
  }

  let startString =
    (startHr < 10 ? '0' : '') +
    startHr.toString() +
    ':' +
    start_time.substring(3, 5);
  let endString =
    (endHr < 10 ? '0' : '') + endHr.toString() + ':' + end_time.substring(3, 5);

  let setHoursCallback = async function(token) {
    let body = {
      start: startString,
      end: endString
    };
    let url = backend_url + '/users/hours';

    let res = await axios
      .post(url, body, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });

    setHoursHandler(res);
  };
  AuthService.runWithAuthToken(setHoursCallback);
}

async function setPrimaryCalendar(primary_calendar, setPrimaryCalendarHandler) {
  let setPrimaryCalendarCallback = async function(token) {
    let body = {
      primary_calendar: primary_calendar
    };

    let url = backend_url + '/users/calendars/primary';

    let res = await axios
      .post(url, body, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });

    setPrimaryCalendarHandler(res);
  };
  AuthService.runWithAuthToken(setPrimaryCalendarCallback);
}

async function setRelevantCalendars(
  relevant_calendars,
  setRelevantCalendarsHandler
) {
  let setRelevantCalendarsCallback = async function(token) {
    let body = {
      relevant_calendars: relevant_calendars
    };
    let url = backend_url + '/users/calendars/relevant';

    let res = await axios
      .post(url, body, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });

    setRelevantCalendarsHandler(res);
  };
  AuthService.runWithAuthToken(setRelevantCalendarsCallback);
}

async function getLoggedInUser(getLoggedInUserHandler) {
  let getLoggedInUserCallback = async function(token) {
    let url = backend_url + '/users/me';

    let res = await axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });

    getLoggedInUserHandler(res);
  };
  AuthService.runWithAuthToken(getLoggedInUserCallback);
}

async function getUserCalendars(getUserCalendarsHandler) {
  let getuserCalendarsCallback = async function(token) {
    let url = backend_url + '/users/calendars/';

    let res = await axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token
        },
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });
    getUserCalendarsHandler(res);
  };

  AuthService.runWithAuthToken(getuserCalendarsCallback);
}

async function setWeekendOption(weekend_setting, setWeekendOptionHandler) {
  let setWeekendOptionCallback = async function(token) {
    let url = backend_url + '/users/weekend';

    let body = {
      weekend_setting: weekend_setting
    };
    let res = await axios
      .post(url, body, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return err;
      });
    setWeekendOptionHandler(res);
  };
  AuthService.runWithAuthToken(setWeekendOptionCallback);
}

export default {
  setHours,
  setPrimaryCalendar,
  setRelevantCalendars,
  setWeekendOption,
  getLoggedInUser,
  getUserCalendars
};
