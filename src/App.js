import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  createMuiTheme, ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import * as colors from "@material-ui/core/colors";

import NavListSetting from './containers/navListSetting';
import Index from './containers/Index';

import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./auth/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";


export default () => { 
    const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue[900],
      },
      type: "dark",
    },
    });
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App></App>
    </ThemeProvider>
  );
}

 const App = () => {
  return (
    <div>
      <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Index} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <PrivateRoute exact path='/' component={Index} /> */}
          {/* <PrivateRoute exact path="/" component={Home} /> */}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path='/nav-list-setting' component={NavListSetting} />
        </Switch>
        </Router>
      </AuthProvider>
      {/* <center>
        <span style={{ lineHeight: `2.0rem` }}>
          © {new Date().getFullYear()}, All rights reserved Tkmmm.
        </span>
      </center> */}
      </div>
  )
}


