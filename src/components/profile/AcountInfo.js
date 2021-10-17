import { Typography } from '@material-ui/core';
import React from 'react';

const AcountInfo = () => {
    const user = JSON.parse(localStorage.getItem('user-data'))
    return(
        <div>
            <div>
                <Typography>Email: {user.email}</Typography>
            </div>
            <div>
                <Typography>Name: {user.name}</Typography>
            </div>
        </div>
    )
}

export default AcountInfo;