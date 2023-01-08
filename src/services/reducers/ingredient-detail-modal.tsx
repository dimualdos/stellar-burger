
import { TApplicationActions } from '../types';

import {
    SET_INGREDIENT_MODAL,
    RESET_INGREDIENT_MODAL
} from '../actions/ingredient-detail-modal';



export type TInitinalStateIngredientDetailModal = {
    ingredientModal: null | Object
};

export const initialState: TInitinalStateIngredientDetailModal = {
    ingredientModal: null
};

export const reducerDetailModal = (state = initialState, action: TApplicationActions): TInitinalStateIngredientDetailModal => {

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

