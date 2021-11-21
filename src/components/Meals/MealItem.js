import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFav } from '../../store/actions';
import { IconButton , makeStyles, } from '@material-ui/core';
import { AddOutlined, FavoriteOutlined } from '@material-ui/icons';


const useStyles = makeStyles(() => ({
    cardItem: {
       display: "flex",
       flexDirection: 'column',
       alignItems: 'center',
       alignContent: 'center',
    //    maxWidth: 190,
       width: '13rem',
       height: '13rem',
       padding: '0.5rem',
       marginLeft: '1rem',
       borderRadius: '1.5rem',
       boxShadow: '0px 3px 3px 3px #eeeede',
       textAlign: 'center',
       position: 'relative',
   },
    cardImg: {
       width: '7rem',
       height: '7rem',
       borderRadius: '50%',
       display: 'block',
       position: 'absolute',
       top: '-60px',
       left: '45px',
   },
   cardContent: {
    marginTop: '2rem'
   },
   cardFooter: {
       display: 'flex',
       alignItems: 'center',
       gap: '16px 24px',
   },
   
  }));


const limitRecipeTitle = (title, limit = 30) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0);

        //return the result
        return `${newTitle.join(' ')}...`;
    }

    return title;
}

  const MealItem = (props) => {
      const {meal} = props;
      const classes = useStyles();
      const dispatch = useDispatch();
      const isLogged = localStorage.getItem('isLoggedIn')

    const favourite = useSelector(state=> state.favourite)
    const {bookmark} = favourite;
    

    const isInFav = (favItemId) => {
         return bookmark.some(item=> item._id === favItemId);
       
    }
    
    
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

      return (
        <div className={classes.cardItem}>
            <Link to={`/product/${meal._id}`}>
                <div>
                    <img src={meal.imageCover} alt="burger" className={classes.cardImg} />
                </div> 
            </Link>
            <div className={classes.cardContent}>
                <h4>{meal.name}</h4>
                <p>{limitRecipeTitle(meal.ingredients.map(el => (el)).join(', '))} </p> 
            </div>
            <div className={classes.cardFooter}>
                <strong>{meal.price}$</strong>
                <IconButton aria-label="add" onClick={()=>{
                    dispatchItemToCart(meal)
                }}>
                    <AddOutlined />
                </IconButton>
                <IconButton aria-label="favourite" onClick={()=> {
                    dispatchItemToFav(meal);
                }}>
                    <FavoriteOutlined color={isInFav(meal._id) ? 'secondary' : 'inherit'} />
                </IconButton>
            </div>
        </div> 
      )
  }

  export default MealItem;