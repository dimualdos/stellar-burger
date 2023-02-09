
import { createReducer } from "@reduxjs/toolkit";
import { TwsOrdersList } from "../../utils/types";
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

export type TLiveSocketStore = {
    orders: any;
    success: boolean;
    status: WebsocketStatus;
    connectionError: string;
    messages: TwsOrdersList;

}


export const initialState: TLiveSocketStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    orders: null,
    success: false
}

export const rootSocetReducerFeed = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnect, (state, action) => {
            state.status = (WebsocketStatus.CONNECTING, action.payload)
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
});



