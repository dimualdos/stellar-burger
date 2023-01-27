import { expect, test } from '@jest/globals';

import { initialState, itemsReducer } from './indredients';
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_FAILED,
    GET_ITEMS_SUCCESS
} from '../constants/ingredients';



describe('Redux constructor', () => {

    test("Should return the initial state", () => {
        expect(itemsReducer(undefined, { type: null })).toEqual(initialState)
    });

    test('Should handle GET_ITEMS_REQUEST', () => {

        const state = {
            ...initialState,
            itemsRequest: true,
            itemsFailed: false,
        }
        expect(itemsReducer(initialState, { type: GET_ITEMS_REQUEST })).toEqual(state)
    });

    test('Should handle GET_ITEMS_SUCCESS', () => {
        const ingredient = {
            _id: '',
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            image: '',
            image_large: '',
            image_mobile: '',
            name: '',
            price: 0,
            proteins: 0,
            type: '',
            __v: 0
        }
        const state = {
            ...initialState,
            items: [ingredient],
            itemsFailed: false,
            itemsRequest: false
        }
        expect(itemsReducer(initialState, {
            type: GET_ITEMS_SUCCESS, payload: [ingredient]
        })).toEqual(state)
    });

    test('Should handle GET_ITEMS_FAILED', () => {

        const state = {
            ...initialState,
            itemsFailed: true,
            itemsRequest: false,
        }
        expect(itemsReducer(initialState, { type: GET_ITEMS_FAILED })).toEqual(state)
    });



})