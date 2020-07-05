import React, {FunctionComponent, Fragment} from 'react';

import Header from "./Header";
import Footer from "./Footer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh',
            height: '100vh',
            //display: 'flex',
            overflow: 'scroll',
            //justifyContent: 'space-between',
            //flexDirection: 'column',
            //flex: '1 0 auto',
            width: '100%',
        },
        map: {
            minHeight: 'calc(100vh - 150px)',
            display: 'flex',
            flex: '1 0 auto',
            width: '100%'
        }
    }),
);

const Layout: FunctionComponent = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header/>
            <div className={classes.map}>
                {children}
            </div>
            <Footer/>
        </div>
    )
};

export default Layout;