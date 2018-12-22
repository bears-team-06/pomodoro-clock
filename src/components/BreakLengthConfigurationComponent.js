import React from "react";
import ReusableTimeConfigurationComponent from "./ReusableTimeConfigurationComponent";

function BreakLengthConfigurationComponent(props) {
  return (
    <ReusableTimeConfigurationComponent
      labelName="Break Length"
      timeLength={props.time}
      minimumChange={60}
      maximumBreakLength={3600}
      minimumBreakLength={60}
      onChange={props.onShortBreakTimeChange}
    />
  );
}

export default BreakLengthConfigurationComponent;
