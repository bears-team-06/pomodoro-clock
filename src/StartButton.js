import React, { Component } from 'react';

class StartButton extends Component {
    render() {
      return (
        <div style={{ marginLeft: 130 }}>
          <button className="btn btn-lg btn-success" disabled={!this.props.value} onClick={this.props.startCountDown}>Start</button>
        </div>
  
      );
    }
  }

    
//ReactDOM.render(<Timer />, mountNode);
export default StartButton;