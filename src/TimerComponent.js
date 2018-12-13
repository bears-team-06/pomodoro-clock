import React, { Component } from 'react';
import Timer from './Timer';
import './App.css';


class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      show: true
    };
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }
  DecreaseItem = () => {
    if (this.state.clicks== 0){
      this.setState({ clicks: 0 });
    }
    else{
      this.setState({ clicks: this.state.clicks - 1 });
    }
  }
  StartTimer = () => {
    console.log(this.state.clicks);
    if (this.state.clicks!= 0){
      <Timer time = {this.state.clicks}></Timer> // Expected an assignment or function call and instead saw an expression  no-unused-expressions, Though this expression is returning a value.
    }
  }

  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <button onClick={this.IncrementItem}>Click to increment by 1</button>
        <button onClick={this.DecreaseItem}>Click to decrease by 1</button>
        <button onClick={this.ToggleClick}>
          { this.state.show ? 'Hide number' : 'Show number' }
        </button>
        <button onClick={this.StartTimer}>Click to start the timer</button>
        { this.state.show ? <h2>{ this.state.clicks }</h2> : '' }
      </div>
    );
  }
}

export default TimerComponent;
