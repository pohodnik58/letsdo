import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";

import './App.css';
import AuthContext from '../contexts/AuthContext';
import UsersList from './UsersList';
import SideMenu from './SideMenu';
import Header from './Header';
import PushUps from './PushUps';
import Main from './Main';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CircularProgress from "@material-ui/core/CircularProgress";

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: blueGrey,
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        maxWidth: 1980,
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
    const { user, loading } = useContext(AuthContext);
    const dbTestField = `/test/${user.uid}/foo`;


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    if(loading) {
        return <div style={{display:'flex', alignItems: "center", justifyContent:'center', height: '100vh'}}>
            <CircularProgress />
        </div>;
    }

    return (
            <Router>
                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
        </Router>
    );
}

export default App;
