import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Search from '../search/Search';
import HeaderIcones from './HeaderIcones';

const useStyles = makeStyles({
 
    title: {
      '@media (max-width: 730px)': {
        fontSize: '22px'
      },
    }
})

const Header = () => {
    const classes = useStyles();
    return(
        <Grid 
            item xs={12}
            container
            justifyContent='center'
            alignItems='center'
            direction="row"
        >
            <Grid item xs={4} container alignContent="center" justifyContent="center">
                <h1 className={classes.title}>Welocom to<br /> Eatland 🤤</h1>
            </Grid>
            <Grid item xs={4} container alignContent="center" justifyContent="center">
                <Search />
            </Grid>
            <Grid item xs={4} container alignContent="center" justifyContent="center" >
                <HeaderIcones />
            </Grid>
        </Grid>
    )
}

export default Header;