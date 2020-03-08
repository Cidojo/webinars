import WebinarsActionType from './../../actions/webinars-actions/webinars-actions.js';
import {Url} from './../../constants/constants.js';

const initialState = {
  webinars: []
};

const ActionCreator = {
  addNew: (webinar) => ({
    type: WebinarsActionType.ADD_NEW,
    payload: webinar
  }),
  setAll: (webinars) => ({
    type: WebinarsActionType.SET_ALL,
    payload: webinars
  })
};

const Operation = {
  getAll: () => (dispatch, _, api) => {
    return api.get(Url.WEBINARS)
      .then((response) => {

        if (response.data) {
          dispatch(ActionCreator.setAll(response.data));
        }
        return response;
      });
  },
  saveNew: (webinar) => (dispatch, _, api) => {
    return api.post(Url.WEBINARS, webinar)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.addNew(response.data));
        }
        return response;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WebinarsActionType.SET_ALL: return Object.assign({}, state, {
      webinars: action.payload
    });
    case WebinarsActionType.ADD_NEW: return Object.assign({}, state, {
      webinars: [action.payload, ...state.webinars]
    });
  }

  return state;
};

export {ActionCreator as WebinarsActionCreator, Operation as WebinarsOperation, initialState as WebinarsInitialState};
export default reducer;
