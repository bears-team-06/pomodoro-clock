import React from 'react';
import { shallow } from 'enzyme';
import ButtonComponent from './ReusableButtonComponent';
describe('Button Component', () => {
    it('with text and is disabled true', () => {
        const button = shallow(<ButtonComponent label={'Button Text'} isDisabled={true} />);
        expect(button).toMatchSnapshot();
    });

    it('with text and is disabled false', () => {
        const button = shallow(<ButtonComponent label={'Button Text'} isDisabled={false} />);
        expect(button).toMatchSnapshot();
    });

    it('should callback on click handler', () => {
        let clickHandlerCalled = false;
        const clickHandler = () => {
            clickHandlerCalled = true;
        }
        const button = shallow(<ButtonComponent label={'Button Text'} isDisabled={false} clickHandler={clickHandler}/>);
        button.simulate('click')
        expect(clickHandlerCalled).toBeTruthy()
    })
});