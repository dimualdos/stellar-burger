//import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { createSocketMiddleware, createSocketMiddlewareProfileOrders } from './middleware/socket-middleware';

import {
  wsConnect as WSConnect,
  wsConnecting as WSConnecting,
  wsOpen as WSOpen,
  wsClose as WSClose,
  wsMessage as WSMessage,
  wsDisconnect as WSDisconnect,
  wsError as WSError,
  wsConnectProfile as WSConnectProfile,
  wsConnectingProfile as WSConnectingProfile,
  wsOpenProfile as WSOpenProfile,
  wsCloseProfile as WSCloseProfile,
  wsMessageProfile as WSMessageProfile,
  wsDisconnectProfile as WSDisconnectProfile,
  wsErrorProfile as WSErrorProfile
} from "./actions/ws-actions";



const wsActions = {
  connect: WSConnect,
  wsConnecting: WSConnecting,
  wsOpen: WSOpen,
  wsMessage: WSMessage,
  wsClose: WSClose,
  disconnect: WSDisconnect,
  wsError: WSError,
};

const wsActionsProfile = {
  connect: WSConnectProfile,
  wsConnecting: WSConnectingProfile,
  wsOpen: WSOpenProfile,
  wsMessage: WSMessageProfile,
  wsClose: WSCloseProfile,
  disconnect: WSDisconnectProfile,
  wsError: WSErrorProfile,
};

const websocketMiddleware: any = createSocketMiddleware(wsActions);
const websocketMiddleware1: any = createSocketMiddlewareProfileOrders(wsActionsProfile);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      websocketMiddleware,
      websocketMiddleware1
    )
  },
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export default store;


