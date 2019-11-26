/*global chrome*/
import React, { useState } from 'react';

import Navbar from '../containers/Nav';
import { FullButton } from '../presentational/styled/Button';

import AuthService from '../../services/AuthService';

const Login = ({ handleUser }) => {
  const getUser = async () => {
    AuthService.signIn(function(user) {
      console.log('Handling login:', user);
      handleUser(user);
    });
  };

  return (
    <div>
      <Navbar />
      <FullButton primary onClick={getUser}>
        Sign in
      </FullButton>
    </div>
  );
};

export default Login;
