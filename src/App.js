import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/containers/Nav';
import Global from './components/presentational/styled/Global';
import Onboarding from './components/containers/Onboarding';

import Settings from './components/containers/Settings';
import Help from './components/containers/Help';

import TaskList from './components/containers/TaskList';
import SchedulingList from './components/containers/Scheduling';
import ChangeList from './components/containers/MakeChanges';
import Success from './components/containers/Success';

import StorageService from './services/StorageService';

const App = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    StorageService.getLoggedIn((res) => {
      console.log('logged in:', res);
      setLogged(res.loggedIn);
    });
  }, []);

  const DefaultContainer = () => (
    <>
      <Navbar />
      <Switch>
        <Route path="/tasklist" component={TaskList} />
        <Route path="/scheduling/:ids" component={SchedulingList} />
        <Route path="/changelist/:ids" component={ChangeList} />
        <Route component={TaskList} />
      </Switch>
    </>
  );

  return (
    <Global>
      <Router>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/help" component={Help} />

          <Route path="/tasklist" component={DefaultContainer} />
          <Route path="/scheduling" component={DefaultContainer} />
          <Route path="/changelist" component={DefaultContainer} />

          <Route path="/success/:numsched" component={Success} />

          <Route component={logged ? DefaultContainer : Onboarding} />
        </Switch>
      </Router>
    </Global>
  );
};

export default App;
