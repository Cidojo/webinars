import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

import reducer from './../reducers/root-reducer.js';
import createAPI from './../api/api.js';

const composeEnhancers = (typeof window !== `undefined` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const api = createAPI((...args) => store.dispatch(...args), history);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        composeEnhancers && composeEnhancers()
    )
);

export {history};
export default store;
