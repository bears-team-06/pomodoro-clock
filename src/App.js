import React, { Component } from "react";
import ReusableTimeConfigurationComponent from "./components/ReusableTimeConfigurationComponent";
import ReusableButtonComponent from "./components/ReusableButtonComponent";
import TimerBox from "./components/TimerBox";
import TimerState from "./TimerState";

const PomodoroState = {
  Focus: 0,
  ShortBreak: 1,
  LongBreak: 2
};

const defaultStates = {
    timerState: TimerState.Stopped,
    pomodoroState: PomodoroState.Focus,
    focusTime: 1500,
    shortBreakTime: 600,
    longBreakTime: 900,
    sessionNumber: 1
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultStates;
  }

  set timerState(state) { // do we even need this property here, it does not do anything other than set/get other property?
      // this is the place to decide what to do with timers
      switch (state) {
          case TimerState.Running:
              console.log('Start running');
              break;
          case TimerState.Stopped:
               console.log('Stop Running'); // reset session to 1
              break;
          case TimerState.Paused:
              console.log('Pause timer');
              break;
          default:
              throw new Error('Where did you get this state?')
      }
      this.setState({
          'timerState': state
      });
  }

  get timerState() {
    return this.state.timerState;
  }

  getPomodoroState = sessionNumber => {
    // let nextState;
    console.log(sessionNumber);
    switch (true) {
      case sessionNumber % 2 !== 0:
        return PomodoroState.Focus;
      case sessionNumber % 6 === 0:
        return PomodoroState.LongBreak;
      case sessionNumber % 2 === 0:
        return PomodoroState.ShortBreak;
      default:
        throw new Error("Unknown Pomodoro State");
    }
  };

  onTimerComplete = () => {
    this.timerState = TimerState.Paused;
    const incrementedState = this.state.sessionNumber + 1;
    const nextPomodoroState = this.getPomodoroState(incrementedState);
    this.setState({
      sessionNumber: incrementedState,
      pomodoroState: nextPomodoroState
    });
  };

  get sessionName() {
    const currentPomodoro = this.state.pomodoroState;
    switch (currentPomodoro) {
      case PomodoroState.Focus:
        return "Focus";
      case PomodoroState.ShortBreak:
        return "Short Break";
      case PomodoroState.LongBreak:
        return "Long Break";
      default:
        return "";
    }
  }

  get sessionTime() {
    const currentPomodoro = this.state.pomodoroState;
    switch (currentPomodoro) {
      case PomodoroState.Focus:
        return this.state.focusTime;
      case PomodoroState.ShortBreak:
        return this.state.shortBreakTime;
      case PomodoroState.LongBreak:
        return this.state.longBreakTime;
      default:
        return 0;
    }
  }

  get isStartButtonDisabled() {
    return this.state.timerState === TimerState.Running
  }

  startButtonClickHandler = () => {
    this.timerState = TimerState.Running;
  };

  get isPauseButtonDisabled() {
    return this.state.timerState !== TimerState.Running || this.state.timerState === TimerState.Stopped;
  }

  pauseButtonClickHandler = () => {
    this.timerState = TimerState.Paused;
  };

  get isResetButtonDisabled() {
      return false
  }

  resetButtonClickHandler = () => {
      this.setState(defaultStates)
  }

  onShortBreakTimeChange = (newValue) => {
      this.setState({
          shortBreakTime: newValue
      })
  }

  onSessionTimeChange = (newValue) => {
    this.setState({
      focusTime: newValue
    })
  }

  render() {
    return (

      <div className={"main-body"}>
        <div className={"row time-configuration"}>
          <ReusableTimeConfigurationComponent 
            labelName="Break Length"
            timeLength={this.state.shortBreakTime} 
            onChange={this.onShortBreakTimeChange}
            minimumChange={60}
            maximumLength={3600}
            minimumLength={60}
          />
          <ReusableTimeConfigurationComponent 
            labelName='Session Length'
            timeLength={this.state.focusTime} 
            onChange={this.onSessionTimeChange} 
            minimumChange={300} 
            maximumLength={7200} 
            minimumLength={600} 
          />
        </div>
        <div className={"row timer-box"}>
            <TimerBox
              sessionName={this.sessionName}
              sessionTime={this.sessionTime}
              timerState={this.state.timerState}
              onTimerComplete={this.onTimerComplete}
            />
        </div>
        <div className={"row button-container"}>
          <ReusableButtonComponent
            label={"Start"}
            isDisabled={this.isStartButtonDisabled}
            clickHandler={this.startButtonClickHandler}
          />
          <ReusableButtonComponent
            label={"Pause"}
            isDisabled={this.isPauseButtonDisabled}
            clickHandler={this.pauseButtonClickHandler}
          />
          <ReusableButtonComponent
            label={"Stop"}
            isDisabled={this.isStopButtonDisabled}
            clickHandler={this.stopButtonClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
