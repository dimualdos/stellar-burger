import { expect, test } from '@jest/globals';
import { constructorReducer, TInitialStateConstructor } from '../services/reducers/constructor';
import { TConstructorActions } from '../services/actions/constructor';

import {
    CONSTRUCTOR_ADD,
    CONSTRUCTOR_DELETE,
    CONSTRUCTOR_REORDER,
    CONSTRUCTOR_RESET
} from '../services/constants/constructor-constant';



const initialState: TInitialStateConstructor = {
    bun: null,
    ingredients: [],
}



describe('Redux constructor', () => {

    test("Should return the initial state", () => {
        expect(constructorReducer(undefined, { type: null })).toEqual(initialState)
    });

    test('Should handle CONSTRUCTOR_ADD', () => {

        const state = {
            ...initialState, bun: initialState.bun,
            ingredients: [
                {
                    id: 1,
                    type: "type",
                },
            ],
        }
        expect(constructorReducer(initialState, { type: CONSTRUCTOR_ADD, payload: { type: 'type', id: 1 } })).toEqual(state)
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
        expect(constructorReducer(initialState, { type: CONSTRUCTOR_REORDER })).toEqual(state)
    })

    test('Should handle CONSTRUCTOR_RESET', () => {
        const state = {
            ...initialState,
        }
        expect(constructorReducer(initialState, { type: CONSTRUCTOR_RESET })).toEqual(state)
    })

})