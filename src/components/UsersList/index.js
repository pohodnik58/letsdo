import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUsersListAsync } from '../../services/userService';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function UsersList() {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetch = async () => {
            const kv = await getUsersListAsync();
            setList(Object.values(kv))
            setLoading(false)
        }
        fetch();
    },[])

    if(loading){
        return <CircularProgress />;
        return;
    }

    return (
        <List className={classes.root}>
            {
                list.map(x => <React.Fragment key={x.uid}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={x.displayName} src={x.photoURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={x.displayName}
                            secondary={x.email}
                        />
                    </ListItem>
                    <Divider />
                </React.Fragment>)
            }
        </List>
    );
}
