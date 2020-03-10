import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/containers/Nav';

import Global from './components/presentational/styled/Global';
import Onboarding from './components/containers/Onboarding';
import Login from './components/containers/Login';
import TaskList from './components/containers/TaskList';
import Settings from './components/containers/Settings';
import Help from './components/containers/Help';
import Success from './components/containers/Success';
import SchedulingList from './components/containers/Scheduling';

const App = () => {
  const DefaultContainer = () => (
    <>
      <Navbar />
      <Switch>
        <Route path="/tasklist" component={TaskList} />
        <Route path="/login" component={Login} />
        <Route path="/scheduling/:ids" component={SchedulingList} />
        <Route component={TaskList} />
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
          <Route path="/success/:numsched" component={Success} />
          <Route path="/tasklist" component={DefaultContainer} />
          <Route path="/login" component={DefaultContainer} />
          <Route path="/scheduling" component={DefaultContainer} />

          <Route component={Onboarding} />
        </Switch>
      </Router>
    </Global>
  );
};

export default App;
