import * as React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {history} from './../../store/store.js';

import HomePage from './../pages/home.jsx';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </Router>
  );
};

export {App};
