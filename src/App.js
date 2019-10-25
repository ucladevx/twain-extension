import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Navbar from './components/containers/Nav';
import Login from './components/containers/Login';
import TaskList from './components/containers/TaskList';
import Settings from './components/containers/Settings';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
    color: #444;
  }
`;

const App = () => {
  return (
    <div>
      <GlobalStyle />

      <Router>
        <Navbar />

        <Switch>
          <Route path="/tasklist" component={TaskList} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
