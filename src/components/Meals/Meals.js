import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes, getRecipesInCategory } from '../../store/actions';
import AppPagination from './AppPagination';
import { Grid , makeStyles, } from '@material-ui/core';
import MealItem from './MealItem';


const useStyles = makeStyles(() => ({

    parentDiv: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pagination: {
        position: 'absolute',
        bottom: '0',
    },
    grid: {
        marginTop: '4rem',
        marginBottom: '2rem',
        padding: '50px',
        // height: '17rem',
        display: 'flex',
        gap: '70px 22px',
    },
    loading: {
       textAlign: 'center',
   }
  }));


const Meals = (props) => {
    const {category, page, setPage} = props
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const recipesList = useSelector(state => state.recipe)
    const {loading, recipes,totalRecipes} = recipesList;
    
    useEffect(() => {
        if(category === 'All'){
            dispatch(getRecipes(page))
        } else{

            dispatch(getRecipesInCategory(category,page))
        }
    }, [dispatch, page, category])

    // console.log(recipes, totalRecipes)
    const numOfPaginationsItems = Math.ceil(totalRecipes / 3);

    return (
        <div className={classes.parentDiv}>
            {/* {loading && <CircularProgress color="secondary" />} */}
            <div >
                {!loading && <div >
                    <Grid 
                        item xs={12}
                        container
                        direction="row"
                        justifyContent='center'
                        alignItems='center'
                        className={classes.grid}
                    >
                    { recipes && recipes.map(meal => (
                        <MealItem key={meal._id} meal={meal} /> 
                    ))}  
                    </Grid>
                </div>
                }

            </div>
            <div className={classes.pagination}>
                    {totalRecipes && <AppPagination setPage={setPage} count={numOfPaginationsItems} currentPage={page} />  }
                </div>
        </div>
    )
}

export default Meals;
