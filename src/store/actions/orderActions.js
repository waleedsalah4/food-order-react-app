import { 
    POST_ORDER_FAIL, POST_ORDER_REQ, POST_ORDER_SUCC,
    CANCEL_ORDER_FAIL, CANCEL_ORDER_REQ, CANCEL_ORDER_SUCC,
    
    GET_MY_ORDERS_FAIL, GET_MY_ORDERS_REQ, GET_MY_ORDERS_SUCC,
} from './types';

import { clearCart } from './index';

const url = 'https://panda-restaurant.herokuapp.com'


export const postOrderReq = (items, formData, token, method) => {
    return async dispatch => {
        const obj = {
            orderContent: items,
            customerAddress: formData.address,
            customerPhoneNumber: formData.phone
        }
        // console.log(obj,token)
        try{
            dispatch({type: POST_ORDER_REQ})

            const res = await fetch(`${url}/api/v1/orders/`,{
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })

            const response = await res.json();

            if(response.status === 'success'){
                // const {data: {data: result}} = response;
            //    console.log(response)
                dispatch({
                    type: POST_ORDER_SUCC,
                    payload: response
                })
                if(method === 'multi'){
                    dispatch(clearCart())
                }
            } else{
                dispatch({ type: POST_ORDER_FAIL, payload: response.message })
            }
        
        } catch(error) {
            dispatch({
                type: POST_ORDER_FAIL,
                payload: error.message
            })
        }
    }
}


export const getMYOrdersReq = (token) => {
    return async dispatch => {
        try{
            dispatch({type: GET_MY_ORDERS_REQ})

            const res = await fetch(`${url}/api/v1/orders/`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
              
            const response = await res.json();

            if(response.status === 'success'){
                const {data} = response;
                dispatch({
                    type: GET_MY_ORDERS_SUCC,
                    payload: data
                })
            } else{
                dispatch({ type: GET_MY_ORDERS_FAIL, payload: response.message })
            }
        
        } catch(error) {
            dispatch({
                type: GET_MY_ORDERS_FAIL,
                payload: error.message
            })
        }
    }
}



export const cancelOrderReq = (token, id) => {
    return async (dispatch) => {
        try{
            dispatch({type: CANCEL_ORDER_REQ})

            const res = await fetch(`${url}/api/v1/orders/cancelOrder/${id}`,{
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
              
            const response = await res.json();

            if(response.status === 'success'){
                // const {data} = response;
                dispatch({
                    type: CANCEL_ORDER_SUCC,
                    payload: response
                })
                dispatch(getMYOrdersReq(token))
            } else{
                console.log(response.message)
                dispatch({ type: CANCEL_ORDER_FAIL, payload: response.message })
            }
        
        } catch(error) {
            dispatch({
                type: CANCEL_ORDER_FAIL,
                payload: error.message
            })
        }
    }
}