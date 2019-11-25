/*global chrome*/
import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../containers/Nav';
import Button from '../presentational/styled/Button';

import AuthService from '../../services/AuthService';

async function getUser() {
  AuthService.signIn(function(user) {
    console.log(user)
    console.log("HandleLogin")
  });
}

const Login = () => {
  return (
    <div>
     <Navbar />
     <button onClick={getUser}>
        Sign in
     </button>
    </div>
  );
};

export default Login;
