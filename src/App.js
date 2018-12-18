import React, { Component } from "react";
import BreakLengthConfigurationComponent from "./components/BreakLengthConfigurationComponent";
import "./App.css";
import SessionLengthConfigurationComponent from "./components/SessionLengthConfigurationComponent";
import ReusableButtonComponent from "./components/ReusableButtonComponent";
import TimerBox from "./components/TimerBox";

const TimerState = {
  Stopped: 0,
  Running: 1,
  Paused: 2
};

const PomodoroState = {
    Focus: 0,
    ShortBreak: 1,
    LongBreak: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        timerState: TimerState.Stopped,
        pomodoroState: PomodoroState.Focus,
        focusTime: 1500,
        shortBreakTime: 300,
        longBreakTime: 900,
        sessionNumber: 1
    };
  }

  set timerState(state) {
      // this is the place to decide what to do with timers
      switch (state) {
          case TimerState.Running:
              console.log('Start running');
              break;
          case TimerState.Stopped:
               console.log('Stop Running');
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

  setNextPomodoroState = () => {
      let nextState;
      switch(true) {
          case this.state.sessionNumber % 2 !== 0:
              nextState = PomodoroState.Focus;
              break;
          case this.state.sessionNumber % 6 === 0:
              nextState = PomodoroState.LongBreak;
              break;
          case this.state.sessionNumber % 2 === 0:
              nextState = PomodoroState.ShortBreak;
              break;
          default:
              // do nothing
      }
      this.setState({
          'pomodoroState': nextState
      })
  }

  incrementSessionNumber = () => {
      this.setState(prevState => {
          return {sessionNumber: prevState.sessionNumber + 1}
      })
  }

  onTimerComplete = () => {
      this.timerState = TimerState.Paused;
      this.incrementSessionNumber();
      this.setNextPomodoroState();
  }

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
              return ""
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
    return false;
  }

  startButtonClickHandler = () => {
    this.timerState = TimerState.Running
  }

  get isPauseButtonDisabled() {
    return false;
  }

  pauseButtonClickHandler = () => {
    this.timerState = TimerState.Paused;
  }

  get isStopButtonDisabled() {
    return false;
  }

  stopButtonClickHandler = () => {
      this.timerState = TimerState.Stopped;
  }

  render() {
    return (
      <div>
        <BreakLengthConfigurationComponent />
        <SessionLengthConfigurationComponent />
        <div className="row">
          <div className="col-md-4">
              <TimerBox sessionName={this.sessionName} sessionTime={this.sessionTime} onTimerComplete={this.onTimerComplete}/>
          </div>
          <div className="col-md-4">
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
      </div>
    );
  }
}

export default App;
