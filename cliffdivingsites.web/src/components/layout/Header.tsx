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
import {Button, CircularProgress} from "@material-ui/core";

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
        authButton: {
            color: 'white',

        },
        circularProgress: {
            color: 'white'
        }
    }),
);

const Header: FunctionComponent = () => {

    const { authState, authService } = useOktaAuth();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAuth = async () => {
        if(authState.isAuthenticated){
            authService.logout('/');
        } else {
            authService.login('/');
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h4" className={classes.title}>
                        CliffDivingSites
                    </Typography>
                    <div>
                        <Button
                            onClick={handleAuth}
                            className={classes.authButton}
                        >
                            {authState.isPending && <CircularProgress size={20} className={classes.circularProgress}/>}
                            {!authState.isPending && authState.isAuthenticated && 'LOGOUT'}
                            {!authState.isPending && !authState.isAuthenticated && 'LOGIN/REGISTER'}

                        </Button>

                        <a href="https://dev-880092.okta.com/oauth2/v1/authorize?idp=0oai7cq86Z5IKkEJG4x6&client_id=0oahhxwioSbJAzJSm4x6&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2Fkeen%2Dwiles%2D2fb95e%2Enetlify%2Eapp%2Fimplicit%2Fcallback%2F&state=WM6D&nonce=YsG76jo">Sign in with Identity Provider</a>

                        {authState.isAuthenticated &&
                            <Fragment>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    className={classes.accountCircle}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </Fragment>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;