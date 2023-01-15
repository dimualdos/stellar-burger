
import { createReducer } from "@reduxjs/toolkit";
import {
    wsError,
    wsClose,
    wsMessage,
    wsConnect,
    wsOpen,
    wsErrorProfile,
    wsCloseProfile,
    wsMessageProfile,
    wsConnectProfile,
    wsOpenProfile
} from '../actions/ws-actions';

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}
export enum WebsocketStatus1 {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export type TLiveSocketStore = {
    status: WebsocketStatus | WebsocketStatus1;
    connectionError: string;
    messages?: Array<{}> | undefined;
    messages1?: Array<{}> | undefined;
}

export const initialState: TLiveSocketStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    messages: [],
}

export const rootSocetReducerFeed = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnect, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, (state, action) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            state.messages = (state.messages, action.payload)
        })
});

export const initialState1: TLiveSocketStore = {
    status: WebsocketStatus1.OFFLINE,
    connectionError: '',
    messages1: [],
}

export const rootSocetReducerProfileOrders = createReducer(initialState1, (builder) => {
    builder
        .addCase(wsConnectProfile, (state) => {
            state.status = WebsocketStatus1.CONNECTING
        })
        .addCase(wsOpenProfile, (state) => {
            state.status = WebsocketStatus1.ONLINE
        })
        .addCase(wsCloseProfile, (state, action) => {
            state.status = WebsocketStatus1.OFFLINE
        })
        .addCase(wsErrorProfile, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsMessageProfile, (state, action) => {
            state.messages1 = (state.messages, action.payload)
        })
});




//!! Redux Code
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

