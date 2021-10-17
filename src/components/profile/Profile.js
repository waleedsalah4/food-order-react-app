import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import ProfileContent from "./ProfileContent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Alerts from "../UI/Alert";


const useStyles = makeStyles(() => ({
    prof: {
        width: '100%',
        padding: '2rem',
    },
    profileHeader: {
        width: '100%',
        height: '13rem',
        position: 'relative',
        // width: 100%;
        // box-shadow: 1px 2px 3px 1px #e7e4e4;
        // height: 19rem;
        // border-radius: 1.5rem;
    },
    cover: {
        width: '100%',
        height: '13rem',
    },
    profilePicDiv: {
        position: 'absolute',
        top: '4rem',
        left: '40%',
        border: '5px solid #d1c5c5',
        borderRadius:'50%',
    },
    profilePic: {
        width: '10rem',
        height: '10rem',
        borderRadius: '50%',
    },
    content: {
        marginTop: '3rem',
        padding: '1rem',
        boxShadow: "2px 1px 5px 1px #cbc2c2",
    },
    notSigned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))

let content = '';


const Profile = () => {
    const classes = useStyles();
    const deleteItem = useSelector(state => state.cancelOrder)
    const {error} = deleteItem;

    const logged = localStorage.getItem('isLoggedIn');
    
    if(logged) {
        content = (
            <div>
                <Grid 
                    item xs={12}
                    container
                    alignContent='center'
                    justifyContent='center'
                >
                    
                   <div className={classes.profileHeader}>
                       <div>
                            <img src="/header.jpg" alt="cover" className={classes.cover} />
                       </div>
                       <div className={classes.profilePicDiv}>
                           <img src='/avatar7.png' alt='profil pic' className={classes.profilePic} />
                       </div>
                   </div>
                </Grid>
    
                <div className={classes.content}>
                    
                    {error && <Alerts severity='error'>{error}</Alerts>}
                    <ProfileContent />
                </div>
            </div>
        ) 
    } else {
        content = (
            <Grid 
                item xs={12}
                container
               className={classes.notSigned}
            >
                <div>
                    <h4>your not logged in, please login first to show your profile</h4>
                </div>
                <div>
                    <Link to='/signin'>
                        <Button variant='outlined'>
                            Sign in
                        </Button>
                    </Link>
                </div>
            </Grid>
        )
    }
    return (
        <div className={classes.prof}>
            {content}
        </div>
    )
    
}

export default Profile;