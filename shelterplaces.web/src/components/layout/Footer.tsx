import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '50px',
            minHeight: '50px',
            backgroundColor: theme.palette.secondary.main,
            display: 'flex',
            justifyContent: 'center'
        },
        copyRight: {
            color: theme.palette.primary.contrastText,
            alignSelf: 'center'
        },
    })
);

const Footer = () => {
    const classes = useStyles();
    const copyRight = () => {
        return (
            <Typography variant="body2" className={classes.copyRight} align="center">
                {'Copyright © '}
                <Link>
                    cliffdivingsites.com
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        );
    }


    return (
        <div className={classes.root}>
            {copyRight()}
        </div>
    )
};

export default Footer;