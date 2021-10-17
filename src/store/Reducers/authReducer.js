import {  
    SIGN_IN_SUCC, SIGN_IN_FAIL, SIGN_IN_REQ,
    SIGN_OUT, 
    SIGN_UP_REQ, SIGN_UP_SUCC, SIGN_UP_FAIL,
    UPDATE_ME_REQ, UPDATE_ME_SUCC, UPDATE_ME_FAIL,
    UPDATE_PASSWORD_REQ, UPDATE_PASSWORD_SUCC, UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQ, FORGOT_PASSWORD_SUCC, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQ, RESET_PASSWORD_SUCC, RESET_PASSWORD_FAIL
} from '../actions/types'



export const loginReducer = (state = {}, action) => {
    switch(action.type) {
        case SIGN_IN_REQ:
            return {loading: true }
        case SIGN_IN_SUCC:
            return {loading: false, userData: action.payload.userData, token: action.payload.token }
        case SIGN_IN_FAIL:
            return {loading: false, error: action.payload }
        case SIGN_OUT: 
            return {}
        default:
            return state;
    }
}

export const signUpReducer = (state = {}, action) => {
    switch(action.type) {
        case SIGN_UP_REQ:
            return {loading: true }
        case SIGN_UP_SUCC:
            return {loading: false, userData: action.payload, token: action.payload.token  }
        case SIGN_UP_FAIL:
            return {loading: false, error: action.payload }
        default:
            return state;
    }
    
}


export const UpdateMeReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_ME_REQ:
            return {loading: true }
        case UPDATE_ME_SUCC:
            return {loading: false, userData: action.payload }
        case UPDATE_ME_FAIL:
            return {loading: false, error: action.payload }
        default:
            return state;
    }
}

export const updatePasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_PASSWORD_REQ:
            return {loading: true }
        case UPDATE_PASSWORD_SUCC:
            return {loading: false, userData: action.payload.userData, token: action.payload.token }
        case UPDATE_PASSWORD_FAIL:
            return {loading: false, error: action.payload }
        default:
            return state;
    }
}


export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQ:
            return {loading: true }
        case FORGOT_PASSWORD_SUCC:
            return {loading: false, emailSent: action.payload}
        case FORGOT_PASSWORD_FAIL:
            return {loading: false, error: action.payload }
        default:
            return state;
    }
}

export const resetPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case RESET_PASSWORD_REQ:
            return {loading: true }
        case RESET_PASSWORD_SUCC:
            return {loading: false, userData: action.payload.userData, token: action.payload.token }
        case RESET_PASSWORD_FAIL:
            return {loading: false, error: action.payload }
        default:
            return state;
    }
}