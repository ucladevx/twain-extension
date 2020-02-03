import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/containers/Nav';

import Global from './components/presentational/styled/Global';
import Login from './components/containers/Login';
import TaskList from './components/containers/TaskList';
import Settings from './components/containers/Settings';
import Help from './components/containers/Help';

const App = () => {
  const DefaultContainer = () => (
    <>
      <Navbar />
      <Switch>
        <Route path="/tasklist" component={TaskList} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </>
  );

  return (
    <Global>
      <Router>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/help" component={Help} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    </Global>
  );
};

export default App;
