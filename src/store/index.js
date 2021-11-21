import { combineReducers } from 'redux';
import { forgotPasswordReducer, loginReducer, signUpReducer, UpdateMeReducer, updatePasswordReducer, resetPasswordReducer} from './Reducers/authReducer';
import {recipeReducer, getItemByIdReducer, getCategoryReducer, searchReducer} from "./Reducers/recipeReducer";
import cartReducer from './Reducers/cartReducer';
import favaouriteRuducer from './Reducers/favaouriteRuducer';
import { postOrderReducer, getMyOrdersReducer, cancelOrderReducer} from './Reducers/orderReducer'
import { getAllUsersReducer, getAllOrdersReducer, handlePostItemsReducer, handelDeleteReducer, handelEditReducer } from './Reducers/adminReducer';


const reducers = combineReducers({
    userLogin: loginReducer,
    userSignup: signUpReducer,

    updateMe: UpdateMeReducer,
    updatePassword: updatePasswordReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,

    recipe: recipeReducer,
    category: getCategoryReducer,
    itemById: getItemByIdReducer,
    search: searchReducer,

    cart: cartReducer,
    
    favourite: favaouriteRuducer,
    
    postOrder: postOrderReducer,
    getMyOrders: getMyOrdersReducer,
    cancelOrder: cancelOrderReducer,

    getAllUsers: getAllUsersReducer,
    getAlOrders: getAllOrdersReducer,
    createItems: handlePostItemsReducer,
    deletedItem: handelDeleteReducer,
    editItem: handelEditReducer
})



export default reducers;