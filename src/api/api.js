import axios from 'axios';

window.axios = axios;

import {Url} from '../constants/constants.js';

const TIMEOUT = 5000;

const ErrorType = {
  BAD_REQUEST: `BAD_REQUEST`
};

const ErrorStatus = {
  [ErrorType.BAD_REQUEST]: 400
};

const ErrorCustomMessage = {
  [ErrorType.BAD_REQUEST]: `Bad request`
};

const createAPI = (dispatch, history) => {
  const api = axios.create({
    baseURL: Url.BASE,
    timeout: TIMEOUT
  });

  const onSuccess = (response) => response;
  const onError = (err) => {
    if (err.response.status === ErrorStatus[ErrorType.BAD_REQUEST]) {
      throw new Error(`${ErrorCustomMessage[ErrorType.BAD_REQUEST]}: ${err.response.data.error}`);
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
