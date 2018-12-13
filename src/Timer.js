import React, { Component } from 'react';

class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { seconds: props.time};
      }
    
      tick() {
        this.setState(state => ({
          seconds: state.seconds - 1
        }));
      }
    
      componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    
      render() {
        return (
          <div>
            Seconds: {this.state.seconds}
          </div>
        );
      }
    }

    
//ReactDOM.render(<Timer />, mountNode);
export default Timer;