import React, {Component} from "react";
import TimerState from "../TimerState"

class TimerBox extends Component {
    componentWillReceiveProps(newProps) {
        if(this.state.timerState !== TimerState.Running && newProps.timerState === TimerState.Running) {
            this.startTicking()
        }
        const hasStateChangedToPause = this.state.timerState === TimerState.Running && newProps.timerState === TimerState.Paused
        const hasStateChangedToStopped = this.state.timerState !== TimerState.Stopped && newProps.timerState === TimerState.Stopped
        const hasSessionTimeChanged = this.props.sessionTime !== newProps.sessionTime 
        if(hasStateChangedToPause || hasStateChangedToStopped) {
            this.stopTimer()
        }
        if(hasSessionTimeChanged || hasStateChangedToStopped) {
            this.setState({
                timeInSeconds: newProps.sessionTime
            })
        }
        this.setState({
            timerState: newProps.timerState
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            timeInSeconds: props.sessionTime,
            timerState: props.timerState
        };
        this.timer = null
    }

    get minutes() {
        let minutes = parseInt(this.state.timeInSeconds / 60);
        return minutes > 9 ? `${minutes}` : `0${minutes}`;
    }

    get seconds() {
        let seconds = parseInt(this.state.timeInSeconds % 60);
        return seconds > 9 ? `${seconds}` : `0${seconds}`;
    }

    stopTimer() {
        this.timer && clearInterval(this.timer)
    }

    onTimerComplete() {
        this.stopTimer()
        this.props.onTimerComplete && this.props.onTimerComplete()
        this.playAlarm();
    }

    startTicking = () => {
        this.timer = setInterval(() => {
            if (this.state.timeInSeconds === 0) {
                this.onTimerComplete()
            } else {
                this.setState((state) => ({
                    timeInSeconds: state.timeInSeconds - 1
                }));
            }
        }, 1000);
    }

    playAlarm() {
        const playPromise = this.props.alarm.playSound();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log('Alarm audio playback started.');
            }).catch(function(error) {
                console.log(`Alarm audio playback error: ${error.message}`);
            });
        }
    }

    render() {
        return (
            <div>
                <span id="timer-box-name">{this.props.sessionName}</span>
                <span id="timer-box-time">{`${this.minutes} : ${this.seconds}`}</span>
            </div>
        );
    }
}

export default TimerBox;
