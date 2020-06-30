import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '50px',
            backgroundColor: theme.palette.secondary.main
        }
    }),
);

const Footer = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>

        </div>
    )
};

export default Footer;