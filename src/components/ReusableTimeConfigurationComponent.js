import React, { Component } from 'react';

class ReusableTimeConfigurationComponent extends Component {

    onIncrementButtonClick = () => {
        this.props.onChange(this.props.timeLength + this.props.minimumChange)
    };

    onDecrementButtonClick = () => {
        this.props.onChange(this.props.timeLength - this.props.minimumChange)
    };

    get incrementButtonDisabled() {
        return (this.props.timeLength >= this.props.maximumLength || this.props.isDisabled);
    }

    get decrementButtonDisabled() {
        return (this.props.timeLength <= this.props.minimumLength || this.props.isDisabled);
    }

    get timeString() {
        let minutes = Math.floor(this.props.timeLength / 60);
        return minutes > 9 ? minutes : ` ${minutes}`
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
                
                <button className={'increment btn rounded-button'}
                        onClick={this.onIncrementButtonClick} 
                        disabled={this.incrementButtonDisabled}>
                    <span>+</span>
                </button>
            </div>
        );
    }
}

export default ReusableTimeConfigurationComponent;