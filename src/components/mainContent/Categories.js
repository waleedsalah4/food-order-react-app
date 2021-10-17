import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGategory} from '../../store/actions';
import { Grid, makeStyles, CircularProgress, Chip } from '@material-ui/core';


const useStyles = makeStyles({
    grid: {
        paddingLeft: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px 14px',
        padding: '1rem',
    },
    // categoryItem: {
    //     backgroundColor: '#f4f6f8',
    //     color: '#cccdd3',
    //     cursor: 'pointer',
    //     border: 'none',
    //     marginLeft: '2rem',
    //     padding: '1rem',
    //     borderRadius: '2.5rem',
    //     '&:hover': {
    //         backgroundColor: 'white',
    //         color: 'black',
    //         boxShadow: '3px 20px 24px -7px #f4f6f8',
    //     },
        
    // },
})

const Categories = (props) => {
    const {onCategorySelect, setPage} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getGategory())
    }, [dispatch])
    const categories = useSelector(state => state.category)
    const {loading, category} = categories;
    // console.log(category)
    const handleCategoryName = (name) => {
        onCategorySelect(name);
        setPage(1)
    }
  

    return (
        <Grid 
            item xs={12}
            container
            direction="row"
            alignContent="center"
            alignItems="center"
            className={classes.grid}
        >
            
            {loading && <CircularProgress color="secondary" />}
            {!loading && <Chip label='All' variant="outlined" onClick={()=>{
                handleCategoryName('All')
            }}  />}
            {!loading && category.map(item => (
                // <button key={item._id} className={classes.categoryItem}>
                //     <p>{item.name}</p>
                // </button>
                <Chip label={item.name} variant="outlined" key={item._id} onClick={()=> {
                    handleCategoryName(item.name)
                }} />
            ))}
        </Grid>
    )
}

export default Categories;