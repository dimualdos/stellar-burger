import { combineReducers } from 'redux';

import { itemsReducer } from './indredients';
import { orderReducer } from './order';
import { constructorReducer } from './constructor';
import { reducerDetailModal } from './ingredient-detail-modal';
import { authReducer } from './auth';
import { rootSocetReducer } from './ws-rootreduser';



export const rootReducer = combineReducers({
  ingredients: itemsReducer,
  order: orderReducer,
  burgerConstructorItem: constructorReducer,
  ingredientsModal: reducerDetailModal,
  user: authReducer,
  webSocet: rootSocetReducer
});

export type TStateReducer = ReturnType<typeof rootReducer>
