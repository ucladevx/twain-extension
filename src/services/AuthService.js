/*global chrome*/
import axios from 'axios';

const backend_url = 'https://twaintasks.com/api'

async function runWithAuthToken(callback) {
  chrome.identity.getAuthToken({ interactive: true }, callback);
}

async function signIn(handler) {
  let signInCallback = async function(token) {
    let body = {
      token: token
    };

    let res = await axios
      .post(backend_url + '/users/signup', body)
      .then((res) => res.data.data)
      .catch((err) => {
        console.log(err.response);
        return false;
      });

    handler(res);
  };

  runWithAuthToken(signInCallback);
}

export default { runWithAuthToken, signIn };
