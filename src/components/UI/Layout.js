import React from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";
// import RightBar from "./rightBar/RightBar";
// import MainContainer from "./mainContent/MainContainer";

// const drawerWidth = 200;
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  maincontainer: {
    // backgroundColor: 'rgba(237,245,253,255)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 25px 25px rgb(0 0 0 / 10%)',
    borderRadius: '1.5rem',
    width: '95vw',
    height: '90vh',
    // position: 'absolute',
    // top: '2rem',
    // left: '2rem'
    margin: '2.5% auto'
  },
 
})

const Layout = (props) => {
    const classes = useStyles()
  

  
  return (

      <Box component="div" className={classes.maincontainer}>
          <Grid container spacing={3}>
              {props.children}
          </Grid>
      </Box>
  );
}

export default Layout;