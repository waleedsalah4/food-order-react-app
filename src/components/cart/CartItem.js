import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, adjustItemQty } from "../../store/actions";
import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    cartItem: {
        // border: '6px solid #f4f6f8',
        boxShadow: '0px 2px 12px 3px #eeeede',
        borderRadius: '0.5rem',
        marginTop: '2rem',
    },
    cartImage: {
        width: '10rem',
        height: '10rem',
        borderRadius: '50%',
    },
    summary: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        width: '3rem',
        border: '1px solid',
        borderRadius: '0.2rem',
        marginLeft: '1rem',
    },
    btn: {
        margin: '1rem',
        color: 'black',
        /* background: '#f6e2ff', */
        border: 'none',
        fontSize: 'larger',
        /* padding: '0.3rem', */
        width: '2rem',
        borderRadius: '1.5rem',
        cursor: 'pointer',
    }
}))

const CartItem = (props) => {
    const {item} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [input, setInput] = useState(item.qty);
    

    const onChangeHandler = (e) => {
        setInput(e.target.value);
        dispatch(adjustItemQty(item._id, e.target.value))
    }
    
    // const items = useSelector(state => state.cart)
    // const {cart} = items;

    const removeItemFromCart = (id) => {
        // console.log(id)
        dispatch(removeFromCart(id))
        // // console.log(cart)
    }
    return (
        <div>
            <Grid 
                item xs={12}
                container
                justifyContent='center'
                alignItems='center'
                direction="row"
                className={classes.cartItem}
            >
                <Grid item xs={4} container alignContent="center" justifyContent="center">
                    <img src={item.imageCover} alt={item.name} className={classes.cartImage} />
                </Grid>
                <Grid item xs={4} container alignContent="center" justifyContent="center" className={classes.summary}>
                    <div>
                        <span>{item.name}</span>
                    </div>
                    <div>
                        <span>price: {item.price}$</span>
                    </div>
                    <div>
                        <label htmlFor='qty'>Qty:</label>
                        <input min='1' type='number' id='qty' value={input} onChange={onChangeHandler} className={classes.input} />
                    </div>
                </Grid>
                <Grid item xs={4} container alignContent="center" justifyContent="center">
                    <Button color='secondary' onClick={()=>{
                        removeItemFromCart(item._id)
                    }}>Remove</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CartItem