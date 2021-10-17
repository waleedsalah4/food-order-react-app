import React, { useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { updatePassword } from '../store/actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "./useForm";

import {  Avatar, Button, Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Input from "./Input";

const initialFValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  }

  const useStyles = makeStyles(() => ({
    form: {
        width: '100%',
    },
    text: {
        marginTop: '2rem',
    },
    btn: {
        marginTop: '1.5rem'
    }
  }))

  

const UpdatePassword = () => {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const history = useHistory();
    
    const token = JSON.parse(localStorage.getItem('user-token'))
    const passwordUpdated = useSelector(state => state.updatePassword);
    const { error, userData} = passwordUpdated;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        
        if ('currentPassword' in fieldValues)
        temp.currentPassword = fieldValues.currentPassword.length >= 8 ? "" : "Minimum 8 chars "
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
        //  resetForm
    } = useForm(initialFValues, true, validate);
    
      useEffect(() => {
        if(userData){
            history.push('/setting')
        }
      },[userData, history])
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()){
        //    console.log(values)
          dispatch(updatePassword(token, values))
            // resetForm()
        }
      }
    return(
       <FormWrapper error={error} severity='error'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Update Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input
                            margin='normal'
                            name="currentPassword"
                            id="currentPassword"
                            label="Current Password"
                            type="password"
                            value={values.currentPassword}
                            error={errors.currentPassword}
                            onChange={handleInputChange}
                            autoComplete="currentPassword"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            margin='normal'
                            name="password"
                            id="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            error={errors.password}
                            onChange={handleInputChange}
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            margin='normal'
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
                    Update Password
                </Button>
            </Box>
        </FormWrapper>
    )
}

export default UpdatePassword;