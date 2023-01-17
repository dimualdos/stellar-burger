import { getResourse } from '../../utils/burger-api';

import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../constants/ingredients';
import { TApplicationActions } from '../types';

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly payload?: any;
}
export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TIngredientsActions =
  | IGetItemsRequestAction
  | IGetItemsSuccessAction
  | IGetItemsFailedAction;

export const getItems = () => {

  return function (dispatch: (arg0: TApplicationActions) => void) {
    dispatch({
      type: GET_ITEMS_REQUEST
    })
    getResourse().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data
        })
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        })
      }
    }).catch(err => {
      dispatch({
        type: GET_ITEMS_FAILED
      })
    })
  }
} 
