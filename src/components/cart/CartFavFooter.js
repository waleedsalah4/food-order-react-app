import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(()=> ({
   
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
    }
}))

const CartFavFooter = (props) => {
    const classes = useStyles();
    return (
        <Grid item xs={5} container className={classes.footerContainer}>
            <div className={classes.footerHeader}>
                {props.header} Items
            </div>
            <div className={classes.content}>
                <span>Total Items: {props.totalItems}</span>
            </div>
            <div className={classes.content}>
                <span>Total Price: {props.totalPrice}$</span>
            </div>
            <div className={classes.content}>
                <Link to={props.path} >
                    <Button variant='contained'>
                        {props.btn}
                    </Button>
                </Link>
            </div>
        </Grid>
    )
}

export default CartFavFooter;