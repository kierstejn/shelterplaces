import React, {FunctionComponent, Fragment} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {useOktaAuth} from "@okta/okta-react";
import {Button, CircularProgress, Link} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            height: '100px'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            fontFamily: 'Abril Fatface',
            color: 'white'
        },
        toolBar: {
            flexGrow: 1
        },
        accountCircle: {
            color: 'white'
        },
        button: {
            color: 'white',
        },
        circularProgress: {
            color: 'white'
        }
    }),
);

const Header: FunctionComponent = () => {

    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
    const history = useHistory();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleProfileClicked = () => {
        history.push('/profile')
    };

    const handleAuth = async () => {
        if(!isAuthenticated){
            await loginWithRedirect();
        } else {
            logout()
        }
    };

    const handleAddNewSite = () => {
        history.push('/sites/add')
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Link onClick={() => history.push('/')} variant="h4" className={classes.title}>
                        CliffDivingSites
                    </Link>
                    <div>
                        {isAuthenticated &&
                        <Button
                            onClick={handleAddNewSite}
                            className={classes.button}
                            disabled={isLoading}
                        >
                            {'ADD NEW SITE'}
                        </Button>
                        }
                        <Button
                            onClick={handleAuth}
                            className={classes.button}
                            disabled={isLoading}
                        >
                            {isLoading && <CircularProgress size={20} className={classes.circularProgress}/>}
                            {!isLoading && isAuthenticated && 'LOGOUT'}
                            {!isLoading && !isAuthenticated && 'LOGIN/REGISTER'}
                        </Button>
                        {isAuthenticated &&
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleProfileClicked}
                                color="inherit"
                                className={classes.accountCircle}
                            >
                                <AccountCircle />
                            </IconButton>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;