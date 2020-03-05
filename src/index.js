import * as React from 'react';
import * as ReactDom from 'react-dom';

import {HomePage} from './components/pages/home.jsx';
import {mockArticles} from './mock/mock';

import './styles/styles.scss';

const init = () => {
  ReactDom.render(
    <HomePage articles={mockArticles} />,
    document.getElementById(`root`)
  );
};

init();
