import React, {Fragment, useEffect} from "react";
import * as OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useOktaAuth } from '@okta/okta-react';
import config from "../config";
import SignInWidget from "../components/authentication/SignInWidget";

const LoginPage = () => {

    const { authState, authService } = useOktaAuth();

    const login = async () => {
        // Redirect to '/' after login
        authService.login('/');
    };

    const logout = async () => {
        // Redirect to '/' after logout
        authService.logout('/');
    };

    if (authState.isPending) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <SignInWidget/>
        </Fragment>
    )
};

export default LoginPage;