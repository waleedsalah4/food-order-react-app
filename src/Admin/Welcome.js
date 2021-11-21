import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    
    welomeContainer: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '600px'
    },
    text: {
        backgroundColor: 'rgba(1,1,1,0.1)',
        padding: '1rem',
    }
  
}))


const Welcome = () => {
    
    const user = JSON.parse(localStorage.getItem('user-data') || '{}')
    const classes = useStyles();
    return(
        
        <div className={classes.welomeContainer}>
            <div>
                <Typography className={classes.text}>
                    Welcome {user.name}
                </Typography>
            </div>
                
            <Grid item xs={12} 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <img src='/welcome.png' alt='welocme' className={classes.img}/>
            </Grid>
        </div>
    )
}

export default Welcome;