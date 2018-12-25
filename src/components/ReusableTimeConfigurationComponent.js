import React, { Component } from 'react';

class ReusableTimeConfigurationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.startValue
        }
    }

    onIncrementButtonClick = () => {
        this.setState(prevState => {
            return {time: prevState.time + this.props.minimumChange}
        })
    };

    onDecrementButtonClick = () => {
        this.setState(prevState => {
            return {time: prevState.time - this.props.minimumChange}
        })
    };

    get incrementButtonDisabled() {
        return this.state.time >= this.props.maximumBreakLength;
    }

    get decrementButtonDisabled() {
        return this.state.time <= this.props.minimumBreakLength;
    }

    get timeString() {
        let minutes = Math.floor(this.state.time / 60);
        return minutes > 9 ? minutes : `${minutes}`
    }

    render() {
        return (
            <div className={'length-configuration'}>
                <span className={'label'}>{this.props.labelName}</span>
                
                <button className={'decrement btn rounded-button'} 
                        onClick={this.onDecrementButtonClick} 
                        disabled={this.decrementButtonDisabled}>
                    <span>-</span>
                </button>
                                
                <span className={'time'}>{this.timeString}</span>
                
                <button className={'decrement btn rounded-button'} 
                        onClick={this.onIncrementButtonClick} 
                        disabled={this.incrementButtonDisabled}>
                    <span>+</span>
                </button>
            </div>
        );
    }
}

export default ReusableTimeConfigurationComponent;