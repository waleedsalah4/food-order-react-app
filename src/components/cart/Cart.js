import React, { useState, useEffect } from "react";
import {Grid, Typography, makeStyles } from "@material-ui/core";
import CartItem from "./CartItem";
// import CartFavFooter from "./CartFavFooter";
import { useSelector } from "react-redux";
import SimpleBackdrop from "../UI/BackDrop";

const useStyles = makeStyles(() => ({
    cartDiv: {
        width: '100%',
    },
    footerdiv: {
        marginTop: '2rem',
    },
    gidGap: {
        gap: '0 110px'
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 2px 12px 3px #eeeede',
    },
    footerHeader: {
        padding: '0.5rem',
        background: '#dfdfe2',
        marginBottom: '5px',
        textAlign: 'center'
    },
    content: {
        paddingLeft: '2rem',
        paddingBottom: '1rem'
    },
}))



const Cart = () => {
    const classes = useStyles();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const cartItems = useSelector(state => state.cart)
    const {cart} = cartItems;
    
    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach(item => {
            items += item.qty;
            price += item.qty * item.price
        })
        // console.log(items,price)
        setTotalPrice(price)
        setTotalItems(items)
    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])

    return (
        <div className={classes.cartDiv}>
            {/* header */}
            <Grid 
                item xs={12}
            >
                <Typography variant='h4' component='h3'>
                    Your Cart
                </Typography>
            </Grid>

            {/* cart items */}
            { cart.map(item => (
                <CartItem item={item} key={item._id}  />
            ))}

            {/* footer */}
             <div className={classes.footerdiv}>
                <Grid item container xs={12} className={classes.gidGap}>
                   {/* <CartFavFooter 
                        header={'Cart'}
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        btn={'Check out'}
                        path={'/cart'}
                    /> */}
                    <Grid item xs={5} container className={classes.footerContainer}>
                        <div className={classes.footerHeader}>
                            Cart Items
                        </div>
                        <div className={classes.content}>
                            <span>Total Items: {totalItems}</span>
                        </div>
                        <div className={classes.content}>
                            <span>Total Price: {totalPrice}$</span>
                        </div>
                        <div className={classes.content}>
                            {/* <Link to={props.path} >
                                <Button variant='contained'>
                                    {props.btn}
                                </Button>
                            </Link> */}
                            <SimpleBackdrop text='Checkout' order='multi' />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
    
}

export default Cart;