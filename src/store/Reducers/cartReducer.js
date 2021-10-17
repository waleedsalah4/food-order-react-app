import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_ITEM_QTY, 
    CLEAR_CART
} from "../actions/types";

const cartState = {
    cart: [],
}

const cartReducer = (state = cartState, action) => {
    switch(action.type){
        case ADD_TO_CART:
             const newItem = action.payload.item;
            const inCart = state.cart.find(item => item._id === action.payload.id ? true : false)
            
            return {
                ...state,
                cart: inCart ? state.cart.map((item) => item._id === action.payload.id ? { ...item, qty: item.qty + 1 } : item) : [...state.cart, { ...newItem, qty: 1 }]
            };
        case REMOVE_FROM_CART: 
            return {
                
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload.id),
            }
        case ADJUST_ITEM_QTY: 
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === action.payload.id
                        ? { ...item, qty: +action.payload.qty }
                        : item
                ),
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            }
        default:
            return state
    }
}

export default cartReducer;