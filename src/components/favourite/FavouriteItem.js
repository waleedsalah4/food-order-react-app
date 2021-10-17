import React from "react";
import { useDispatch } from "react-redux";

import { removeFromFav } from "../../store/actions";

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


const FavouriteItem = (props) => {
    const {item} = props;
    const dispatch = useDispatch();

    const delFromFav = (id) => {
        dispatch(removeFromFav(id))
    }
    return(
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={item.name} src={item.imageCover} />
            </ListItemAvatar>
            <ListItemText
            primary={item.name}
            secondary={item.price}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={()=>{
                    delFromFav(item._id)
                }}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default FavouriteItem;