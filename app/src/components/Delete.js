import React from 'react';

const Delete = (props) => {
    return(
        <button onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default Delete;