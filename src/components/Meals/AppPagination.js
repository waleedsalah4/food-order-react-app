import React from "react";
import { Pagination } from "@material-ui/lab";
// import { Grid } from "@material-ui/core";

// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({

//   container: {
//     position: 'absolute',
//     bottom: '11%',
//     right: '50%',
//   },
// }));



const AppPagination = ({setPage, count, currentPage}) => {
    // const classes = useStyles();

    const handleChange = (event, page) => {
        setPage(page)
    }

    return(
        
        <Pagination variant='outlined' page={currentPage} count={count} onChange={handleChange}/>
      
    )
}
export default AppPagination;