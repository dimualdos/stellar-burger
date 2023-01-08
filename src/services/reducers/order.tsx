import { TApplicationActions } from '../types';

import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED,
    ORDER_RESET
} from '../constants/orders';

export type TInitinalStateOrder = {
    orderRequest?: boolean;
    orderFailed?: boolean;
    order?: any
}

export const initialState: TInitinalStateOrder = {
    orderRequest: false,
    orderFailed: false,
    order: null
}


export const orderReducer = (state = initialState, action: TApplicationActions): TInitinalStateOrder => {
    switch (action.type) {
        case ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                order: action.payload,
                orderFailed: false,
                orderRequest: false
            };
        }
        case ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        case ORDER_RESET: {
            return {
                ...state,
                order: null,
                orderFailed: true,
                orderRequest: false
            }
        }
        default: {
            return state
        }
    }
}
