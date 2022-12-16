import { CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from './constructor';

import { postOrder } from '../../utils/burger-api.ts';

export const ORDER_REQUEST = 'ORDER/REQUEST';
export const ORDER_SUCCESS = 'ORDER/SUCCESS';
export const ORDER_FAILED = 'ORDER/FAILED';
export const ORDER_RESET = 'ORDER/RESET';

export function orderBurder(orderData) {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        })
        postOrder(orderData).then(res => {
            if (res && res.success) {
                dispatch({
                    type: ORDER_SUCCESS,
                    payload: res
                }).then(
                    dispatch({
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
