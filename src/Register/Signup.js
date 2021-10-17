import React, { useEffect } from 'react';
import { useForm } from './useForm';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline, makeStyles, Avatar, Button, Grid, Box, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Input from './Input';
import { signUp } from '../store/actions';
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


const theme = createTheme();

const initialFValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUp() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userlogged = useSelector(state => state.userSignup);
  const {loading, error, userData} = userlogged;
 

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required."
    if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('password' in fieldValues)
        temp.password = fieldValues.password.length >= 8 ? "" : "Minimum 8 chars required."
    if ('confirmPassword' in fieldValues){
        temp.confirmPassword = values.password === fieldValues.confirmPassword ? "" : "password didn't match."

    }
        
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

const handleSubmit = e => {
    e.preventDefault()
    if (validate()){
        // console.log(values)
        dispatch(signUp(values))
        // resetForm()
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input
                            name="fullName"
                            id="name"
                            label="Name"
                            value={values.fullName}
                            error={errors.fullName}
                            onChange={handleInputChange}
                            autoComplete="name"
                            // {...(error && {error: !formInputValidity.name, helperText: "name can't be empty"})}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Input
                            name="email"
                            id="email"
                            label="Email Address"
                            type="email"
                           value={values.email}
                           error={errors.email}
                           onChange={handleInputChange}
                           autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={values.password}
                            error={errors.password}
                            onChange={handleInputChange}
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                           value={values.confirmPassword}
                           error={errors.confirmPassword}
                           onChange={handleInputChange}
                           autoComplete="confirm-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className={classes.btn}
                >
                    {!loading ? 'Sign Up' : 'Loading...'}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to='/signin'>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  );
}