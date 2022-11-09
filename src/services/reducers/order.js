
import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED,
    ORDER_RESET
} from '../actions/order';

export const initialState = {
    orderRequest: false,
    orderFailed: false,
    order: null
}


export const orderReducer = (state = initialState, action) => {
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
            return state
        }
        default: {
            return state
        }
    }
}
