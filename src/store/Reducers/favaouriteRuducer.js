import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "../actions/types"

const favState = {
    bookmark: []
}

const favaouriteRuducer = (state = favState, action) => {
    switch(action.type){
        case ADD_TO_FAVOURITE:
            const newItem = action.payload.item;
            const inFav = state.bookmark.find(item => item._id === action.payload.id ? true : false)
            return {
                ...state,
                bookmark: inFav ? state.bookmark.map((item) => item._id === action.payload.id ? item : item) : [...state.bookmark, { ...newItem }]
            };
        case REMOVE_FROM_FAVOURITE:
            return {
                ...state,
                bookmark: state.bookmark.filter((item) => item._id !== action.payload.id)
            }
        default:
            return state;
    }
}

export default favaouriteRuducer;






//try to toggle item in fav if it there delete it if not put it