import React, {Fragment, FunctionComponent} from 'react';
import { Provider } from "react-redux";
import configureStore, { history } from './configureStore'
import {ConnectedRouter} from "connected-react-router";

// @ts-ignore
import { ThemeProvider } from '@material-ui/core';
import theme from "./util/theme/theme";
import {Route, BrowserRouter as Router, useHistory} from "react-router-dom";
import IndexPage from "./pages/IndexPage";

import config from "./config";
import Layout from "./components/layout/Layout";

import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import ProfilePage from "./pages/ProfilePage";

const store = configureStore();

function App() {

    interface ProtectedRouteProps {
        component: FunctionComponent
        path: string
    }

    const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ component, path }) => (
        <Route component={withAuthenticationRequired(component)} path={path} />
    );


    const HasAccessToRouter = () => {

        const history = useHistory();

        const onRedirectCallback = (appState: any) => {
            // Use the router's history module to replace the url
            history.replace(appState?.returnTo || window.location.pathname);
        };

        return (
            <Auth0Provider
                domain="dev-5leq0ojb.eu.auth0.com"
                clientId="LLLMxnAvBOMR7yrzsxHblOj8w3nw3EWL"
                redirectUri={window.location.origin}
                onRedirectCallback={onRedirectCallback}
            >
                <Layout>
                    <Route path='/' exact={true} component={IndexPage}/>
                    <ProtectedRoute path={'/profile'} component={ProfilePage} />
                </Layout>
            </Auth0Provider>
        );
    };


    return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Router>
                  <HasAccessToRouter/>
              </Router>
          </ThemeProvider>
      </Provider>
  );
}

export default App;
