import { TApplicationActions } from '../types';
import { TProductItem, TWSOrder } from '../../utils/types';

import {
    ORDER_NUMBER_REQUEST,
    ORDER_NUMBER_SUCCESS,
    ORDER_NUMBER_FAILED
} from '../constants/order-card-number';



export type TInitialStateIngredients = {
    itemsRequest: boolean,
    itemsFailed: boolean,
    dataOrderNumber: TWSOrder[];
}

export const initialState: TInitialStateIngredients = {
    itemsRequest: false,
    itemsFailed: false,
    dataOrderNumber: [{}]
}


export const dataNumberCardReducer = (state = initialState, action: any): TInitialStateIngredients => {
    switch (action.type) {
        case ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsFailed: false,
            };
        }
        case ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                dataOrderNumber: action.payload,
                itemsFailed: false,
                itemsRequest: false
            };
        }
        case ORDER_NUMBER_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false
            };
        }
        default: {
            return state
        }
    }
}

