import { expect, test } from '@jest/globals';
import { initialState, reducerDetailModal } from '../services/reducers/ingredient-detail-modal';


import {
    SET_INGREDIENT_MODAL,
    RESET_INGREDIENT_MODAL
} from '../services/actions/ingredient-detail-modal';

describe('Redux constructor', () => {

    test("Should return the initial state", () => {
        expect(reducerDetailModal(undefined, { type: null })).toEqual(initialState)
    });

    test('Should handle SET_INGREDIENT_MODAL', () => {
        const ingredient = {
            name: '',
            number: 0,
            updatedAt: 0,
            ingredients: '',
            status: ''
        }
        const state = {
            ...initialState,
            ingredientModal: ingredient
        }
        expect(reducerDetailModal(initialState, { type: SET_INGREDIENT_MODAL, payload: ingredient })).toEqual(state)
    });
    test('Should handle RESET_INGREDIENT_MODAL', () => {

        const state = {
            ...initialState,
        }
        expect(reducerDetailModal(initialState, { type: RESET_INGREDIENT_MODAL })).toEqual(state)
    });


})