import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IconButton,Badge, Button, makeStyles } from '@material-ui/core';
import { FavoriteOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import { styled } from '@material-ui/styles';

import ToggleMenu from '../UI/ToggleMenu';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: '2px solid',
      padding: '0 4px',
    },
  }));

    const useStyles = makeStyles(() =>({
      registerLinks: {
          textDecoration: 'none',
          marginLeft: '1rem',
      }
  }))

const HeaderIcones = () => {
    const classes = useStyles();
    const logged = localStorage.getItem('isLoggedIn');

    const [cartCount, setCartCount] = useState(0);
    const [favCount, setFavCount] = useState(0);

    const items = useSelector(state => state.cart);
    const {cart} = items;
    
    const favourite = useSelector(state=> state.favourite)
    const {bookmark} = favourite;
    // const bookmark = JSON.parse(localStorage.getItem('favouriteItems'))

    useEffect(()=> {
        let cartCount = 0;
        let favCount = bookmark.length;

        cart.forEach(item => {
            cartCount += item.qty
        })
        setCartCount(cartCount)
        setFavCount(favCount)
    }, [cart, cartCount, favCount, bookmark])

    let content;
    if(logged) {
        content = (
        <div>
            <Link to='/cart'>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cartCount} color="secondary">
                        <ShoppingCartOutlined />
                    </StyledBadge>
                </IconButton>
            </Link>
            <Link to='/favourite'>
                <IconButton aria-label="favourite">
                    <StyledBadge badgeContent={favCount} color="secondary">
                        <FavoriteOutlined />
                    </StyledBadge>
                </IconButton>
            </Link>
            <IconButton aria-label="favourite">
                <ToggleMenu />  
            </IconButton>
        </div>
        )
    } else {
        content = (
        <div>
            <Link to='/signup' className={classes.registerLinks}>
                <Button variant='contained' color='secondary'>
                    Signup
                </Button>
            </Link>
            <Link to='/signin' className={classes.registerLinks}>
                <Button variant='contained' color='secondary'>
                    Signin
                </Button>
            </Link>
        </div>
        )
    }
    return(
        <div>
            {content}
        </div>
    )
}

export default HeaderIcones;