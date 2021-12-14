import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    mainContent: {
        width: '77%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        margin: '1.5rem 0rem 1.5rem 3rem',
        maxHeight: '40rem',
        overflow: 'auto',

        '&::-webkit-scrollbar': {
            width: '10px',
	        backgroundColor: '#F5F5F5',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor: '#F5F5F5',
            bordeRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
	        backgroundImage: '-webkit-gradient(linear,left bottom,left top,color-stop(0.44, rgb(122,153,217)),color-stop(0.72, rgb(73,125,189)),color-stop(0.86, rgb(28,58,148)))',
        },
        '@media (max-width: 730px)': {
            overflow: 'initial',
            maxHeight: 'fit-content',
            width: '85%',
            padding: '1rem',
            margin: '1.5rem 1rem 0.5rem 1rem',
        },
         
    }
})
const Wrapper = (props) => {
    const classses = useStyles();
    return (
        <div 
            // container item 
            // xs={9} sm={9} 
            className={classses.mainContent}>
            {props.children}
        </div>
    )
}
export default Wrapper;