import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchRecipe} from '../../store/actions';
import MealItem from '../Meals/MealItem';
import { makeStyles, Grid, Typography, CircularProgress } from '@material-ui/core';
import Header from '../mainContent/Header';


const useStyles = makeStyles(()=>({
    searchWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '70px 10px',
        padding: '1rem',
    },
    mealContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grid: {
        display: 'flex',
        gap: '85px 22px',
    },
    
}))


const SearchScreen = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('q');
    // console.log(myParam)
    
    useEffect(()=> {
        dispatch(searchRecipe(myParam))
    }, [dispatch, myParam])

    const searchedRecipes = useSelector(state => state.search)
    // console.log(searchedRecipes)
    const {loading, recipes} = searchedRecipes;

    return(
        <div className={classes.searchWrapper}>
            <div>
                <Header />
            </div>
            <div>
                <Grid 
                    item xs={12}
                    container
                    direction="row"
                >
                    <Typography variant='body1' component='h2'>you search from {myParam}</Typography>
                </Grid>
            </div>
            <div className={classes.mealContainer}>
                {loading && <CircularProgress color="secondary" />}
                {!loading && <div>
                    <Grid 
                        item xs={12}
                        container
                        alignItems='center'
                        justifyContent='center'
                        direction="row"
                        className={classes.grid}
                    >
                        {recipes.map(meal => (
                            <MealItem key={meal._id} meal={meal} />
                        ))}
                    </Grid>
                </div>}
            </div>
            
        </div>
    )
}

export default SearchScreen