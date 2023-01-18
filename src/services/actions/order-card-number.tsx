


import { TApplicationActions } from '../types';
import { ORDER_NUMBER_REQUEST, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED } from '../constants/order-card-number';
import { getOrderByNumber } from '../../utils/burger-api';

export interface IOrderNumberRequestAction {
    readonly type: typeof ORDER_NUMBER_REQUEST;
}
export interface IOrderNumberSuccessAction {
    readonly type: typeof ORDER_NUMBER_SUCCESS;
    readonly payload?: any;
}
export interface IOrderNumberFailedAction {
    readonly type: typeof ORDER_NUMBER_FAILED;
}


export type TDataOrderActions =
    | IOrderNumberRequestAction
    | IOrderNumberSuccessAction
    | IOrderNumberFailedAction;


export const getDataOrderCard = (number: string) => {

    return function (dispatch: (arg0: TApplicationActions) => void) {
        dispatch({
            type: ORDER_NUMBER_REQUEST
        })
        getOrderByNumber(number).then(res => {
            if (res && res.success) {
                // console.log(res.orders[0])
                dispatch({
                    type: ORDER_NUMBER_SUCCESS,
                    payload: res.orders[0],
                })
            }
        }).catch(err => {
            dispatch({
                type: ORDER_NUMBER_FAILED
            })
        })
    }
}
