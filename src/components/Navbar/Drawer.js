import { useState } from 'react';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import LeftBar from './LeftBar';

const useStyles = makeStyles({
    container: {
        padding: '1rem',
    },
  list: {
    width: 250,
  },
});




export default function Drawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  return (
    <div className={classes.container}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => {}}
      >
        <div className={classes.list}>
          <Box textAlign="center" p={2}>
            Components
          </Box>
          <Divider />
            <LeftBar />
        </div>
      </SwipeableDrawer>
    </div>
  );
}