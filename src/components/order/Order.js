import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrderReq } from "../../store/actions/orderActions";
import { useForm } from "../../Register/useForm";
import Input from '../../Register/Input';
import Alerts from "../UI/Alert";


import { ThemeProvider, createTheme, makeStyles, Grid, Box, Typography, Button, Container } from '@material-ui/core';
// import SimpleBackdrop from "../UI/BackDrop";

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.3rem',
        marginTop: '75px',
    },
    form: {
      width: '100%',
    },
    btn: {
        marginTop: '1rem',
    }
  }));
  


const initialFValues = {
    phone: '',
    address: ''
}

const theme = createTheme();
const Order =(props) => {
    const {close} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const cartItems = useSelector(state => state.cart)
    const sentOrder = useSelector(state => state.postOrder)
    const {orders} = sentOrder;
    
    const token = JSON.parse(localStorage.getItem("user-token") ||'{}')


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('phone' in fieldValues){

            temp.phone = fieldValues.phone.length >= 8 && fieldValues.phone.length <= 15 ? "" : "Number must be betwwen 8 and 15 digits."
        }
        if ('address' in fieldValues){
            temp.address = fieldValues.address ? "" : "This field is required."
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
        if(validate()){
            const {cart} = cartItems;
            if(props.orderItem === 'multi' && cart.length > 0){
            let orderContent = []
                orderContent = cart.map(item => {
                    return {
                        recipeId: item._id,
                        amount: item.qty
                    }
                })
                dispatch(postOrderReq(orderContent, values, token, 'multi'))
                // console.log(orders.status)
                // console.log(orders)
                // if(orders.status === 'success') {
                //     dispatch(clearCart())
                //     close()
                // }
            }
            if(props.orderItem === 'single') {
                let orderContent = [{
                    recipeId: props.item._id,
                    amount: 1
                }]
                dispatch(postOrderReq(orderContent, values, token, 'single'))
            }
        }
        
        resetForm()
    }
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className={classes.main}>
                <Box
                    sx={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h3" variant="h5" color='textPrimary'>
                    Order
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                margin='normal'
                                name="phone"
                                id="phone"
                                label="Phone number"
                                type="number"
                                value={values.phone}
                                error={errors.phone}
                                onChange={handleInputChange}
                                autoComplete="phoneNumber"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                margin='normal'
                                name="address"
                                id="addres"
                                label="Address"
                                type="text"
                               value={values.address}
                               error={errors.address}
                               onChange={handleInputChange}
                               autoComplete="address"
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
                        order
                    </Button>
                  
                </Box>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={close}
                        className={classes.btn}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        close
                </Button>
            </Box>
            {orders.status === 'success' ? <Alerts severity='success'>Order has been sent</Alerts> : ''}
        </Container>
        </ThemeProvider>
    )
}

export default Order;