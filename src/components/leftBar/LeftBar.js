import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    List, ListItem, ListItemIcon, ListItemText,
    makeStyles
    , Avatar, Typography, Button
} from "@material-ui/core";

import { ArrowForwardIosOutlined, HomeOutlined, MenuBookOutlined, PersonOutlineOutlined, Dashboard } from '@material-ui/icons';
const useStyles = makeStyles({
 
  drawer: {
    // width: '15%',
    marginLeft: '2rem',
    marginTop: '1rem',
    '@media (max-width: 730px)': {
      marginLeft: '0.3rem',
      marginTop: '1rem',
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column'
    },
    
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
    padding: '0.8rem',
    borderRadius: '1rem',
    
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 730px)': {
      flexDirection: 'row',
      gap: '0px 12px'
    },
  },
  listItem: {
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
  listItemActive: {
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
    },
    '@media only screen and (max-width: 730px)': {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  text: {
    marginLeft: '0.3rem'
  },
  deliveryCard: {
    backgroundColor: 'white',
    color: '#3b3e4c',
    padding: '0rem',
    marginTop: '0rem',
    borderRadius: '1.5rem',
    position: 'relative',
    textAlign: 'center',
    '@media (max-width: 800px)': {
      width: '8rem'
    },
   
  },
  cardImg: {
    minWidth: '5rem',
    height: '8rem',
    // flex: 1,
    // width: null,
    // height: null,
    resizeMode: 'contain',
    borderRadius: '1.5rem',
    '@media (max-width: 800px)': {
      width: '8rem'
    },
    '@media (max-width: 730px)': {
      width: '8rem'
    },
    // '@media screen and (max-width: 1024px)': {
    //   width: '8rem'
    // }
    // position: 'absolute',
    // top: '-5rem',
    // left: '1rem',

  }
})


const RightBar = () => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const logged = localStorage.getItem('isLoggedIn');
    const userRole = JSON.parse(localStorage.getItem('user-data') || '{}')

  const getMobApp = () =>{
    window.open(
      'https://github.com/AhmedHamed-20/resturant_project/releases/download/v4.0/panda_restaurant.apk',
      '_blank'
    );
  }

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
        <div 
          // container item 
          // xs={3} sm={2} 
        >
            <div className={classes.drawer}>
             { logged && <div
                    // item xs={12}
                    // container
                    // direction="column"
                    // justifyContent="center"
                    // alignItems="center"
                    className={classes.gridMargin}
                 >
                    <Avatar src="/avatar7.png" className={classes.avatar} />
                    <Typography variant="h6" component="h3">
                        Waleed Salah
                    </Typography>
                </div>}
            
                  
                    <List className={classes.list}>
                        {menuItem.map(item => (
                            <ListItem 
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)} 
                                className={location.pathname === item.path ? classes.listItemActive : classes.listItem}
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
                                className={classes.listItem}
                            >
                                <ListItemIcon>
                                  <Dashboard className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText className={classes.text}>
                                    Dashboard
                                </ListItemText>
                          </ListItem>}
                    </List>
                  
                <div 
                    // item xs={12}
                    // container
                    // direction="column"
                    // justifyContent="center"
                    // alignItems="center"
                    className={classes.deliveryCard}
                >
                  <div className={classes.deliveryCard}>
                      <div>
                        <img className={classes.cardImg} alt="delivery guy" src="/mobileApp.jpg" />
                      </div>
                      <div>
                        <Button endIcon={<ArrowForwardIosOutlined />} onClick={getMobApp}>
                           Get App
                        </Button>
                      </div>
                  </div>
                </div>

            </div>
        </div>
    )    
}

export default RightBar;