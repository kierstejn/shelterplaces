import React, {FunctionComponent, Fragment} from "react"
import {BrowserRouter as Router, Route, Link, Switch, BrowserRouter, RouteComponentProps} from "react-router-dom";

// @ts-ignore
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

//PAGES
import LoginPage from './pages/LoginPage'
import IndexPage from "./pages/IndexPage";

const routes = (
        <Fragment>
            <Route path={'/implicit/callback'} component={LoginCallback}/>
            <SecureRoute path={"/index"} component={IndexPage}/>
            <Route path={"/"} component={IndexPage}/>
        </Fragment>
);

export default routes;