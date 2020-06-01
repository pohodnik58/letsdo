import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {beep, beep2} from "../../../../helpers/beepHelper";

class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.max
        }

        this.to = null;
    }

    componentDidMount = () => {
        const {props} = this;

        this.to = setInterval(() => {
            const { current } = this.state;
            if (current <= 0) {
                beep2().then(()=>props.done && props.done())

                return null;
            } else {
                if( current < 4) {
                    beep();
                };

                if( current === 1) {
                    props.beforeDone && props.beforeDone()
                };

                this.setState({ current: current - 1 })
            }
        }, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.to);
    }



    render() {
        return <h3>{this.state.current}</h3>
    }
};

CountdownTimer.defaultProps = {
    min: 0
};

CountdownTimer.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number,
    done: PropTypes.func.isRequired,
    beforeStart: PropTypes.func,
    beforeDone: PropTypes.func,
};

export default CountdownTimer;
