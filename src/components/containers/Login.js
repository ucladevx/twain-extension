import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../containers/Nav';
import Button from '../presentational/styled/Button';

const Login = () => {
  return (
    <div>
      <Navbar />
      <Link to="/tasklist">
        <Button primary>Sign In</Button>
      </Link>
    </div>
  );
};

export default Login;
