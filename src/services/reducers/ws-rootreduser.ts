

import { createReducer } from "@reduxjs/toolkit";
import {
    wsError,
    wsClose,
    wsMessage,
    wsConnect,
    wsOpen
} from '../actions/ws-actions';

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export type LiveTableStore = {
    status: WebsocketStatus;
    connectionError: string;
    messages: Array<{}>;
}

export const initialState1: LiveTableStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    messages: [],
}

export const rootSocetReducer = createReducer(initialState1, (builder) => {
    builder
        .addCase(wsConnect, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            state.messages = (state.messages, action.payload)
        })
})


// type TWSState = {
//     wsConnected: boolean;
//     messages: Array<{}>;
//     error?: Event;
// }

// const initialState: TWSState = {
//     wsConnected: false,
//     messages: []
// };

// //Создадим редьюсер для WebSocket

// export const rootSocetReducer = (state = initialState, action: TApplicationActions) => {
//     switch (action.type) {
//         // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
//         // Установим флаг wsConnected в состояние true
//         case wsConnecting:
//             return {
//                 ...state,
//                 error: undefined,
//                 wsConnected: true
//             };

//         // Опишем обработку экшена с типом WS_CONNECTION_ERROR
//         // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
//         case wsError:
//             return {
//                 ...state,
//                 error: action.payload,
//                 wsConnected: false
//             };

//         // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
//         // Установим флаг wsConnected в состояние false
//         case wsClose:
//             return {
//                 ...state,
//                 error: undefined,
//                 wsConnected: false
//             };

//         // Опишем обработку экшена с типом WS_GET_MESSAGE
//         // Обработка происходит, когда с сервера возвращаются данные
//         // В messages передадим данные, которые пришли с сервера
//         case wsMessage:
//             return {
//                 ...state,
//                 error: undefined,
//                 messages: [...state.messages, action.payload]
//             };
//         default:
//             return state;
//     }
// };

