//import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { createSocketMiddleware } from './middleware/socket-middleware';

import {
  wsConnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsDisconnect,
  wsError
} from "./actions/ws-actions";



const wsActions = {
  connect: wsConnect,
  wsConnecting: wsConnecting,
  wsOpen: wsOpen,
  wsMessage: wsMessage,
  wsClose: wsClose,
  disconnect: wsDisconnect,
  wsError: wsError,
};

const websocketMiddleware: any = createSocketMiddleware(wsActions)


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware)
  },
  devTools: true
})

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
//   // middleware: new MiddlewareArray().concat(websocketMiddleware),
//   // middleware: (getDefaultMiddleware) => {
//   //   return getDefaultMiddleware().concat(websocketMiddleware)
//   // },
//   devTools: true,
// });

export default store;


