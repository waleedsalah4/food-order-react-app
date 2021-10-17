import React from "react";
import { forgotPassword } from '../store/actions';
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";


import Alerts from '../components/UI/Alert';
import FormWrapper from "./FormWrapper";
import { useForm } from "./useForm";
import { Link } from "react-router-dom";

import {  Avatar, Button, Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Input from "./Input";

const initialFValues = {
    email: '',
  
  }

  const useStyles = makeStyles(() => ({
    form: {
        width: '100%',
    },
    text: {
        marginTop: '2rem',
    },
  }))

  

const ForgotPassword = () => {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    // const history = useHistory();
    
    const user = useSelector(state => state.forgotPassword);
    const { error, emailSent} = user;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues){
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          temp.email = re.test(fieldValues.email) ? "" : "Email is not valid."
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
         resetForm
    } = useForm(initialFValues, true, validate);
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()){
 
            dispatch(forgotPassword(values))
            resetForm()
        }
    }
    return(
       <FormWrapper error={error} severity='error'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot Password
            </Typography>
            <Typography className={classes.text}>
            Please enter your email address. You will receive a link to create a new password via email.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send Email
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to='/signin'>
                            remmbered password ?
                        </Link>
                    </Grid>
                </Grid>
                </Box>
                {emailSent && <Alerts severity={'success'}>
                        an email has been sent, check your inbox please!
                    </Alerts>
                }
        </FormWrapper>
    )
}

export default ForgotPassword;