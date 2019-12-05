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

  // <FullButton primary onClick={getUser}>
      //   Sign in
      // </FullButton>

  return (
    <div>
      <Navbar />
      
      <img 
       style={{width:'350px'}}
       resizeMode={'contain'}   /* <= changed  */
       onClick={getUser}
       src={ require('../../images/landing_page.jpg') } />
    </div>
  );
};

export default Login;
