import React, { Component } from 'react';

class ReusableTimeConfigurationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.startValue
        }
    }

    handleChange = () => {
        const currentTime = this.state.time + this.props.minimumChange;
        const minutes = Math.floor(currentTime / 60);
        this.props.handleChange(minutes);
        console.log(minutes)
    }

     onIncrementButtonClick = () => {
        this.setState(prevState => {
            return {time: prevState.time + this.props.minimumChange}
        });
        this.handleChange();
    };

    onDecrementButtonClick = () => {
        this.setState(prevState => {
            return {time: prevState.time - this.props.minimumChange}
        });
        this.handleChange();
    };

    get incrementButtonDisabled() {
        return this.state.time >= this.props.maximumBreakLength;
    }

    get decrementButtonDisabled() {
        return this.state.time <= this.props.minimumBreakLength;
    }

    get timeString() {
        let minutes = Math.floor(this.state.time / 60);
        return minutes > 9 ? minutes : ` ${minutes}`
    }

    render() {
        return (
            <div>
                <span id={'label'}>{this.props.labelName}</span>
                <span><button id='decrement' onClick={this.onDecrementButtonClick} disabled={this.decrementButtonDisabled}>-</button></span>
                <span><span id={'time'}>{this.timeString}</span></span>
                <span><button id='increment' onClick={this.onIncrementButtonClick} disabled={this.incrementButtonDisabled}>+</button></span>
            </div>
        );
    }
}

export default ReusableTimeConfigurationComponent;