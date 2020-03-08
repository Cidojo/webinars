import {combineReducers} from 'redux';

import NameSpace from './name-spaces.js';
import moviesReducer from './movies-reducer/movies-reducer.js';
import genreReducer from './genre-reducer/genre-reducer.js';
import displayCountReducer from './display-count-reducer/display-count-reducer.js';
import authReducer from './auth-reducer/auth-reducer.js';
import reviewsReducer from './reviews-reducer/reviews-reducer.js';

const rootReducer = combineReducers({
  [NameSpace.MOVIES]: moviesReducer,
  [NameSpace.GENRE]: genreReducer,
  [NameSpace.DISPLAY_COUNT]: displayCountReducer,
  [NameSpace.AUTH]: authReducer,
  [NameSpace.REVIEWS]: reviewsReducer
});

export default rootReducer;
