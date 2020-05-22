import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AuthContext from '../../contexts/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    }
}));

const Header = ({ isMenuOpen, onToggleMenu, title }) => {
    const { user, loginHandler, logoutHandler } = useContext(AuthContext);
    const classes = useStyles();

    return <AppBar>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=>onToggleMenu(!isMenuOpen)}
                edge="start"
                className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
                {title}
            </Typography>
            {user.uid ? <Button color="inherit" onClick={logoutHandler}>Выйти</Button> : <Button onClick={loginHandler} color="inherit">Войти</Button>}
            <Avatar src={user.uid ? user.photoURL : null} />
        </Toolbar>
    </AppBar>;
};

Header.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    onToggleMenu: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default Header;
