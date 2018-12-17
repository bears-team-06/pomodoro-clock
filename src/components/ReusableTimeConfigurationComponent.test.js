import ReusableTimeConfigurationComponent from './ReusableTimeConfigurationComponent';
import {shallow} from 'enzyme';
import React from "react";

describe('ReusableTimeConfigurationComponent', () => {
    describe('when given certain properties', () => {
        it ('displays correct start time and label', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={300} minimumChange={60} maximumBreakLength={3600} minimumBreakLength={60}
                />,
            );
            const label = wrapper.find('#label');
            expect(label.text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe(' 5');
            expect(wrapper.find('#increment').prop('disabled')).toBe(false);
            expect(wrapper.find('#decrement').prop('disabled')).toBe(false);
        });
    });

    describe('when pressing increment button', () => {
        it ('start time increases by minimumChange', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={300} minimumChange={60} maximumBreakLength={3600} minimumBreakLength={60}
                />,
            );
            const label = wrapper.find('#label');
            const incrementButton = wrapper.find('#increment');
            incrementButton.simulate('click');
            expect(label.text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe(' 6');
            expect(wrapper.find('#increment').prop('disabled')).toBe(false);
        });
    });

    describe('when pressing increment button to maximumBreakLength', () => {
        it ('disables increment button', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={300} minimumChange={60} maximumBreakLength={360} minimumBreakLength={60}
                />,
            );
            const label = wrapper.find('#label');
            wrapper.find('#increment').simulate('click');
            expect(label.text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe(' 6');
            expect(wrapper.find('#increment').prop('disabled')).toBe(true);
        });
    });

    describe('when pressing increment button when current time is at minimumBreakLength', () => {
        it ('enables decrement button', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={60} minimumChange={60} maximumBreakLength={3600} minimumBreakLength={60}
                />,
            );
            const label = wrapper.find('#label');
            expect(wrapper.find('#decrement').prop('disabled')).toBe(true);
            wrapper.find('#increment').simulate('click');
            expect(label.text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe(' 2');
            expect(wrapper.find('#decrement').prop('disabled')).toBe(false);
        });
    });

    describe('when pressing decrement button', () => {
        it ('start time decreases by minimumChange', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={300} minimumChange={60} maximumBreakLength={3600} minimumBreakLength={60}
                />,
            );
            const label = wrapper.find('#label');
            wrapper.find('#decrement').simulate('click');
            expect(label.text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe(' 4');
            expect(wrapper.find('#decrement').prop('disabled')).toBe(false);
        });
    });

    describe('when pressing decrement button to minimumBreakLength', () => {
        it ('disables decrement button', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={120} minimumChange={60} maximumBreakLength={360} minimumBreakLength={60}
                />,
            );

            wrapper.find('#decrement').simulate('click');
            expect(wrapper.find('#label').text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe(' 1');
            expect(wrapper.find('#decrement').prop('disabled')).toBe(true);
        });
    });

    describe('when pressing decrement button when current time is at maximumBreakLength', () => {
        it ('enables increment button', () => {
            const wrapper = shallow(
                <ReusableTimeConfigurationComponent
                    labelName='Break Length' startValue={3600} minimumChange={60} maximumBreakLength={3600} minimumBreakLength={60}
                />,
            );

            expect(wrapper.find('#increment').prop('disabled')).toBe(true);
            wrapper.find('#decrement').simulate('click');
            expect(wrapper.find('#label').text()).toBe('Break Length');
            expect(wrapper.find('#time').text()).toBe('59');
            expect(wrapper.find('#increment').prop('disabled')).toBe(false);
        });
    });
});