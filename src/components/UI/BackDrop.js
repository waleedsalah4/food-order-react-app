import React, {useState} from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from './Modal';
import { Button } from '@material-ui/core';
import Order from '../order/Order';



export default function SimpleBackdrop(props) {

  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  

  return (
    <div>
      <Button variant="outlined" color="secondary" className={props.className} onClick={handleOpen}>
        {props.text}
      </Button>
      {open && <Modal onClose={handleClose}>
        <Order item={props.item} close={handleClose} orderItem={props.order} />
      </Modal>}
    </div>
  );
}
