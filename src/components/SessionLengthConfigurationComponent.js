import React, { Component } from 'react';
import ReusableTimeConfigurationComponent from "./ReusableTimeConfigurationComponent";

class SessionLengthConfigurationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'session-length': 1500 // this value should be used to communicate value change
        }
    }

    render() {
        return (
            <ReusableTimeConfigurationComponent labelName='Session Length' startValue={1500} minimumChange={300} maximumBreakLength={7200} minimumBreakLength={600} />
        );
    }
}

export default SessionLengthConfigurationComponent;