import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {beep, beep2} from "../../../../helpers/beepHelper";
import Typography from "@material-ui/core/Typography";

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
        this.props.beforeStart && this.props.beforeStart();

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
        return <div style={{textAlign: 'center'}}>
            <Typography variant="h2" color="textSecondary" align="center">{this.state.current}</Typography>
            <Typography variant="caption" color="textSecondary" align="center">{this.props.caption}</Typography>
        </div>
    }
};

CountdownTimer.defaultProps = {
    min: 0,
    caption: 'пауза'
};

CountdownTimer.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number,
    done: PropTypes.func.isRequired,
    beforeStart: PropTypes.func,
    beforeDone: PropTypes.func,
    onClick: PropTypes.func,
};

export default CountdownTimer;
