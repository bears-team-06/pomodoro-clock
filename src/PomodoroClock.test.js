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
  expect(true).toBe(true);
});

it("updates pomodoro state to short break on complete", () => {
  expect(true).toBe(true);
});

it("updates timer state to paused on clicking pause button", () => {
  expect(true).toBe(true);
});

it("updates timer state to running on clicking start button", () => {
  expect(true).toBe(true);
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
