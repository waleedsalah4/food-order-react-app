import React from 'react';

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SettingTree from './SettingTree';
import HeaderIcones from '../mainContent/HeaderIcones';
import GoBack from '../UI/GoBack';

const useStyles = makeStyles(() => ({
    prof: {
        width: '85%',
        padding: '2rem',
    },
    notSigned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerWrapper: {
        borderBottom: '1px solid #dae3d6',
        marginBottom: '3rem',
    },
    header: {
        marginRight: 'auto'
    },
}))

let content = '';


const Settings = () => {
    const classes = useStyles()
    const logged = localStorage.getItem('isLoggedIn');

    if(logged){
        content = (
           <div>
                <Grid 
                    item xs={12}
                    container
                    justifyContent='center'
                    alignItems='center'
                    direction="row"
                    className={classes.headerWrapper}
                >
                    <Grid item xs={4} container alignContent="center" justifyContent="center">
                        <div className={classes.header}>
                            <GoBack />
                            
                        </div>
                    </Grid>
                    <Grid item xs={4} container alignContent="center" justifyContent="center">
                        <Typography variant="h5" gutterBottom className={classes.header}>
                            Setting
                        </Typography>
                    </Grid>
                    <Grid item xs={4} container alignContent="center" justifyContent="center">
                        <HeaderIcones />
                    </Grid>

                </Grid>
                <div>
                    <SettingTree />
                </div>
           </div>
        )
    } else {
        content = (
            <div 
                // item xs={12}
                // container
               className={classes.notSigned}
            >
                <div>
                    <h4>your not logged in, please login first</h4>
                </div>
                <div>
                    <Link to='/signin'>
                        <Button variant='outlined'>
                            Sign in
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
    
    return(
        <div className={classes.prof}>
            {content}
        </div>
    )
}

export default Settings;