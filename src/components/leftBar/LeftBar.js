import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    List, ListItem, ListItemIcon, ListItemText, makeStyles, Avatar, Grid, Typography, Button
} from "@material-ui/core";

import { ArrowForwardIosOutlined, HomeOutlined, MenuBookOutlined, PersonOutlineOutlined, Dashboard } from '@material-ui/icons';
// import CardImg from "./CardImg"
// const drawerWidth = 200;
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  maincontainer: {
    backgroundColor: 'rgba(237,245,253,255)',
    borderRadius: '1.5rem',
    width: '95vw',
    height: '90vh',
    position: 'absolute',
    top: '2rem',
    left: '2rem'
  },
  drawer: {
    // width: '10rem',
    marginLeft: '2rem',
    marginTop: '2rem'
  },
  avatar: {
    border: '0.5rem solid white',
    width: '4rem',
    height: '4rem',
    borderRadius: '1.5rem',
    marginBottom: '0.5rem',
    display: 'block'
  },

  gridMargin: {
    marginBottom: '2rem'
  },

  icon: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '1rem',
    
  },
  list: {
    color: '#9397aa',
    borderRadius: '1rem',
    marginBottom: '1rem',
    padding: '0',
    '&:hover': {
      backgroundColor: '#ec6084',
      color: 'white',
      boxShadow: 'none'
    },
    '&:hover svg': {
        backgroundColor: '#ec6084',
        color: 'white',
        boxShadow: 'none'
    },
 },
  active: {
    backgroundColor: '#ec6084',
    color: 'white',
    boxShadow: 'none',
    borderRadius: '1rem',
    marginBottom: '1rem',
    padding: '0',
    '& svg': {
      backgroundColor: '#ec6084',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#ec6084',
      color: 'white',
    }
  },
  text: {
    marginLeft: '1rem'
  },
  deliveryCard: {
    backgroundColor: 'white',
    color: '#3b3e4c',
    padding: '0.6rem',
    marginTop: '4rem',
    borderRadius: '1.5rem',
    position: 'relative',
    textAlign: 'center'
  },
  cardImg: {
    width: '8rem',
    height: '8rem',
    position: 'absolute',
    top: '-5rem',
    left: '1rem',

  }
})


const RightBar = () => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const logged = localStorage.getItem('isLoggedIn');
    const userRole = JSON.parse(localStorage.getItem('user-data') || '{}')

    const menuItem = [
        {
            text: 'Home',
            icon: <HomeOutlined className={classes.icon}/>,
            path: '/'
        },
        {
          text: 'Profile',
          icon: <PersonOutlineOutlined className={classes.icon}/>,
          path: '/profile'
        },
        {
            text: 'setting',
            icon: <MenuBookOutlined className={classes.icon}/>,
            path: '/setting'
        },
       
    ]

    return (
        <Grid container item xs={3} sm={2} >
            <div className={classes.drawer}>
             { logged && <Grid
                    item xs={12}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.gridMargin}
                 >
                    <Avatar src="/avatar7.png" className={classes.avatar} />
                    <Typography variant="h6" component="h3">
                        Waleed Salah
                    </Typography>
                </Grid>}
            

                    <List>
                        {menuItem.map(item => (
                            <ListItem 
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)} 
                                className={location.pathname === item.path ? classes.active : classes.list}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText className={classes.text}>
                                    {item.text}
                                </ListItemText>
                            </ListItem>
                        ))}
                        {logged && userRole.role === 'admin' && <ListItem 
                              button
                                onClick={() => history.push('/admin/dashboard')} 
                                className={classes.list}
                            >
                                <ListItemIcon>
                                  <Dashboard className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText className={classes.text}>
                                    Dashboard
                                </ListItemText>
                          </ListItem>}
                    </List>
                <Grid 
                    item xs={12}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                  <div className={classes.deliveryCard}>
                      <div>
                        <img className={classes.cardImg} alt="delivery guy" src="/urban-drone-delivery-1.png" />
                      </div>
                      <div>
                        <h2>Faster delivery!</h2>
                      </div>
                      <div>
                        <Button endIcon={<ArrowForwardIosOutlined />}>
                            Learn more! 
                        </Button>
                      </div>
                  </div>
                </Grid>

            </div>
        </Grid>
    )    
}

export default RightBar;