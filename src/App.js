import React, { Component } from 'react';
import logo from './logo.svg';
import MyComponent from './MyComponent';
import TimerComponent from './TimerComponent';
import ButtonComponent from './ButtonComponent';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
      <TimerComponent/>
      </div>
    );
  }
}

export default App;
