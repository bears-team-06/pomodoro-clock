import React from 'react'
function TimerBox(props) {
    return (
        <div>
            <span>{props.sessionName}</span>
            <span>{props.sessionTime}</span>
            <button onClick={props.onTimerComplete}>Change</button>
        </div>
    )
}

export default TimerBox;