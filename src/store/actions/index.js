import { 
    SIGN_IN_SUCC, SIGN_IN_FAIL, SIGN_IN_REQ, 
    SIGN_UP_REQ, SIGN_UP_SUCC, SIGN_UP_FAIL,
    SIGN_OUT, 
    UPDATE_ME_REQ, UPDATE_ME_SUCC, UPDATE_ME_FAIL,
    UPDATE_PASSWORD_REQ, UPDATE_PASSWORD_SUCC, UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQ, FORGOT_PASSWORD_SUCC, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQ, RESET_PASSWORD_SUCC, RESET_PASSWORD_FAIL,

    GET_RECIPE_REQ,
    GET_RECIPE_SUCC, GET_RECIPE_FAIL,
    GET_ITEM_BY_ID_REQ, GET_ITEM_BY_ID_SUCC, GET_ITEM_BY_ID_FAIL,
    GET_GATEGORY_REQ, GET_GATEGORY_SUCC, GET_GATEGORY_FAIL,
    SEARCH_FAIL, SEARCH_REQ, SEARCH_SUCC,

    ADD_TO_CART, REMOVE_FROM_CART, ADJUST_ITEM_QTY, CLEAR_CART,

    ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE,
    } from "./types";


const url = 'https://panda-restaurant.herokuapp.com'


export const signUp = (userData) => {
    return async dispatch => {
        const obj = {
            name: userData.fullName,
            email: userData.email,
            password: userData.password,
            passwordConfirm: userData.confirmPassword
            }
            // console.log(obj)
        try{
            dispatch({type: SIGN_UP_REQ})
            const response = await fetch(`${url}/api/v1/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            
            const res = await response.json();
            // console.log(data.status)
            if(res.status !== 'fail'){
                
                const {data: {user}} = res;
                const {token} = res;
                const obj = {
                    token,
                    userData: user
                }
                dispatch({ type: SIGN_UP_SUCC, payload: obj })
                dispatch({ type: SIGN_IN_SUCC, payload: obj })
                
                localStorage.setItem('user-data', JSON.stringify(user));
                localStorage.setItem('user-token', JSON.stringify(token));
                localStorage.setItem('isLoggedIn', true);
            } else {
                // console.log(data)
                dispatch({type: SIGN_UP_FAIL, payload: res.message})

            }
        } catch(err) {
            dispatch({type: SIGN_UP_FAIL, payload: err.message})
        }
    }
}


export const signIn = (userData) => {
    return async dispatch => {
        const obj = {
            email: userData.email,
            password: userData.password,
            }
            // console.log(obj)
        try{
            dispatch({type: SIGN_IN_REQ})
            const response = await fetch(`${url}/api/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            
            const res = await response.json();
            // console.log(data.status)
            if(res.status !== 'fail'){
                const {data: {user}} = res;
                const {token} = res;
                const obj = {
                    token,
                    userData: user
                }
                dispatch({ type: SIGN_IN_SUCC, payload: obj })
                // console.log(obj)
                localStorage.setItem('user-data', JSON.stringify(user));
                localStorage.setItem('user-token', JSON.stringify(token));
                localStorage.setItem('isLoggedIn', true);
            } else {
                // console.log(data)
                dispatch({type: SIGN_IN_FAIL, payload: res.message})

            }
        } catch(err) {
            dispatch({type: SIGN_IN_FAIL, payload: err.message})
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        localStorage.removeItem('user-data')
        dispatch({type: SIGN_OUT})
    }
}

export const updateMe = (token, userData) => {
    return async dispatch => {
        try {
            const user = {
                name: userData.fullName,
                email: userData.email
            } 
            dispatch({type: UPDATE_ME_REQ})
            const response = await fetch(`${url}/api/v1/users/updateMe`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if(data.status !== 'fail'){
                const {user} = data
                dispatch({ type: UPDATE_ME_SUCC, payload: data })
                localStorage.setItem('user-data', JSON.stringify(user));
            } else {
                dispatch({type: UPDATE_ME_FAIL, payload: data.message})

            }

        } catch(error){
            dispatch({type: UPDATE_ME_FAIL, payload: error.message})
        }
    }
}

export const updatePassword = (token, userData) => {
    return async dispatch => {
        const obj = {
            passwordCurrent: userData.currentPassword,
            password: userData.password,
            passwordConfirm: userData.confirmPassword
        }
            // console.log(obj)
        try{
            dispatch({type: UPDATE_PASSWORD_REQ})
            const response = await fetch(`${url}/api/v1/users/updateMyPassword`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            
            const res = await response.json();
            // console.log(data.status)
            if(res.status !== 'fail'){
                const {data: {user}} = res;
                const {token} = res;
                const obj = {
                    token,
                    userData: user
                }
                dispatch({ type: UPDATE_PASSWORD_SUCC, payload: obj })
                // console.log(obj)
                localStorage.setItem('user-data', JSON.stringify(user));
                localStorage.setItem('user-token', JSON.stringify(token));
                localStorage.setItem('isLoggedIn', true);
            } else {
                // console.log(data)
                dispatch({type: UPDATE_PASSWORD_FAIL, payload: res.message})

            }
        } catch(err) {
            dispatch({type: UPDATE_PASSWORD_FAIL, payload: err.message})
        }
    }
}

export const forgotPassword = (userData) => {
    return async dispatch => {
        const obj = {
            email: userData.email
        }
        try{
            dispatch({type: FORGOT_PASSWORD_REQ})
            const response = await fetch(`${url}/api/v1/users/forgotPassword`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            const res = await response.json();
            if(res.status !== 'fail'){
                dispatch({ type: FORGOT_PASSWORD_SUCC, payload: res })
            } else {
                dispatch({type: FORGOT_PASSWORD_FAIL, payload: res.message})
            }
        } catch(error) {
            dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.message})
        }
    }
}


export const resetPassword = (token, userData) => {
    return async dispatch => {
        const obj = {
            password: userData.password,
            passwordConfirm: userData.confirmPassword
        }
        try{
            dispatch({type: RESET_PASSWORD_REQ})
            const response = await fetch(`${url}/api/v1/users/resetPassword/${token}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            
            const res = await response.json();
            if(res.status !== 'fail'){
                const {data: {user}} = res;
                const {token} = res;
                const obj = {
                    token,
                    userData: user
                }
                dispatch({ type: RESET_PASSWORD_SUCC, payload: obj })
                localStorage.setItem('user-data', JSON.stringify(user));
                localStorage.setItem('user-token', JSON.stringify(token));
                localStorage.setItem('isLoggedIn', true);
            } else {

                dispatch({type: RESET_PASSWORD_FAIL, payload: res.message})

            }
        } catch(err) {
            dispatch({type: RESET_PASSWORD_FAIL, payload: err.message})
        }
    }
}


export const getRecipes = (page) => {
    return async dispatch => {
        try{
            dispatch({type: GET_RECIPE_REQ})
            const res = await fetch(`${url}/api/v1/recipes?page=${page}&limit=3`)

            if(!res.ok) {
                throw new Error('Could not fetch cart data!')
            }

            const response = await res.json();

            if(response.status === 'success'){
                const {data: {data: res}} = response;
                // console.log(res)
                const recipesRes = {
                    recipesResults: res,
                    totalRecipe: response.docsCount
                }
                // console.log((recipesRes))
                dispatch({
                    type: GET_RECIPE_SUCC,
                    payload: recipesRes
                })
            } else{
                dispatch({
                    type: GET_RECIPE_FAIL,
                    payload: response.message
                })
            }
        
        } catch(error) {
            dispatch({
                type: GET_RECIPE_FAIL,
                payload: error.message
            })
        }
    }
    
}

export const getItemById = (id) => {
    return async dispatch => {
        try{
            dispatch({type: GET_ITEM_BY_ID_REQ})

            const res = await fetch(`${url}/api/v1/recipes?_id=${id}`)
            const response = await res.json();

            if(response.status === 'success'){
                const {data: {data: result}} = response;
                dispatch({
                    type: GET_ITEM_BY_ID_SUCC,
                    payload: result
                })

            } else{
                dispatch({ type: GET_ITEM_BY_ID_FAIL, payload: response.message })
            }
        
        } catch(error) {
            dispatch({
                type: GET_ITEM_BY_ID_FAIL,
                payload: error.message
            })
        }
    }
}

export const getGategory = () => {
    return async dispatch => {
        try{
            dispatch({type: GET_GATEGORY_REQ})

            const res = await fetch(`${url}/api/v1/categories/`)
            const response = await res.json();

            if(response.status === 'success'){
                const {data: {data: result}} = response;
               //why result is array of objects ???!
                dispatch({
                    type: GET_GATEGORY_SUCC,
                    payload: result
                })

            } else{
                dispatch({ type: GET_GATEGORY_FAIL, payload: response.message })
            }
        
        } catch(error) {
            dispatch({
                type: GET_GATEGORY_FAIL,
                payload: error.message
            })
        }
    }
}

export const getRecipesInCategory = (category, page) => {
    return async dispatch => {
        try{
            // dispatch({type: GET_RECIPE_REQ})
            const res = await fetch(`${url}/api/v1/recipes?category=${category}&page=${page}&limit=3`)

            const response = await res.json();

            if(response.status === 'success'){
                const {data: {data: res}} = response;
                // console.log(res)
                const recipesRes = {
                    recipesResults: res,
                    totalRecipe: response.docsCount
                }
                console.log((recipesRes))
                dispatch({
                    type: GET_RECIPE_SUCC,
                    payload: recipesRes
                })
            } else{
                dispatch({
                    type: GET_RECIPE_FAIL,
                    payload: response.message
                })
            }
        
        } catch(error) {
            dispatch({
                type: GET_RECIPE_FAIL,
                payload: error.message
            })
        }
    }
    
}


export const searchRecipe = (searchValue) => {
    return async dispatch => {
        try{
            dispatch({type: SEARCH_REQ})

            const res = await fetch(`${url}/api/v1/recipes/search?s=${searchValue}`)
            const response = await res.json();

            if(response.status === 'success'){
                const {data: {data: result}} = response;
                dispatch({
                    type: SEARCH_SUCC,
                    payload: result
                })

            } else{
                dispatch({ type: SEARCH_FAIL, payload: response.message })
            }
        
        } catch(error) {
            dispatch({
                type: SEARCH_FAIL,
                payload: error.message
            })
        }
    }
}

//cart

export const addToCart = (item) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                id: item._id,
                item: item
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart))
    }
}

export const removeFromCart = (itemId) => {
    return  (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: {
                id: itemId
            }
        })
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart))
    }
}

export const adjustItemQty = (itemID, qty) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADJUST_ITEM_QTY,
            payload: {
              id: itemID,
              qty,
            }
        })
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart))
    }
  };
  export const clearCart = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_CART,
        })
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart))
    }
  };
  
//   export const loadCurrentItem = (item) => {
//     return dispatch => {
//         dispatch({
//             type: LOAD_CURRENT_ITEM,
//             payload: item,
//         })
//     };
//   };

export const addToFav = (item) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TO_FAVOURITE,
            payload: {
                id: item._id,
                item: item
            }
        })
        
    localStorage.setItem('favouriteItems', JSON.stringify(getState().favourite.bookmark))
    }
}

export const removeFromFav = (itemId) => {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_FAVOURITE,
            payload: {
                id: itemId
            }
        })
        
    localStorage.setItem('favouriteItems', JSON.stringify(getState().favourite.bookmark))
    }
}