import NameSpace from './../reducers/name-spaces.js';

const getWebinars = (state) => state[NameSpace.WEBINARS].webinars;

const Selectors = {
  getWebinars
};

export default Selectors;

