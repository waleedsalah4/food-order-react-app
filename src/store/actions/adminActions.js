import {
    GET_ALL_USERS_FAIL, GET_ALL_USERS_REQ, GET_ALL_USERS_SUCC,
    DELETE_USER,
    
    GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_REQ, GET_ALL_ORDERS_SUCC,HANDEL_DELETE_ORDER,

    GET_ITEM_BY_ID_FAIL, GET_ITEM_BY_ID_REQ, GET_ITEM_BY_ID_SUCC,
    
    POST_ITEM_REQ, POST_ITEM_FAIL, //POST_ITEM_SUCC,

    DELETE_GATEGORY, POST_GATEGORY,
    REMOVED_FAIL, REMOVED_REQ, //REMOVED_SUCC,
    DELETE_RECIPE, POST_RECIPE,
    EDIT_FAIL, EDIT_REQ, //EDIT_SUCC,
} from './types';

import {getGategory, getRecipes} from './index';



const url = 'https://panda-restaurant.herokuapp.com'


//start of GET
export const getUsers = ( token, page ) => {
    return async dispatch => {
        try{
            dispatch({type: GET_ALL_USERS_REQ})
            const res = await fetch(`${url}/api/v1/users?page=${page}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const response = await res.json();
            if(response.status === 'success'){
                const {data: {data: res}} = response;
                const recipesRes = {
                    usersResults: res,
                    totalCount: response.docsCount
                }
                dispatch({
                    type: GET_ALL_USERS_SUCC,
                    payload: recipesRes
                })
            } else{
                dispatch({
                    type: GET_ALL_USERS_FAIL,
                    payload: response.message
                })
            }
        
        } catch(error) {
            dispatch({
                type: GET_ALL_USERS_FAIL,
                payload: error.message
            })
        }
    }
    
}


export const getAllOrders = (page ,token) => {
    return async dispatch => {
        try{
            dispatch({type: GET_ALL_ORDERS_REQ})
            const res = await fetch(`${url}/api/v1/orders/all?page=${page}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const response = await res.json();
            if(response.status === 'success'){
                const {data: {data: res}} = response;
                // console.log(response)
                const ordersRes = {
                    ordersResults: res,
                    totalCount: response.docsCount
                }
                dispatch({
                    type: GET_ALL_ORDERS_SUCC,
                    payload: ordersRes
                })
            } else{
                dispatch({
                    type: GET_ALL_ORDERS_FAIL,
                    payload: response.message
                })
            }
        
        } catch(error) {
            dispatch({
                type: GET_ALL_ORDERS_FAIL,
                payload: error.message
            })
        }
    }
    
}

export const getItemsById = (token, id, type) => {
    return async dispatch => {
        
         
        try{
            let link='';
            if(type === 'user'){
                link = `${url}/api/v1/users/${id}`
            } else if(type === 'category') {
                link = `${url}/api/v1/categories?_id=${id}`;
            }
            dispatch({type: GET_ITEM_BY_ID_REQ})

            const res = await fetch(link, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
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

//End of GET

//start of POST

export const postRecipe = (token, recipeData) => {
    return async dispatch => {
        try{
            dispatch({type: POST_ITEM_REQ})
            const res = await fetch(`${url}/api/v1/recipes/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": 'multipart/form-data'
                },
                body: recipeData
            })
            const response = await res.json();
            console.log(response)
            if(response.status === 'success'){
                const {data: {data: newRecipe}} = response;

                dispatch({
                    type: POST_RECIPE,
                    payload: {
                        item: newRecipe
                    }
                })
            } else{
                dispatch({
                    type: POST_ITEM_FAIL,
                    payload: response.message
                })
            }
        } catch(error) {
            dispatch({
                type: POST_ITEM_FAIL,
                payload: error.message
            })
        }
    }
    
}

export const postCategory = (token, categoryName) => {
    return async dispatch => {
        try{
            dispatch({type: POST_ITEM_REQ})
            const res = await fetch(`${url}/api/v1/categories/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: categoryName
                })
            })
            const response = await res.json();
            // console.log(response)
            if(response.status === 'success'){
                const {data: {data: category}} = response;
                // console.log(category)
                dispatch({
                    type: POST_GATEGORY,
                    payload: {
                        item: category
                    }
                })
            } else{
                dispatch({
                    type: POST_ITEM_FAIL,
                    payload: response.message
                })
            }
        } catch(error) {
            dispatch({
                type: POST_ITEM_FAIL,
                payload: error.message
            })
        }
    }
    
}
//ENF of POST

//start of Delete

export const deleteRecipe = (token, id) => {
    return async dispatch => {
        try{
            dispatch({type: REMOVED_REQ})
            const res = await fetch(`${url}/api/v1/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            if(res.status === 204){
                dispatch({
                    type: DELETE_RECIPE,
                    payload: {
                        id: id
                    }
                })
            }
        } catch(error) {
            dispatch({
                type: REMOVED_FAIL,
                payload: error.message
            })
        }
    }
    
}

export const deleteCategory = (token, id) => {
    return async dispatch => {
        try{
            dispatch({type: REMOVED_REQ})
            const res = await fetch(`${url}/api/v1/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            if(res.status === 204){
                dispatch({
                    type: DELETE_GATEGORY,
                    payload: {
                        id: id
                    }
                })
            }
        } catch(error) {
            dispatch({
                type: REMOVED_FAIL,
                payload: error.message
            })
        }
    }
    
}


export const deleteOrder = (token, id) => {
    return async dispatch => {
        try{
            const res = await fetch(`${url}/api/v1/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
        
        if(res.status === 204){
            dispatch({
                type: HANDEL_DELETE_ORDER,
                payload: {
                    id: id
                }
            })
        }

        } catch(error) {
            dispatch({
                type: REMOVED_FAIL,
                payload: error.message
            })
        }
    }
}

export const deleteUser = (token, id) => {
    return async dispatch => {
        try{
            dispatch({type: REMOVED_REQ})
            const res = await fetch(`${url}/api/v1/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            if(res.status === 204){
                dispatch({
                    type: DELETE_USER,
                    payload: {
                        id: id
                    }
                })
            }
        } catch(error) {
            dispatch({
                type: REMOVED_FAIL,
                payload: error.message
            })
        }
    }
    
}

//End of Delete

//Start edit
export const editCategory = (token, id, categoryName) => {
    return async dispatch => {
        try{
            dispatch({type: EDIT_REQ})
            const res = await fetch(`${url}/api/v1/categories/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: categoryName
                })
            })
            // const response = await res.json()
            // console.log(response)
            if(res.status === 200){
                dispatch(getGategory())
            }
        } catch(error) {
            dispatch({
                type: EDIT_FAIL,
                payload: error.message
            })
        }
    }
    
}


export const editUser = (token, id, userData, page) => {
    return async dispatch => {
        // console.log(page)
        try{
            dispatch({type: EDIT_REQ})
            const res = await fetch(`${url}/api/v1/users/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            // const response = await res.json()
            // console.log(response)
            if(res.status === 200){
                dispatch(getUsers(token, page))
            }
        } catch(error) {
            dispatch({
                type: EDIT_FAIL,
                payload: error.message
            })
        }
    }
}

export const editRecipe = (token, id, RecipeData, page) => {
    return async dispatch => {
        // console.log(page)
        try{
            dispatch({type: EDIT_REQ})
            const res = await fetch(`${url}/api/v1/recipes/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: RecipeData
            })
            const response = await res.json()
            console.log(response)
            if(res.status === 200){
                dispatch(getRecipes(page))
            }
        } catch(error) {
            dispatch({
                type: EDIT_FAIL,
                payload: error.message
            })
        }
    }
    
}