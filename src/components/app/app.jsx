import * as React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {history} from './../../store/store.js';

import HomePage from './../pages/home.jsx';
import WebinarPage from './../pages/webinar.jsx';
import {NotFoundPage} from './../pages/not-found.jsx';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/webinars/:id' component={WebinarPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export {App};
