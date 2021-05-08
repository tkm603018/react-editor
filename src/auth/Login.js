import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";

import {
  Box, Grid, Button, FormControl, InputLabel, Input, TextField, Typography, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
  },
  button: {
    margin: '20px auto',
    padding: '10px',
  }
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const { login } = useContext(AuthContext);

  // AuthContextからlogin関数を受け取る
  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <div style={{ margin: '30rem auto', }}>
      <Box component={'div'} m={2}>
        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Box fontSize="h3.fontSize" fontWeight="fontWeightBold">ログイン</Box>
          <form onSubmit={handleSubmit}>
            <TextField className={classes.root} id="email" label="email" type="email" placeholder="Email" fullWidth required/>
            <TextField className={classes.root} id="password" label="password" type="password" placeholder="Password" fullWidth required/>
            <Button className={classes.button} type="submit" variant="outlined" fullWidth>Log in</Button>
          </form>
        </Grid>
      </Box>
    </div>
  );
};

export default withRouter(Login);
