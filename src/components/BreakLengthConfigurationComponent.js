import React, { Component } from 'react';
import ReusableTimeConfigurationComponent from "./ReusableTimeConfigurationComponent";

class BreakLengthConfigurationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'break-length': 300 // this value could be communicated to parent
        }
    }

    render() {
        return (
            <ReusableTimeConfigurationComponent labelName='Break Length' startValue={300} minimumChange={60} maximumBreakLength={3600} minimumBreakLength={60} />
        );
    }
}

export default BreakLengthConfigurationComponent;