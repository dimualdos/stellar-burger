
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
    status: WebsocketStatus;
    connectionError: string;
    messages: TwsOrdersList;

}


export const initialState: TLiveSocketStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    messages: {},
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



