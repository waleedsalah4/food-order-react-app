import React, { useState } from 'react';

import Categories from './Categories';
import Meals from '../Meals/Meals';
import Header from './Header';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    wrapper: {
        width: '100%'
    }
}))



const MainContainer = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All')
    return (
        
        <div className={classes.wrapper}>
            <Header />
            <div>
                <Categories onCategorySelect={setSelectedCategory} setPage={setPage} />
            </div>
            <Meals category={selectedCategory} page={page} setPage={setPage} />
        </div>
    )
}

export default MainContainer;