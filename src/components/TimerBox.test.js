import React from 'react'
import { shallow } from 'enzyme'
import TimerState from "../TimerState";
import TimerBox from "./TimerBox";

describe('Timer state', () => {

    it('renders snapshot', () => {
        let timerBox = shallow(<TimerBox sessionTime={1600} timerState={TimerState.Running} sessionName={"Short Break"}/>)
        expect(timerBox).toMatchSnapshot();
    })

    it('calls starts set Interval for 1 second when starts ticking', () => {
        jest.useFakeTimers();
        const timerBox = shallow(<TimerBox sessionTime={1600} timerState={TimerState.Running} sessionName={"Short Break"} />)
        timerBox.instance().startTicking()
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    })

    it('does not start timer when timerstate is not changed', () => {
        const timerBox = shallow(<TimerBox sessionTime={10} timerState={TimerState.Stopped} sessionName={"Short Break"}/>)
        const startTickingSpy = jest.spyOn(timerBox.instance(), 'startTicking')
        timerBox.setProps({
            timerState: TimerState.Stopped
        })
        expect(startTickingSpy).toHaveBeenCalledTimes(0)
    })

    it('start timer when timerstate is changed to running from stopped', () => {
        const timerBox = shallow(<TimerBox sessionTime={10} timerState={TimerState.Stopped} sessionName={"Short Break"}/>)
        const startTickingSpy = jest.spyOn(timerBox.instance(), 'startTicking')
        timerBox.setProps({
            timerState: TimerState.Running
        })
        expect(startTickingSpy).toHaveBeenCalledTimes(1)
    })

    it('stops timer when state is changed to pause', () => {
        const timerBox = shallow(<TimerBox sessionTime={10} timerState={TimerState.Running} sessionName={"Short Break"}/>)
        const stopTimerSpy = jest.spyOn(timerBox.instance(), 'stopTimer')
        timerBox.setProps({
            timerState: TimerState.Paused
        })
        expect(stopTimerSpy).toHaveBeenCalledTimes(1)
    })

    it('stops timer when state is changed to stopped', () => {
        const timerBox = shallow(<TimerBox sessionTime={10} timerState={TimerState.Running} sessionName={"Short Break"}/>)
        const stopTimerSpy = jest.spyOn(timerBox.instance(), 'stopTimer')
        timerBox.setProps({
            timerState: TimerState.Stopped
        })
        expect(stopTimerSpy).toHaveBeenCalledTimes(1)
    })

    it('calls on timerComplete when session time changes to zero', () => {
        jest.useFakeTimers();
        const onTimerComplete = jest.fn()
        const timerBox = shallow(<TimerBox sessionTime={1} timerState={TimerState.Running} sessionName={"Short Break"} onTimerComplete={onTimerComplete}/>)
        expect(onTimerComplete).toHaveBeenCalledTimes(0)
        const playAlarmSpy = jest.spyOn(timerBox.instance(), 'playAlarm');
        timerBox.instance().startTicking()
        jest.runAllTimers()
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        expect(onTimerComplete).toHaveBeenCalledTimes(1)
        expect(playAlarmSpy).toHaveBeenCalledTimes(1)
    })

})