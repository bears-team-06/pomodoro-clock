import { shallow } from 'enzyme'
import React from 'react'
import App from "./App";

it('matches app snapshot', () => {
    expect(shallow(<App/>)).toMatchSnapshot();
})