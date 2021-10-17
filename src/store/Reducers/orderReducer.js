import { 
    POST_ORDER_FAIL, POST_ORDER_REQ, POST_ORDER_SUCC,
    CANCEL_ORDER_FAIL, CANCEL_ORDER_REQ, CANCEL_ORDER_SUCC,
    
    GET_MY_ORDERS_FAIL, GET_MY_ORDERS_REQ, GET_MY_ORDERS_SUCC,
} from '../actions/types';


export const postOrderReducer = (state = { orders: []} , action) => {
    switch(action.type){
        case POST_ORDER_REQ:
            return { loading: true, orders: []}
        case POST_ORDER_SUCC:
            return { loading: false, orders: action.payload}
        case POST_ORDER_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}

export const cancelOrderReducer = (state = { canceled: []} , action) => {
    switch(action.type){
        case CANCEL_ORDER_REQ:
            return { loading: true, canceled: []}
        case CANCEL_ORDER_SUCC:
            return { loading: false, canceled: action.payload}
        case CANCEL_ORDER_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}

export const getMyOrdersReducer = (state = { orders: []} , action) => {
    switch(action.type){
        case GET_MY_ORDERS_REQ:
            return { loading: true, orders: []}
        case GET_MY_ORDERS_SUCC:
            return { loading: false, orders: action.payload}
        case GET_MY_ORDERS_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}