import React from 'react';
import './style.css'
import Button from '@material-ui/core/Button';
import CountdownTimer from './CountdownTimer';
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import StagesEnum from "./StagesEnum";
import {speak} from "../../../helpers/speakHelper";
import {plural} from "../../../helpers/pluralHelper";
import {withTheme} from "@material-ui/styles";

function addNode({x, y}, el) {
    const div = document.createElement('div');
    div.setAttribute('class','redpoint');
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    el.appendChild(div)
}

// sets - подходы
// reps - повторения

const program = [
    {
        pause: 10,
        sets: [5,6,7,5]
    },
    {
        pause: 20,
        sets: [5,10,5,15]
    },
    {
        pause: 30,
        sets: [5,10,5,15]
    },
    {
        pause: 40,
        sets: [5,10,5,15]
    },
    {
        pause: 50,
        sets: [5,10,5,15]
    },
    {
        pause: 60,
        sets: [5,10,5,15]
    },
    {
        pause: 70,
        sets: [5,10,5,15]
    }
];

class PushUpsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            count: 0,
            doneCount: 0,
            setIndex: 0,
            stage: StagesEnum.Started
        };

        this.ref = React.createRef();
        this.startObj = {};
        this.targetCount = props.sets.reduce((sum, cur) => sum + cur, 0);
        this.blocked = false;
        this.blockedTimeout = null;
    }

    onClickStartHandler = (e) => {
        e.stopPropagation();
        if(this.blocked) {
            this.ref.current.style.filter = 'invert(1)';
            clearTimeout(this.blockedTimeout);
            this.blockedTimeout = setTimeout(()=>{
                this.blocked = false;
                this.ref.current.style.filter = '';
            } , 1000);

            return;
        }

        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        const time = Date.now();
        this.startObj = { x, y, time };
    }

    onClickEndHandler = (e) => {
        e.stopPropagation();
        if (this.blocked || this.state.stage != StagesEnum.InProgress) {
            speak('эээ');
            return;
        }

        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        const time = Date.now();
        const { state, ref } = this;
        const { data, count } = state;
        const { width, height } = ref.current.getBoundingClientRect();

        data.push({
            start: this.startObj,
            end: { x, y, time },
            client: {width: +width, height: +height}
        });

        this.blocked = true;

        this.setState({
            data,
            count: count + 1
        }, () => {
            addNode({x,y},ref.current);
            this.blockedTimeout = setTimeout(()=> this.blocked = false, 1000);

        });
        this.onClickComputes();

    }

    onClickComputes = () => {
        const { count, setIndex, doneCount } = this.state;
        const { sets } = this.props;

        const setDown = count - doneCount;
        const setTarget = sets[setIndex];

        if(count+1 === doneCount + sets[setIndex]){
            this.setState({
                doneCount: count+1,
                setIndex: setIndex + 1,
                stage: count+1 === this.targetCount? StagesEnum.Done : StagesEnum.Paused
            }, () => {
                count+1 === this.targetCount ? speak('Завершено') : speak('Сделано. Отдыхаем');
            });
        } else {
            speak((setTarget - setDown) - 1);
        }

    }

    setStage = stage => {
        this.setState({stage});
    }

    render() {
        const { stage, count, data, setIndex, doneCount } = this.state;
        const { sets, pause, onDone } = this.props;

        if((doneCount === 0 || count - doneCount === 0) && stage === StagesEnum.InProgress) {
            speak('Делаем ' + sets[setIndex] + ' ' + plural(['отжимание', 'отжимания', 'отжиманий'], sets[setIndex] ));
        }

        return <div
            className="pushupsGO"
            onMouseDown={this.onClickStartHandler}
            onTouchStart={this.onClickStartHandler}
            onMouseUp={this.onClickEndHandler}
            onTouchEnd={this.onClickEndHandler}
            onClick={e=>e.stopPropagation()}
            ref={this.ref}
            style={{backgroundColor: this.props.theme.palette.background.paper}}
        >
            <header>
                <Button
                    className="doneBtn"
                    color="primary"
                    onClick={e=>{ e.stopPropagation(); e.preventDefault(); this.state.count > 0 && this.props.onDone(this.state.data); }}>Завершить</Button>
            </header>
            <main>
                {stage === StagesEnum.Started && <CountdownTimer
                    max={5}
                    done={()=>{ this.setStage(StagesEnum.InProgress); }}
                />}
                {stage === StagesEnum.InProgress && <h1>{count}</h1>}
                {stage === StagesEnum.Paused && <CountdownTimer
                    max={pause}
                    done={()=>{this.setStage(StagesEnum.InProgress);}} />}
                {stage === StagesEnum.Done && <div>Готово! Нажмите завершить для сохранения упражнения.</div>}
            </main>
            <footer className="progress">
                <LinearProgress variant="determinate" value={(count / this.targetCount) * 100} />
                <ul className={'points'}>
                    {sets.map((step, i)=>{
                        const isCompleted = i < setIndex;
                        const isCurrent = i === setIndex;

                        let value = 0;
                        if (isCompleted) {
                            value = 100;
                        } else if(isCurrent) {
                            const doneInGroup = count - doneCount;
                            value = (doneInGroup / sets[setIndex]) * 100;
                        }

                        return <div className="stepItem" key={"set"+i}>
                            <span className="stepCapt">{step}</span>
                            <CircularProgress size={50} variant="static" value={value} />
                        </div>
                    })}
                </ul>
            </footer>
        </div>;
    }
};

PushUpsModal.defaultProps = {
    sets: program[0].sets,
    pause: program[0].pause
}

PushUpsModal.propTypes = {

};

export default withTheme(PushUpsModal);
