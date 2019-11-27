/*global chrome*/
import React, { useState } from 'react';

import Navbar from '../containers/Nav';
import { FullButton } from '../presentational/styled/Button';

import AuthService from '../../services/AuthService';

const Login = () => {
  const getUser = async () => {
    AuthService.signIn(function(user) {
      console.log('Signed-in user:', user);
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
