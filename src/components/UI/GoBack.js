import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const GoBack = () => {
    return(
        <Link to='/'>
            <IconButton aria-label="go back">
                <ArrowBack />
            </IconButton>
        </Link>
    )
}

export default GoBack;