import React from 'react';
import Routes from "./routes";
import { Provider } from "react-redux";
import configureStore, { history } from './configureStore'
import {ConnectedRouter} from "connected-react-router";

// @ts-ignore
import { Security, LoginCallback } from "@okta/okta-react";
import { ThemeProvider } from '@material-ui/core';
import theme from "./util/theme/theme";
import {Route, BrowserRouter as Router} from "react-router-dom";
import IndexPage from "./pages/IndexPage";

import config from "./config";
import Layout from "./components/layout/Layout";



const store = configureStore();



const customAuthHandler = () => {
    history.push('/login');
};

function App() {
  return (
      <Provider store={store}>

              <ThemeProvider theme={theme}>
                  <Router>
                      <Security {...config.oidc}>
                          <Layout>
                              <Route path='/implicit/callback' component={LoginCallback}/>
                              <Route path='/' exact={true} component={IndexPage}/>
                          </Layout>
                      </Security>
                  </Router>
              </ThemeProvider>
      </Provider>
  );
}

export default App;
