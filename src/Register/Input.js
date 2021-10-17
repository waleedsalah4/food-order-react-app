import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label,type, id, value, autoComplete, margin, error=null, onChange } = props;
    return (
        <TextField
            margin={margin}
            variant="outlined"
            required
            fullWidth
            label={label}
            name={name}
            value={value}
            type={type}
            id={id}
            autoComplete={autoComplete}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}