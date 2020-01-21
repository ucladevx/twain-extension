/*global chrome*/
import React, { useState } from 'react';

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
      <FullButton primary onClick={getUser}>
        Sign in
      </FullButton>
    </div>
  );
};

export default Login;
