import {combineReducers} from 'redux';

import NameSpace from './name-spaces.js';
import webinarsReducer from './webinars-reducer/webinars-reducer.js';

const rootReducer = combineReducers({
  [NameSpace.WEBINARS]: webinarsReducer
});

export default rootReducer;
