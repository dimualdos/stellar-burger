import { expect, test } from '@jest/globals';
import { initialState, orderReducer } from './order';

import {
    ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED, ORDER_RESET
} from '../constants/orders';



describe('Redux constructor', () => {

    test("Should return the initial state", () => {
        expect(orderReducer(undefined, { type: null })).toEqual(initialState)
    });

    test('Should handle ORDER_REQUEST', () => {
        const state = {
            ...initialState,
            orderRequest: true,
            orderFailed: false,
        }
        expect(orderReducer(initialState, { type: ORDER_REQUEST })).toEqual(state)
    });
    test('Should handle ORDER_SUCCESS', () => {
        const numberOrder = {
            name: '',
            order: {},
            success: true
        }
        const state = {
            ...initialState,
            order: numberOrder,
            orderFailed: false,
            orderRequest: false
        }
        expect(orderReducer(initialState, { type: ORDER_SUCCESS, payload: numberOrder })).toEqual(state)
    });

    test('Should handle ORDER_FAILED', () => {
        const state = {
            ...initialState,
            orderFailed: true,
            orderRequest: false
        }
        expect(orderReducer(initialState, { type: ORDER_FAILED })).toEqual(state)
    });

    test('Should handle ORDER_RESET', () => {
        const state = {
            ...initialState,
            order: null,
            orderFailed: true,
            orderRequest: false
        }
        expect(orderReducer(initialState, { type: ORDER_RESET })).toEqual(state)
    });

})