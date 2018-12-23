import React from 'react';

function ReusableButtonComponent(props) {
    return (
        <button className={'timer-button'} disabled={props.isDisabled} onClick={props.clickHandler}>{props.label}</button>
    )
}

export default ReusableButtonComponent;