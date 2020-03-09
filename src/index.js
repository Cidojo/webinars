import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store.js';

import {App} from './components/app/app.jsx';
import {WebinarsOperation} from './reducers/webinars-reducer/webinars-reducer.js';
import {cacheWebinarsToStorage, restoreWebinarsFromStorage} from './store/local-storage.js';
import {WebinarsActionCreator} from './reducers/webinars-reducer/webinars-reducer';

import './styles/styles.scss';

const init = () => {
  store.dispatch(WebinarsOperation.getAll());

  const cachedWebinars = restoreWebinarsFromStorage();

  if (cachedWebinars && cachedWebinars.length) {
    store.dispatch(WebinarsActionCreator.setAll(cachedWebinars));
  }

  store.subscribe(() => {
    cacheWebinarsToStorage(store);
  });

  ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
