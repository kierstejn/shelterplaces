import React, {FunctionComponent, Fragment} from 'react';

import Header from "./Header";
import Footer from "./Footer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: 'calc(100vh - 100px)',
            height: '50px',
            overflow: 'visible',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
        },
        map: {
            display: 'flex',
            flexGrow: 1,
            width: '100%'
        }
    }),
);

const Layout: FunctionComponent = ({children}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Header/>
            <div className={classes.root}>
                <div className={classes.map}>
                    {children}
                </div>
                <Footer/>
            </div>
        </Fragment>
    )
};

export default Layout;