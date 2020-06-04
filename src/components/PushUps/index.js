import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PushUpsModal from './PushUpsModal';
import AuthContext from '../../contexts/AuthContext';
import {dbGetNewKey, dbGetRef, dbRead, dbReadSorted, dbUpdate} from '../../services/dbService';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {plural} from "../../helpers/pluralHelper";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";


const today = new Date().toLocaleDateString();
const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1
    },
    root: {
        position: 'relative',
        minHeight: 200,
    }
}));


const PushUps = (props) => {
    const [isShowModal, setShowModal] = useState(false);
    const [myPushups, setMyPushups] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
const classes = useStyles();

    const { user } = useContext(AuthContext);
    useEffect(()=>{
        async function fetchData(){
            const ref = `/users/${user.uid}/pushups/`
            dbReadSorted(ref, 'startTime').then(res => {
                const keyValues = res.val();
                if (!keyValues){
                    setLoading(false);
                    return;
                }
                const result = new Array(Object.keys(keyValues).length);
                let cou = 0;
                Object.entries(keyValues).forEach(([key, val], i) => {
                    if(!val.steps) {
                        return;
                    }
                    cou+= val.steps.length;
                    result[i] = {id: key, ...val };
                });

                setTotalCount(cou);
                setMyPushups(result.reverse())
                setLoading(false);
            });
        }
        user.uid && fetchData();
    }, [user.uid]);

    if(loading) {
        return <CircularProgress />;
    }

    return <section className={classes.root}>
        <Typography variant="h4">
            Отжимания
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Вы
            сделали <Typography variant="body1" color="textPrimary" component={"span"}>{totalCount}</Typography>&nbsp;
            {plural(['отжимание', 'отжимания', 'отжиманий'], totalCount)}
        </Typography>
        <Divider variant="fullWidth" />

        <Fab className={classes.fab} variant="extended" color="primary" onClick={()=>{
            setShowModal(true)
        }}>
            <AddIcon />
            Начать
        </Fab>
        {isShowModal && <PushUpsModal onDone={({ steps, pauses, startTime, endTime })=>{

            const userPushupsRef = `/users/${user.uid}/pushups/`;
            const key = dbGetNewKey(userPushupsRef);
            const userPushupsPatch = {};
            userPushupsPatch[userPushupsRef + key] = {
                startTime,
                endTime,
                steps,
                pauses
            }

            dbUpdate(userPushupsPatch);

            const pushupRef = '/pushups/';
            const pushupsUpdates = {
                [pushupRef + dbGetNewKey(pushupRef)]: {
                    uid: user.uid,
                    count: steps.length,
                    startTime,
                    endTime,
                    pausesDuration: pauses.reduce((acc, { end, start }) => acc + (end - start), 0)
                }
            };
            dbUpdate(pushupsUpdates);

            const uplist = [{
                id: key,
                startTime,
                endTime,
                steps
            }].concat(myPushups)
            setMyPushups(uplist)

            const userTotPushupsRef = `/users/${user.uid}/pushupsCount`;
            const userTotPushupsPatch = {
                [userTotPushupsRef]: totalCount + steps.length
            };

            setTotalCount(totalCount + steps.length);


            dbUpdate(userTotPushupsPatch);


            setShowModal(false);
        }}/>}

        <List>
                {
                    myPushups.length > 0 && myPushups.map(x => {
                        const count = x.steps && x.steps.length;
                        const d1 = new Date(x.startTime);
                        const d2 = new Date(x.endTime);

                        let dateName = d1.toLocaleDateString();
                        if(dateName === today) {
                            dateName = 'Сегодня'
                        } else if(dateName === yesterday) {
                            dateName = 'Вчера'
                        }

                        const timeName = d1.toLocaleTimeString() + ' - ' + d2.toLocaleTimeString();

                        return <ListItem key={x.id} button>
                            <ListItemText
                                primary={`${count} ${plural(['отжимание', 'отжимания', 'отжиманий'], count)}`}
                                secondary={`${dateName} ${timeName}`}
                            />
                    </ListItem>
                    })
                }
        </List>
    </section>;
};

PushUps.propTypes = {};

export default PushUps;
