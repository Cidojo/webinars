import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Pagination} from './pagination.jsx';

const props = {
  pages: 0,
  currentPage: 0
};

it(`should render Pagination component without errors`, () => {
  const tree = renderer.create(<BrowserRouter><Pagination {...props} /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
