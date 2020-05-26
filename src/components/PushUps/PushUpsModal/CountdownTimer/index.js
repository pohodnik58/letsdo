import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = (props) => {
    const [current, setCurrent] = useState(props.max);
    if (current <= 0) {
        props.done && props.done();
    } else {
        setTimeout(()=>{
            setCurrent(current-1);
        }, 1000);
    }

    return current;
};

CountdownTimer.defaultProps = {
    min: 0
};

CountdownTimer.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number,
    done: PropTypes.func.isRequired,
};

export default CountdownTimer;
