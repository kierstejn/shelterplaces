import React, {Fragment, FunctionComponent} from 'react';
import { Provider } from "react-redux";
import configureStore, { history } from './configureStore'
import {ConnectedRouter} from "connected-react-router";
import { ThemeProvider } from '@material-ui/core';
import {Route, BrowserRouter as Router, useHistory} from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";

//Pages
import MapPage from "./pages/MapPage";
import ProfilePage from "./pages/ProfilePage";
import CreateSitePage from "./pages/CreateSitePage";

//Util
import theme from "./util/theme/theme";
import Layout from "./components/layout/Layout";
import config from "./config";
import SnackBar from "./components/snackBar/SnackBar";


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
                audience={'http://cliffdivingsites/api'}
            >
                <Layout>
                    <Route path='/' exact={true} component={MapPage}/>
                    <ProtectedRoute path={'/profile'} component={ProfilePage} />
                    <ProtectedRoute path={'/sites/add'} component={CreateSitePage} />
                </Layout>
            </Auth0Provider>
        );
    };


    return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Router>
                  <SnackBar/>
                  <HasAccessToRouter/>
              </Router>
          </ThemeProvider>
      </Provider>
  );
}

export default App;
