import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import AuthContext from '../contexts/AuthContext';
import UsersList from './UsersList';
import SideMenu from './SideMenu';
import Header from './Header';
import PushUps from './PushUps';
import Main from './Main';

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
            <Router>
                <div className={classes.root}>
                <CssBaseline />
                <Header onToggleMenu={setOpen} isMenuOpen={open} title={"На спорте"} />
                <SideMenu open={open} onChangeOpen={setOpen} />
                <main
                    className={clsx(classes.content)}
                >
                    <div className={classes.drawerHeader} />
                    <Switch>
                        <Route path="/users">
                            {user.uid ? <UsersList /> : 'Нужно авторизоваться'}
                        </Route>
                        <Route path="/pushups">
                            <PushUps />
                        </Route>
                        <Route path="*">
                            <Main />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
