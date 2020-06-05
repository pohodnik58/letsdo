import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AuthContext from '../../contexts/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        padding: theme.spacing(1),
    },
    ava: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const SideMenu = (props) => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();

    return  <SwipeableDrawer
        className={classes.drawer}
        anchor="left"
        onClose={()=>props.onChangeOpen(false)}
        onOpen={()=>props.onChangeOpen(true)}
        open={props.open}
        classes={{
            paper: classes.drawerPaper,
        }}
    >
        <div className={classes.drawerHeader}>
            {user.uid && <>
                <Avatar alt={user.displayName} src={user.photoURL} className={classes.ava} />
                <Typography variant="subtitle1" gutterBottom gutterTop>
                    {user.email}
                </Typography>
            </>}
        </div>
        <Divider />
        <List>
            <ListItem button component={Link} to="/users" onClick={()=>props.onChangeOpen(false)}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary={'Пользователи'} />
            </ListItem>
            <ListItem button  component={Link} to="/pushups" onClick={()=>props.onChangeOpen(false)}>
                <ListItemIcon><ImportExportIcon /></ListItemIcon>
                <ListItemText primary={'Отжимания'} />
            </ListItem>
        </List>
    </SwipeableDrawer>;
};

SideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    onChangeOpen: PropTypes.func.isRequired,
};

export default SideMenu;
