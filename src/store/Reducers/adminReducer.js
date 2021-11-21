import {
    GET_ALL_USERS_FAIL, GET_ALL_USERS_REQ, GET_ALL_USERS_SUCC,DELETE_USER,
    GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_REQ, GET_ALL_ORDERS_SUCC,HANDEL_DELETE_ORDER,
    POST_ITEM_REQ, POST_ITEM_FAIL, POST_ITEM_SUCC,
    REMOVED_REQ, REMOVED_FAIL, REMOVED_SUCC,

    EDIT_FAIL, EDIT_REQ, EDIT_SUCC
    
} from '../actions/types'

export const getAllUsersReducer = (state = { users: [], totalUsers: 0 } , action) => {
    switch(action.type){
        case GET_ALL_USERS_REQ:
            return { 
                ...state,
                loading: true, 
                // users: [], 
                // totalUsers: 0
            }
        case GET_ALL_USERS_SUCC:
            return { loading: false, users: action.payload.usersResults, totalUsers: action.payload.totalCount}
            case DELETE_USER:
            return{
                ...state,
                users: state.users.filter((item) => item._id !== action.payload.id)
            }
        case GET_ALL_USERS_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
    
}


export const getAllOrdersReducer = (state = { allOrders: [], totalOrders: 0 } , action) => {
    switch(action.type){
        case GET_ALL_ORDERS_REQ:
            return { 
                ...state,
                loading: true,
                //  allOrders: [],
                // totalOrders: 0
            }
        case GET_ALL_ORDERS_SUCC:
            return { loading: false, allOrders: action.payload.ordersResults, totalOrders: action.payload.totalCount}
        case HANDEL_DELETE_ORDER:
            return{
                ...state,
                allOrders: state.allOrders.filter((item) => item._id !== action.payload.id)
            }
        case GET_ALL_ORDERS_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
    
}

//needs refactor
export const handlePostItemsReducer = (state = { items: {}} , action) => {
    switch(action.type){
        case POST_ITEM_REQ:
            return { loading: true, items: {}}
        case POST_ITEM_SUCC:
            return { loading: false, items: action.payload}
        case POST_ITEM_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}

export const handelDeleteReducer = (state = { removed: {}} , action) => {
    switch(action.type){
        case REMOVED_REQ:
            return { loading: true, removed: {}}
        case REMOVED_SUCC:
            return { loading: false, removed: action.payload}
        case REMOVED_FAIL:
            return {loading: false , errorDelete: action.payload}
        default:
            return state;
    }
}

export const handelEditReducer = (state = { edited: {}} , action) => {
    switch(action.type){
        case EDIT_REQ:
            return { loading: true, edited: {}}
        case EDIT_SUCC:
            return { loading: false, edited: action.payload}
        case EDIT_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}