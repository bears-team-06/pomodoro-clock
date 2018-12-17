import React from 'react';

function ReusableButtonComponent(props) {
    return (
        <button disabled={props.isDisabled} onClick={props.clickHandler}>{props.label}</button>
    )
}

export default ReusableButtonComponent;