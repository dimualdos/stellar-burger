import { expect, test } from '@jest/globals';
import { dataNumberCardReducer, initialState } from '../services/reducers/order-card-number';


import {
    ORDER_NUMBER_REQUEST,
    ORDER_NUMBER_SUCCESS,
    ORDER_NUMBER_FAILED
} from '../services/constants/order-card-number';

describe('Redux constructor', () => {

    test("Should return the initial state", () => {
        expect(dataNumberCardReducer(undefined, { type: null })).toEqual(initialState)
    });

    test('Should handle ORDER_NUMBER_REQUEST', () => {
        const state = {
            ...initialState,
            itemsRequest: true,
            itemsFailed: false,
        }
        expect(dataNumberCardReducer(initialState, { type: ORDER_NUMBER_REQUEST })).toEqual(state)
    });
    test('Should handle ORDER_NUMBER_SUCCESS', () => {
        const numberOrder = {
            createdAt: '',
            ingredients: [''],
            name: '',
            number: 0,
            status: '',
            updatedAt: '',
            _id: '',
            __v: 0,
        }
        const state = {
            ...initialState,
            dataOrderNumber: numberOrder,
            itemsFailed: false,
            itemsRequest: false
        }
        expect(dataNumberCardReducer(initialState, { type: ORDER_NUMBER_SUCCESS, payload: numberOrder })).toEqual(state)
    });

    test('Should handle ORDER_NUMBER_FAILED', () => {
        const state = {
            ...initialState,
            itemsFailed: true,
            itemsRequest: false
        }
        expect(dataNumberCardReducer(initialState, { type: ORDER_NUMBER_FAILED })).toEqual(state)
    });

})