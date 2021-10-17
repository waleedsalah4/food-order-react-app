import React from 'react';
import { makeStyles, List, ListItem, Divider, ListItemText, ListItemAvatar, ListItemSecondaryAction, IconButton, Avatar, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { cancelOrderReq } from '../../store/actions/orderActions';
import { useDispatch} from 'react-redux';





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '70ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


export default function OrderItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const avatar = JSON.parse(localStorage.getItem('user-data'));
  const token = JSON.parse(localStorage.getItem('user-token'));
  const {orders} = props;
//   console.log(orders)


  const {orderContent,createdAt } = orders;
  let date = createdAt.split('T')[0]

  const handleDeleteOrder = (id) => {
    dispatch(cancelOrderReq(token, id))
    
  }

  
    
    
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={date}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Total price: {orders.totalPrice}$
              </Typography>
            </React.Fragment>
           
          }
        />
        <ListItemText primary={
            <React.Fragment>
                <Typography
                    component="h4"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                Order Content
              </Typography>
                {orderContent.map(item=> (
                <ListItemText
                  key={item._id} 
                  primary={item.recipeName}
                  secondary={`amount: ${item.recipeAmount} price: ${item.recipePrice}`} />
            ))}
            </React.Fragment>
        } />
         
       
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={()=>{
                handleDeleteOrder(orders._id)
            }} >
                <Delete />
            </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
