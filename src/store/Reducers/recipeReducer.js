import { 
    GET_RECIPE_REQ, GET_RECIPE_SUCC, GET_RECIPE_FAIL,
    GET_RECIPE_BY_ID_REQ, GET_RECIPE_BY_ID_SUCC, GET_RECIPE_BY_ID_FAIL,
    GET_GATEGORY_REQ, GET_GATEGORY_SUCC, GET_GATEGORY_FAIL,
    SEARCH_FAIL, SEARCH_REQ, SEARCH_SUCC
} from "../actions/types";



export const recipeReducer = (state = { recipes: [], totalRecipes: null } , action) => {
    switch(action.type){
        case GET_RECIPE_REQ:
            return { loading: true, recipes: [], totalRecipes: 0}
        case GET_RECIPE_SUCC:
            return { loading: false, recipes: action.payload.recipesResults, totalRecipes: action.payload.totalRecipe}
        case GET_RECIPE_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
    
}

export const getRecipeByIdReducer = (state = { recipes: []} , action) => {
    switch(action.type){
        case GET_RECIPE_BY_ID_REQ:
            return { loading: true, recipes: []}
        case GET_RECIPE_BY_ID_SUCC:
            return { loading: false, recipes: action.payload}
        case GET_RECIPE_BY_ID_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}

export const getCategoryReducer = (state = { category: []} , action) => {
    switch(action.type){
        case GET_GATEGORY_REQ:
            return { loading: true, category: []}
        case GET_GATEGORY_SUCC:
            return { loading: false, category: action.payload}
        case GET_GATEGORY_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}

export const searchReducer = (state = { recipes: []} , action) => {
    switch(action.type){
        case SEARCH_REQ:
            return { loading: true, recipes: []}
        case SEARCH_SUCC:
            return { loading: false, recipes: action.payload}
        case SEARCH_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
}