import { combineReducers } from 'redux';

import { itemsReducer } from './indredients';
import { orderReducer } from './order';
import { constructorReducer } from './constructor';
import { reducerDetailModal } from './ingredient-detail-modal';
import { authReducer } from './auth';
import { rootSocetReducerFeed, rootSocetReducerProfileOrders } from './ws-rootreduser';
import { dataNumberCardReducer } from './order-card-number';



export const rootReducer = combineReducers({
  ingredients: itemsReducer,
  order: orderReducer,
  burgerConstructorItem: constructorReducer,
  ingredientsModal: reducerDetailModal,
  user: authReducer,
  dataNumberCard: dataNumberCardReducer,
  webSocetFeed: rootSocetReducerFeed,
  webSocetProfile: rootSocetReducerProfileOrders,
});

export type TStateReducer = ReturnType<typeof rootReducer>
