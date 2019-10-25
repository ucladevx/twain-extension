import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';

const Login = () => {
  return (
    <div>
      <Link to="/tasklist">
        <Button>LOG IN</Button>
      </Link>
    </div>
  );
};

export default Login;
