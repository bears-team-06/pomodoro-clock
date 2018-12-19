import React, { Component } from "react";
import BreakLengthConfigurationComponent from "./components/BreakLengthConfigurationComponent";
import "./App.css";
import SessionLengthConfigurationComponent from "./components/SessionLengthConfigurationComponent";
import ReusableButtonComponent from "./components/ReusableButtonComponent";

const TimerState = {
  Stopped: 0,
  Running: 1,
  Paused: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        timerState: TimerState.Stopped,
        time: ''
    };
    this.changeTime = this.changeTime.bind(this);
  }

  changeTime(newTime) {
    this.setState({
      time: newTime
    });
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
        <BreakLengthConfigurationComponent handleChange={this.changeTime}/>
        <SessionLengthConfigurationComponent handleChange={this.changeTime}/>
        <div className="row">
          <div className="col-md-4" />
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
            <div>
                Display time for tests: {this.state.time}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
