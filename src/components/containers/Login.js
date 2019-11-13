/*global chrome*/
import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../containers/Nav';
import Button from '../presentational/styled/Button';

function chromeSignOn() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    console.log(token)
  });
}

const Login = () => {
  return (
    <div>
     <Navbar />
     <button onClick={chromeSignOn}>
        Sign in
     </button>
    </div>
  );
};

export default Login;
