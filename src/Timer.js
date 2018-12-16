import React, { Component } from 'react';

class Timer extends React.Component{
    render() {
      return (
        <div>
          <h1 style={{ fontSize: 100, marginLeft:100 }}>{this.props.value}:{this.props.seconds}</h1>
        </div>
      );
    }
}

    
//ReactDOM.render(<Timer />, mountNode);
export default Timer;