import  React, {useEffect} from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/actions';


import {createTheme, ThemeProvider, CssBaseline, makeStyles, Avatar, Button, Grid, Box, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';


import { useForm } from './useForm';
import Input from './Input';

import Alerts from '../components/UI/Alert';


const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.3rem',
    marginTop: '75px',
  },
  btn: {
    fontWeight: 500,
    fontSize: '0.875rem',
    fontFamily:' "Roboto","Helvetica","Arial","sans-serif"',
    lineHeight: 1.5,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    minWidth: '64px',
    padding: '6px 16px',
    borderRadius: '4px',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    width: '100%',
    marginTop: '24px',
    marginBottom: '16px'
  },
  
}))

const initialFValues = {
  email: '',
  password: '',

}
const theme = createTheme();

const SignIn =() => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userlogged = useSelector(state => state.userLogin);
  const {loading, error, userData} = userlogged;


  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('email' in fieldValues){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      temp.email = re.test(fieldValues.email) ? "" : "Email is not valid."
    }

    if ('password' in fieldValues)
        temp.password = fieldValues.password ? "" : "This field is required."
        
    setErrors({
        ...temp
    })

    if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
}

  const {
      values,
      errors,
      setErrors,
      handleInputChange,
      // resetForm
  } = useForm(initialFValues, true, validate);

  useEffect(() => {
    if(userData){
        history.push('/')
    }
  },[userData, history])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()){
      // console.log(values)
      dispatch(signIn(values))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {error && <Alerts>{error}</Alerts>}
      
      <Container component="main" maxWidth="xs" className={classes.main}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Input
             margin='normal'
             name="email"
             id="email"
             label="Email Address"
             type="email"
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
            autoComplete="email"

            />
            <Input
              margin='normal'
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              error={errors.password}
              onChange={handleInputChange}
              autoComplete="current-password"

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.btn}
              sx={{ mt: 3, mb: 2 }}
            >
              {!loading ? 'Sign In' : 'Loading...'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/forgot-password'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;