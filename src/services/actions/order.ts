

import { CONSTRUCTOR_REORDER } from '../constants/constructor-constant';
import { TApplicationActions } from '../types';
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


export const orderBurder = (orderData?: any) => {
    return function (dispatch: (arg0: TApplicationActions) => Promise<any>) {
        dispatch({
            type: ORDER_REQUEST
        })
        postOrder(orderData).then(async res => {
            console.log(res)
            if (res && res.success) {
                dispatch({
                    type: ORDER_SUCCESS,
                    payload: res
                }).then(
                    await dispatch({
                        type: CONSTRUCTOR_REORDER
                    })

                )
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
