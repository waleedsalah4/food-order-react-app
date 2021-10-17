import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateMe } from '../store/actions';
import FormWrapper from "./FormWrapper";
import { useForm } from "./useForm";

import {  Avatar, Button, Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Input from "./Input";

const initialFValues = {
    email: '',
    fullName: '',
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

  

const UpdateUserInfo = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const token = JSON.parse(localStorage.getItem('user-token'))
    const userUpdated = useSelector(state => state.updateMe);
    const { error, userData} = userUpdated;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required."
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
    
      useEffect(() => {
        if(userData){
            history.push('/profile')
        }
      },[userData, history])
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()){
        //    console.log(values,token)
          dispatch(updateMe(token, values))
            resetForm()
        }
      }
    return(
       <FormWrapper error={error} severity='error'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Update Email or Name
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} className={classes.form}>
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
                </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className={classes.btn}
                >
                    Save Changes
                </Button>
            </Box>
        </FormWrapper>
    )
}

export default UpdateUserInfo;