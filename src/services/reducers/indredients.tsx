import { TApplicationActions } from '../types';
import { TProductItem } from '../../utils/types';

import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS
} from '../constants/ingredients';



export type TInitialStateIngredients = {
  length?: number;
  itemsRequest: boolean,
  itemsFailed: boolean,
  items: TProductItem[];
}

export const initialState: TInitialStateIngredients = {
  itemsRequest: false,
  itemsFailed: false,
  items: []
}


export const itemsReducer = (state = initialState, action: TApplicationActions): TInitialStateIngredients => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        itemsFailed: false,
        itemsRequest: false
      };
    }
    case GET_ITEMS_FAILED: {
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

