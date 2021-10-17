import { combineReducers } from 'redux';
import { forgotPasswordReducer, loginReducer, signUpReducer, UpdateMeReducer, updatePasswordReducer, resetPasswordReducer} from './Reducers/authReducer';
import {recipeReducer, getRecipeByIdReducer, getCategoryReducer, searchReducer} from "./Reducers/recipeReducer";
import cartReducer from './Reducers/cartReducer';
import favaouriteRuducer from './Reducers/favaouriteRuducer';
import { postOrderReducer, getMyOrdersReducer, cancelOrderReducer} from './Reducers/orderReducer'


const reducers = combineReducers({
    userLogin: loginReducer,
    userSignup: signUpReducer,

    updateMe: UpdateMeReducer,
    updatePassword: updatePasswordReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,

    recipe: recipeReducer,
    category: getCategoryReducer,
    recipeById: getRecipeByIdReducer,
    search: searchReducer,

    cart: cartReducer,
    
    favourite: favaouriteRuducer,
    
    postOrder: postOrderReducer,
    getMyOrders: getMyOrdersReducer,
    cancelOrder: cancelOrderReducer
})



export default reducers;