import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';


import './App.css';
import AuthContext from '../contexts/AuthContext';
import { dbCreate, dbDelete, dbRead, dbUpdate } from '../services/dbService';
import UsersList from './UsersList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SideMenu from './SideMenu';
import Header from './Header';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

const App = () => {
    const { user } = useContext(AuthContext);
    const dbTestField = `/test/${user.uid}/foo`;


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header onToggleMenu={setOpen} isMenuOpen={open} title={"На спорте"} />
            <SideMenu open={open} onChangeOpen={setOpen} />
            <main
                className={clsx(classes.content)}
            >
                <div className={classes.drawerHeader} />
                {user.uid && <UsersList />}


            </main>
        </div>
    );
}

export default App;
