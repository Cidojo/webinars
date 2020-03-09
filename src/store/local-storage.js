import NameSpace from './../reducers/name-spaces.js';
import {WebinarsInitialState} from './../reducers/webinars-reducer/webinars-reducer.js';

const WEBINARS_STORAGE_KEY = `webinars`;

const restoreWebinarsFromStorage = () => {
  try {
    const webinarsCached = window.localStorage.getItem(WEBINARS_STORAGE_KEY);

    return webinarsCached !== `undefined` ? JSON.parse(webinarsCached) : WebinarsInitialState.webinars;
  } catch (err) {
    throw new Error(`${err} on restoreWebinars`);
  }
};

const cacheWebinarsToStorage = (store) => {
  try {
    window.localStorage.setItem(WEBINARS_STORAGE_KEY, JSON.stringify(store.getState()[NameSpace.WEBINARS].webinars));
  } catch (err) {
    throw new Error(`${err} on cache webinars`);
  }
};

export {restoreWebinarsFromStorage, cacheWebinarsToStorage};
