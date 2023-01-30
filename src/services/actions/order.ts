import { AppDispatch } from '../types';
import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED,
    ORDER_RESET
} from '../constants/orders';
import { postOrder } from '../../utils/burger-api';

export interface IOrderRequestAction {
    readonly type: typeof ORDER_REQUEST;
}
export interface IOrderSuccessAction {
    readonly type: typeof ORDER_SUCCESS;
    readonly payload: {};

}
export interface IOrderFailedAction {
    readonly type: typeof ORDER_FAILED;
}

export interface IOrderResetAction {
    readonly type: typeof ORDER_RESET;
}

export type TOrderActions =
    | IOrderRequestAction
    | IOrderSuccessAction
    | IOrderFailedAction
    | IOrderResetAction;


export const orderBurder = (orderData: { ingredients: string[]; } | undefined) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: ORDER_REQUEST
        })
        postOrder(orderData).then(async res => {
            if (res && res.success) {
                dispatch({
                    type: ORDER_SUCCESS,
                    payload: res
                })

            } else {
                dispatch({
                    type: ORDER_FAILED
                })
            }
        }).catch(err => {
            dispatch({
                type: ORDER_FAILED
            })
        })
    }
} 
