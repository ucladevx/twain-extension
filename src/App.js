import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Global from './components/presentational/styled/Global';
import Login from './components/containers/Login';
import TaskList from './components/containers/TaskList';
import Settings from './components/containers/Settings';

const App = () => {
  return (
    <Global>
      <Router>
        <Switch>
          <Route path="/tasklist" component={TaskList} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route component={Login} />
        </Switch>
      </Router>
    </Global>
  );
};

export default App;
