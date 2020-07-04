import React, {FunctionComponent, Fragment} from 'react';

import Header from "./Header";
import Footer from "./Footer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: 'calc(100vh - 150px)',
            height: 'calc(100vh - 150px)',
            overflow: 'visible'
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
                <Footer/>
            </div>
        </Fragment>
    )
};

export default Layout;