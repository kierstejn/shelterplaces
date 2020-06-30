import React, {FunctionComponent, Fragment} from 'react';

import Header from "./Header";
import Footer from "./Footer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 'calc(100vh - 150px)',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);

const Layout: FunctionComponent = ({children}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Header/>
            <div className={classes.root}>
                {children}
            </div>
            <Footer/>
        </Fragment>
    )
};

export default Layout;