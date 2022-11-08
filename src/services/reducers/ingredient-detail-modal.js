import {
    SET_INGREDIENT_MODAL,
    RESET_INGREDIENT_MODAL
} from '../actions/ingredient-detail-modal';

export const initialState = {
    ingredientModal: null
}




export const reducerDetailModal = (state = initialState, action) => {

    switch (action.type) {
        case SET_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredientModal: action.payload
            };
        }
        case RESET_INGREDIENT_MODAL: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

