import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {beep, beep2} from "../../../../helpers/beepHelper";
import Typography from "@material-ui/core/Typography";
import video from "../run.mp4";
import {playMp3} from "../../../../helpers/mp3Helper";
import timerDone from '../../sounds/plink.mp3'
import pip from '../../sounds/pip.mp3'

class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.max
        }

        this.to = null;
        this.videoRef = React.createRef();
    }

    componentDidMount = () => {
        const {props} = this;
        this.props.beforeStart && this.props.beforeStart();

        this.to = setInterval(() => {
            const { current } = this.state;
            if (current <= 0) {
                playMp3(pip).then(()=>props.done && props.done())

                return null;
            } else {
                if( current < 4) {
                    playMp3(timerDone)

                };

                if( current === 1) {
                    props.beforeDone && props.beforeDone()
                };

                this.setState({ current: current - 1 })
            }
        }, 1000)
        this.videoRef.current.play();
        this.videoRef.current.addEventListener('play', this.onVideoPlay);
        this.videoRef.current.addEventListener('pause', this.onVideoPause);
    }

    componentWillUnmount = () => {
        clearInterval(this.to);
        this.videoRef.current.pause();
        this.videoRef.current.removeEventListener('play', this.onVideoPlay);
        this.videoRef.current.removeEventListener('pause', this.onVideoPause);
    }


    onVideoPlay = () => {}
    onVideoPause = () => {}

    render() {
        return <div style={{textAlign: 'center'}}>
            <video loop autoPlay muted ref={this.videoRef} width={4} height={4} className="videofake">
                <source src={video} type="video/mp4" />
            </video>
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
