import React, { useRef, useState, useEffect } from 'react';
import './style.css'
import Button from '@material-ui/core/Button';
import CountdownTimer from './CountdownTimer';

function addNode({x, y}, el) {
    const div = document.createElement('div');
    div.setAttribute('class','redpoint');
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    el.appendChild(div)
}

const program = [
    {
        pause: 10,
        approach: [5,10,5,15]
    },
    {
        pause: 20,
        approach: [5,10,5,15]
    },
    {
        pause: 30,
        approach: [5,10,5,15]
    },
    {
        pause: 40,
        approach: [5,10,5,15]
    },
    {
        pause: 50,
        approach: [5,10,5,15]
    },
    {
        pause: 60,
        approach: [5,10,5,15]
    },
    {
        pause: 70,
        approach: [5,10,5,15]
    }
];

const PushUpsModal = ({onDone}) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [state, setState] = useState(0); // 0 начало, 1 подход, 2 пауза, 3 завершено
    const ref = useRef();
    let startObj = {};

    const clickStart = (e) => {
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        const time = Date.now();
        startObj = { x, y, time };
    }
    const clickEnd = (e) => {
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        const time = Date.now();
        const {width, height} = ref.current.getBoundingClientRect();

        data.push({
            start: startObj,
            end: { x, y, time },
            client: {width: +width, height: +height}
        });
        console.log(data);
        setData(data);
        setCount(count+1);
        addNode({x,y},ref.current)
    }

    useEffect(() => {
        let int = setInterval(() => {

        }, 1000);
    }, [])

    return <div
        className="pushupsGO"
        onMouseDown={clickStart}
        onTouchStart={clickStart}
        onMouseUp={clickEnd}
        onTouchEnd={clickEnd}
        ref={ref}
    >
            <Button className="doneBtn"  color="primary" onClick={e=>{ e.stopPropagation(); onDone(data); }}>Завершить</Button>
            {
                state === 0 ? <CountdownTimer max={5} done={()=>setState(1)} /> : <>
                    <h1>{data.reduce((acc, v) => acc+1, 0)}</h1>
                    <div className="progress">
                        {program[0].pause}
                    </div></>
            }

        </div>;
};

PushUpsModal.propTypes = {};

export default PushUpsModal;
