import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import {Hero} from './Hero.jsx';

configure({adapter: new Adapter()});

const props = {
  onAddNewClick: () => {}
};

it(`should render Hero with add button component without errors`, () => {
  const tree = shallow(<Hero {...props}/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it(`should render Hero without add button component without errors`, () => {
  const tree = shallow(<Hero {...props} withButton={false} />);
  expect(toJson(tree)).toMatchSnapshot();
});
