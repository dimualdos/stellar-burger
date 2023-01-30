import { expect, test } from '@jest/globals';
import { constructorReducer } from './constructor';
import { initialState } from "./constructor";
import {
    CONSTRUCTOR_ADD,
    CONSTRUCTOR_DELETE,
    CONSTRUCTOR_REORDER,
    CONSTRUCTOR_RESET
} from '../constants/constructor-constant';

describe('Redux constructor', () => {

    test("Should return the initial state", () => {
        expect(constructorReducer(undefined, { type: null })).toEqual(initialState)
    });

    test('Should handle CONSTRUCTOR_ADD', () => {
        const ingredient = {
            id: '',
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
            __v: 0,
        }

        const state = {
            ...initialState, bun: initialState.bun,
            ingredients: [
                {
                    ...ingredient,
                    id: '',
                },
            ],
        }
        expect(constructorReducer(initialState, {
            type: CONSTRUCTOR_ADD,
            payload: {
                id: '',
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
                __v: 0,
            }
        })).toEqual(state)
    })

    test('Should handle CONSTRUCTOR_DELETE', () => {
        const state = {
            ...initialState,
            ingredients: [
                ...initialState.ingredients.slice(0, 1),
                ...initialState.ingredients.slice(1 + 1),
            ]
        }
        expect(constructorReducer(initialState, { type: CONSTRUCTOR_DELETE, payload: 1 })).toEqual(state)
    })

    test('Should handle CONSTRUCTOR_REORDER', () => {

        const to = 1;
        const from = 2
        const ingredients: any = [...initialState.ingredients];
        ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);

        const state = {
            ...initialState,
            ingredients,
        }
        expect(constructorReducer(initialState, { type: CONSTRUCTOR_REORDER, payload: ingredients })).toEqual(state)
    })

    test('Should handle CONSTRUCTOR_RESET', () => {
        const state = {
            ...initialState,
        }
        expect(constructorReducer(initialState, { type: CONSTRUCTOR_RESET })).toEqual(state)
    })

})