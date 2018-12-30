import React, { Component } from "react";
import ReusableTimeConfigurationComponent from "./components/ReusableTimeConfigurationComponent";
import ReusableButtonComponent from "./components/ReusableButtonComponent";
import TimerBox from "./components/TimerBox";
import TimerState from "./TimerState";
import DefaultStates from "./DefaultState";
import PomodoroState from "./PomodoroState";

class Alarm {
  constructor(src) {
    this.sound = new Audio(src)
  }
  playSound() {
    return this.sound.play();
  }
}
const alarm = new Alarm('http://www.orangefreesounds.com/wp-content/uploads/2017/10/Twin-bell-alarm-clock-ringing-short.mp3');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = DefaultStates;
    this.alarm = alarm;
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
  get isRoundedButtonDisabled() {
    return (this.state.timerState === TimerState.Running);
  }

  resetButtonClickHandler = () => {
      this.setState(DefaultStates)
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
            className = "Break-Length"
            labelName="Break Length"
            timeLength={this.state.shortBreakTime} 
            onChange={this.onShortBreakTimeChange}
            minimumChange={60}
            maximumLength={3600}
            minimumLength={60}
            isDisabled={this.isRoundedButtonDisabled}
          />
          <ReusableTimeConfigurationComponent 
            labelName='Session Length'
            className = "Session-Length"
            timeLength={this.state.focusTime} 
            onChange={this.onSessionTimeChange} 
            minimumChange={300} 
            maximumLength={7200} 
            minimumLength={600} 
            isDisabled={this.isRoundedButtonDisabled}
          />
        </div>
        <div className={"row timer-box"}>
            <TimerBox
              sessionName={this.sessionName}
              sessionTime={this.sessionTime}
              timerState={this.state.timerState}
              onTimerComplete={this.onTimerComplete}
              alarm={this.alarm}
            />
        </div>
        <div className={"row button-container"}>
          <ReusableButtonComponent
            className={"Start"}
            label={"Start"}
            isDisabled={this.isStartButtonDisabled}
            clickHandler={this.startButtonClickHandler}
          />
          <ReusableButtonComponent
            className={"Pause"}
            label={"Pause"}
            isDisabled={this.isPauseButtonDisabled}
            clickHandler={this.pauseButtonClickHandler}
          />
          <ReusableButtonComponent
            className={"Stop"}
            label={"Stop"}
            isDisabled={this.isResetButtonDisabled}
            clickHandler={this.resetButtonClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
