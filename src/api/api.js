import axios from 'axios';

import {AuthActionCreator} from './../reducers/auth-reducer/auth-reducer.js';
import {Url} from '../src/constants/constants.js';

const TIMEOUT = 5000;

const ErrorType = {
  BAD_REQUEST: `BAD_REQUEST`,
  UNAUTHORIZED: `UNAUTHORIZED`,
  FORBIDDEN: `FORBIDDEN`
};

const ErrorStatus = {
  [ErrorType.BAD_REQUEST]: 400,
  [ErrorType.UNAUTHORIZED]: 401,
  [ErrorType.FORBIDDEN]: 403
};

const ErrorCustomMessage = {
  [ErrorType.BAD_REQUEST]: `Bad request`,
  [ErrorType.UNAUTHORIZED]: `Unathorized`,
  [ErrorType.FORBIDDEN]: `Forbidden`
};

const createAPI = (dispatch, history) => {
  const api = axios.create({
    baseURL: Url.BASE,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onError = (err) => {
    if (err.response.status === ErrorStatus[ErrorType.UNAUTHORIZED] || err.response.status === ErrorStatus[ErrorType.FORBIDDEN]) {
      history.push(Url.LOGIN);
      dispatch(AuthActionCreator.resetUser());
    } else if (err.response.status === ErrorStatus[ErrorType.BAD_REQUEST]) {
      throw new Error(`${ErrorCustomMessage[ErrorType.BAD_REQUEST]}: ${err.response.data.error}`);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
