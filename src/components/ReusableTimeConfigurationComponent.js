import React, { Component } from 'react';

class ReusableTimeConfigurationComponent extends Component {

    onIncrementButtonClick = () => {
        this.props.onChange(this.props.timeLength + this.props.minimumChange)
    };

    onDecrementButtonClick = () => {
        this.props.onChange(this.props.timeLength - this.props.minimumChange)
    };

    get incrementButtonDisabled() {
        return this.props.timeLength >= this.props.maximumBreakLength;
    }

    get decrementButtonDisabled() {
        return this.props.timeLength <= this.props.minimumBreakLength;
    }

    get timeString() {
        let minutes = Math.floor(this.props.timeLength / 60);
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