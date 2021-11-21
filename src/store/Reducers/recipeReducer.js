import { 
    GET_RECIPE_REQ, GET_RECIPE_SUCC, GET_RECIPE_FAIL, POST_RECIPE,DELETE_RECIPE,
    GET_ITEM_BY_ID_REQ, GET_ITEM_BY_ID_SUCC, GET_ITEM_BY_ID_FAIL,
    GET_GATEGORY_REQ, GET_GATEGORY_SUCC, GET_GATEGORY_FAIL,
    DELETE_GATEGORY, POST_GATEGORY,
    SEARCH_FAIL, SEARCH_REQ, SEARCH_SUCC
} from "../actions/types";



export const recipeReducer = (state = { recipes: [], totalRecipes: 0 , loading: false} , action) => {
    switch(action.type){
        case GET_RECIPE_REQ:
            return { 
                ...state,
                loading: true, 
                // recipes: [], 
                // totalRecipes: 0
            }
        case GET_RECIPE_SUCC:
            return { loading: false, recipes: action.payload.recipesResults, totalRecipes: action.payload.totalRecipe}
        case POST_RECIPE:
            const newItem = action.payload.item;
            // console.log(newItem)
            return {
                ...state,
                recipes: [...state.recipes, newItem],
                totalRecipes: state.totalRecipes + 1
            }
        case DELETE_RECIPE:
            return{
                ...state,
                recipes: state.recipes.filter((item) => item._id !== action.payload.id),
                totalRecipes: state.totalRecipes - 1
            }
        case GET_RECIPE_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state;
    }
    
}

export const getItemByIdReducer = (state = { item: [], loading: false} , action) => {
    switch(action.type){
        case GET_ITEM_BY_ID_REQ:
            return { 
                // ...state,
                loading: true, 
                item: []
            }
        case GET_ITEM_BY_ID_SUCC:
            return { loading: false, item: action.payload}
        case GET_ITEM_BY_ID_FAIL:
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
        case POST_GATEGORY:
            const newItem = action.payload.item;
            // console.log(newItem)
            return {
                ...state,
                category: [...state.category, newItem]
            }
        case DELETE_GATEGORY:
            return {
                ...state,
                category: state.category.filter((item) => item._id !== action.payload.id)
            }
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