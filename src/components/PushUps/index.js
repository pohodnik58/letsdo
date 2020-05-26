import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PushUpsModal from './PushUpsModal';
import AuthContext from '../../contexts/AuthContext';
import { dbGetNewKey, dbRead, dbUpdate } from '../../services/dbService';

const PushUps = (props) => {
    const [isShowModal, setShowModal] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [myPushups, setMyPushups] = useState(null);

    const { user } = useContext(AuthContext);
    useEffect(()=>{
        async function fetchData(){
            dbRead(`/users/${user.uid}/pushups/`).then(res => {
                setMyPushups(res.val())
            });

        }
        user.uid && fetchData();
    }, [user.uid])
    return <section>
        <Button onClick={()=>{
            setStartTime(Date.now());
            setShowModal(true)
        }}>Начать</Button>
        {isShowModal && <PushUpsModal onDone={(data)=>{
            const pushupRef = '/pushups/';
            const pushupsUpdates = {};
            const endTime = Date.now();
            data.forEach(x => pushupsUpdates[pushupRef + dbGetNewKey(pushupRef)] = { ...x, uid: user.uid, startTime, endTime });
            dbUpdate(pushupsUpdates);

            const userPushupsRef = `/users/${user.uid}/pushups/`;
            const key = dbGetNewKey(userPushupsRef);
            const userPushupsPatch = {};
            userPushupsPatch[userPushupsRef + key] = {
                startTime,
                endTime,
                steps: data
            }

            dbUpdate(userPushupsPatch);

            setShowModal(false);
        }}/>}

        <ul>
            {myPushups && Object.values(myPushups).map(x=><li>
                {new Date(x.startTime).toLocaleDateString()}  {new Date(x.startTime).toLocaleTimeString()} - {new Date(x.endTime).toLocaleTimeString()}
                | <strong>{x.steps.length.toString()}</strong>
            </li>)}
        </ul>


    </section>;
};

PushUps.propTypes = {};

export default PushUps;
