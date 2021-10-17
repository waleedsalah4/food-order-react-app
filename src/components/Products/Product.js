import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById, addToCart, addToFav } from '../../store/actions';

import { makeStyles, Card, CardHeader, CardMedia, CardContent,CardActions, IconButton, Typography, CircularProgress, } from '@material-ui/core';
import { FavoriteOutlined, AddOutlined } from '@material-ui/icons';
import SimpleBackdrop from '../UI/BackDrop';
// import GoBack from '../UI/GoBack';
// import HeaderIcones from '../mainContent/HeaderIcones';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
      maxWidth: 445,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    price: {
        marginLeft: 'auto'
    },
    btn: {
        marginTop: '0.6rem',
    },
  }));

const Product = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const isLogged = localStorage.getItem('isLoggedIn')

    useEffect(()=> {
        dispatch(getRecipeById(id))
    }, [dispatch, id])
   
    
    
    const dispatchItemToCart = (item) => {
        if(isLogged) {
            dispatch(addToCart(item))
        }
    }
    const dispatchItemToFav = (item) => {
        if(isLogged) {
            dispatch(addToFav(item))
        }
    }

    const recipe = useSelector(state => state.recipeById);
    const {recipes, loading} = recipe;

    return (
        <div className={classes.wrapper}>
            {/* <div>
            <Grid 
                item xs={12}
                container
                justifyContent='center'
                alignItems='center'
                direction="row"
            >
                <Grid item xs={6} container alignContent="center" justifyContent="center">
                    <GoBack />
                </Grid>
                <Grid item xs={6} container alignContent="center" justifyContent="center">
                    <HeaderIcones />
                </Grid>
            </Grid>
            </div> */}
            {loading && <CircularProgress color="secondary" />}
            {!loading && <div>
                { recipes.map(item => (
                <Card className={classes.root} key={item._id}>
                    <CardHeader
                        title={item.name}
                        subheader={item.category}
                    />
                    <CardMedia
                        className={classes.media}
                        image={item.imageCover}
                        title={item.name}
                    />
                    <CardContent>
                        <Typography variant="body2" component="h4">
                            ingredients:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.ingredients.map(el => (el)).join(', ')}
                        </Typography>
                        <SimpleBackdrop text='Order now' item={item} className={classes.btn} order='single'/>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={()=> {
                            dispatchItemToFav(item)
                        }}>
                            <FavoriteOutlined/>
                        </IconButton>
                        <IconButton aria-label="add to cart" onClick={()=>{
                            dispatchItemToCart(item)
                        }}>
                            <AddOutlined />
                        </IconButton>
                        <Typography className={classes.price} variant='body2' component='h4'>
                            {item.price}$
                        </Typography>
                    </CardActions>
                </Card>))}
             </div>}
        </div>
    )
}

export default Product;