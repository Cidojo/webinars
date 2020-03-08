import * as React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import HomePage from './../pages/home-page/home-page.jsx';
import MovieDetails from './../pages/movie-details/movie-details.jsx';
import SignIn from './../pages/sign-in/sign-in.jsx';
import MyList from './../pages/my-list/my-list.jsx';
import AddReview from './../pages/add-review/add-review.jsx';
import {NotFound} from './../pages/not-found/not-found.jsx';

import {history} from './../../store/store.js';
import {Url} from './../../constants/constants.js';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${Url.FILM}/:id${Url.REVIEWS}`} component={AddReview} />
        <Route path={`${Url.FILM}/:id`} component={MovieDetails} />
        <Route path={`${Url.LOGIN}`} component={SignIn} />
        <Route path={`${Url.MY_LIST}`} component={MyList} />
        <Route path='/' component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export {App};
