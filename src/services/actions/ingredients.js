

import { getResourse } from '../../utils/burger-api';



export const GET_ITEMS_REQUEST = 'GET/ITEMS_REQUEST';
export const GET_ITEMS_FAILED = 'GET/ITEMS_FAILED';
export const GET_ITEMS_SUCCESS = 'GET/ITEMS_SUCCESS';


export function getItems() {

  return function (dispatch) {
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