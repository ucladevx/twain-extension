/*global chrome*/
import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../presentational/styled/Button';

function chromeSignOn() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    console.log(token)
  });
}

const Login = () => {
  return (
    <div>
      <button onClick={chromeSignOn}>
        Sign in
    </button>
    </div>
  );
};

export default Login;
