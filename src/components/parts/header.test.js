import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './header.jsx';

it(`should render Header component without errors`, () => {
  const tree = renderer.create(<BrowserRouter><Header/></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
