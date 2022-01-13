import React from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from "./Drawer";
import LeftBar from './LeftBar';

const Navbar = () => {
    const matches = useMediaQuery('(max-width:730px)');
    // console.log(matches)
    return(
        <>
            {matches ? <Drawer /> : <LeftBar />}
        </>
    )
}

export default Navbar;