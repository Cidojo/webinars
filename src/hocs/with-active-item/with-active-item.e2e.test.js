import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item';

configure({adapter: new Adapter()});

const Component = () => <div />;
const ComponentWrapped = withActiveItem(Component);

it(`Has no active item by default`, () => {
  const wrapper = mount(<ComponentWrapped />);

  expect(wrapper.state().active).toEqual(null);
});

it(`Changes active element`, () => {
  const active = `some active item`;

  const wrapper = mount(<ComponentWrapped />);

  wrapper.instance().handleActiveChange(active);
  expect(wrapper.state().active).toEqual(active);
});
