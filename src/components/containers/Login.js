import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../presentational/styled/Button';

const Login = () => {
  return (
    <div>
      <Link to="/tasklist">
        <Button primary>Sign In</Button>
      </Link>
    </div>
  );
};

export default Login;
