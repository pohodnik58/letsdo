import React, { useRef, useState } from 'react';
import './style.css'
import Button from '@material-ui/core/Button';

function addNode({x, y}, el) {
    const div = document.createElement('div');
    div.setAttribute('class','redpoint');
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    el.appendChild(div)
}

const PushUpsModal = ({onDone}) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
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

    return <div
        className="pushupsGO"
        onMouseDown={clickStart}
        onTouchStart={clickStart}
        onMouseUp={clickEnd}
        onTouchEnd={clickEnd}
        ref={ref}
    >
            <Button className="doneBtn"  color="primary" onClick={e=>{ e.stopPropagation(); onDone(data); }}>Завершить</Button>
            <h1>{data.reduce((acc, v) => acc+1, 0)}</h1>
        </div>;
};

PushUpsModal.propTypes = {};

export default PushUpsModal;
