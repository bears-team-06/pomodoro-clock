import React from "react";
import ReactDOM from "react-dom";
import PomodoroClock from "./PomodoroClock";
import { shallow } from "enzyme";
import TimerState from "./TimerState";
import DefaultStates from "./DefaultState";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PomodoroClock />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("updates break length value on calling onChange", () => {
  const AppWrapper = shallow(<PomodoroClock />);
  expect(getBreakLengthConfigurator(AppWrapper).prop("timeLength")).toBe(
    DefaultStates.shortBreakTime
  );
  getBreakLengthConfigurator(AppWrapper)
    .props()
    .onChange(660);
  expect(getBreakLengthConfigurator(AppWrapper).prop("timeLength")).toBe(660);
});

it("updates session length value on calling onChange", () => {
  const AppWrapper = shallow(<PomodoroClock />);
  expect(getSessionLengthConfigurator(AppWrapper).prop("timeLength")).toBe(
    DefaultStates.focusTime
  );
  getSessionLengthConfigurator(AppWrapper).props().onChange(1800);
  expect(getSessionLengthConfigurator(AppWrapper).prop("timeLength")).toBe(1800);
});

it("updates pomodoro state to short break on complete", () => {
  const AppWrapper = shallow(<PomodoroClock />);
  expect(getTimerBox(AppWrapper).prop("sessionName")).toBe("Focus");
  getTimerBox(AppWrapper).props().onTimerComplete();
  expect(getTimerBox(AppWrapper).prop("sessionName")).toBe("Short Break");
});

it("updates timer state to paused on clicking pause button", () => {
    const AppWrapper = shallow(<PomodoroClock />);
    getStartButton(AppWrapper)
        .props()
        .clickHandler();
    expect(getTimerBox(AppWrapper).prop("timerState")).toBe(TimerState.Running);
    getPauseButton(AppWrapper)
        .props()
        .clickHandler();
    expect(getTimerBox(AppWrapper).prop("timerState")).toBe(TimerState.Paused);
});

it("updates timer state to running on clicking start button", () => {
  const AppWrapper = shallow(<PomodoroClock />);
  getStartButton(AppWrapper)
        .props()
        .clickHandler();
  expect(getTimerBox(AppWrapper).prop("timerState")).toBe(TimerState.Running);
});

it("resets app states on clicking stop button", () => {
  const AppWrapper = shallow(<PomodoroClock />);
  expect(getTimerBox(AppWrapper).prop("timerState")).toBe(TimerState.Stopped);

  getBreakLengthConfigurator(AppWrapper)
    .props()
    .onChange(660);
  getSessionLengthConfigurator(AppWrapper)
    .props()
    .onChange(1560);
  getStartButton(AppWrapper)
    .props()
    .clickHandler();
  expect(getTimerBox(AppWrapper).prop("timerState")).toBe(TimerState.Running);

  getStopButton(AppWrapper)
    .props()
    .clickHandler();

  expect(getTimerBox(AppWrapper).prop("timerState")).toBe(TimerState.Stopped);
  expect(getBreakLengthConfigurator(AppWrapper).prop("timeLength")).toBe(
    DefaultStates.shortBreakTime
  );
  expect(getSessionLengthConfigurator(AppWrapper).prop("timeLength")).toBe(
    DefaultStates.focusTime
  );
});

const getBreakLengthConfigurator = App => App.find(".Break-Length");
const getSessionLengthConfigurator = App => App.find(".Session-Length");
const getTimerBox = App => App.find("TimerBox");
const getStartButton = App => App.find(".Start");
const getStopButton = App => App.find(".Stop");
const getPauseButton = App => App.find(".Pause");
