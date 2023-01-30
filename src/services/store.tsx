//import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { createSocketMiddleware } from './middleware/socket-middleware';

import {
  wsConnect as WSConnect,
  wsConnecting as WSConnecting,
  wsOpen as WSOpen,
  wsClose as WSClose,
  wsMessage as WSMessage,
  wsDisconnect as WSDisconnect,
  wsError as WSError,

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



const websocketMiddleware: any = createSocketMiddleware(wsActions);


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      websocketMiddleware
    )
  },
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export default store;


