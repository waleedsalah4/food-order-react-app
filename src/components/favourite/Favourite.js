import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FavouriteItem from './FavouriteItem';
// import CartFavFooter from '../cart/CartFavFooter';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    padding: '1rem'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  footerdiv: {
    marginTop: '2rem',
  },
  gidGap: {
    gap: '10px 122px'
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
}));




export default function Favourite() {
  const classes = useStyles();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const favourite = useSelector(state=> state.favourite)
  const {bookmark} = favourite;
  
  useEffect(() => {
    let items = bookmark.length;
    let price = 0;

    bookmark.forEach(item => {
        price += item.price
    })
    // console.log(items,price)
    setTotalPrice(price)
    setTotalItems(items)
}, [bookmark, totalPrice, totalItems, setTotalPrice, setTotalItems])
  
  return (
    <div className={classes.root}>
      
      <Grid container spacing={2} alignContent='center' justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Favourite
          </Typography>
          <div className={classes.demo}>
            <List>
              {bookmark.map((item)=> (
                <FavouriteItem key={item._id} item={item} />
              ))}
            </List>
          </div>
        </Grid>
      </Grid>

      {/* footer */}
      <div className={classes.footerdiv}>
          <Grid item container xs={12} className={classes.gidGap}>
              {/* <CartFavFooter 
                header={'Favourite'}
                totalItems={totalItems}
                totalPrice={totalPrice}
                btn={'Favourite'}
                path={'/favourite'}
              /> */}
            <Grid item xs={5} container className={classes.footerContainer}>
              <div className={classes.footerHeader}>
                  Favourite Items
              </div>
              <div className={classes.content}>
                  <span>Total Items: {totalItems}</span>
              </div>
              <div className={classes.content}>
                  <span>Total Price: {totalPrice}$</span>
              </div>
              {/* <div className={classes.content}> */}
                            {/* <Link to={props.path} >
                                <Button variant='contained'>
                                    {props.btn}
                                </Button>
                            </Link> */}
                {/* <SimpleBackdrop text='Checkout' /> */}
              {/* </div> */}
            </Grid>
             
          </Grid>
      </div>
    </div>
  );
}
