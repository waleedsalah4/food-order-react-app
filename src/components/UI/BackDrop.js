import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Button } from '@material-ui/core';
import Order from '../order/Order';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  
}));

export default function SimpleBackdrop(props) {
  // const {item} = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    // localStorage.setItem('orderItems', JSON.stringify(item))
    // // console.log(orderItem)
    setOpen(true);
  };

  

  return (
    <div>
      <Button variant="outlined" color="secondary" className={props.className} onClick={handleToggle}>
        {props.text}
      </Button>
      <Backdrop className={classes.backdrop} open={open} >
        <Order item={props.item} close={handleClose} orderItem={props.order} />
      </Backdrop>
    </div>
  );
}
