import React from "react";
import { makeStyles } from "@material-ui/core";

// const drawerWidth = 200;
const useStyles = makeStyles({
  maincontainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 25px 25px rgb(0 0 0 / 10%)',
    borderRadius: '1.5rem',
    width: '95vw',
    height: '90vh',
    // top: '2rem',

    // ** replace grid with flex ***
    display: 'flex',
    flexDirection: 'row',

    //***      */
    margin: '2.5% auto',
    '@media  (max-width: 730px)': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
  },
 
})

const Layout = (props) => {
    const classes = useStyles()

  
  return (

      // <Box component="div" className={classes.maincontainer}>
      //     <Grid container spacing={3}>
      //         {props.children}
      //     </Grid>
      // </Box>
      <div className={classes.maincontainer}>
        {props.children}
      </div>
  );
}

export default Layout;