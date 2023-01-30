import { createAction } from "@reduxjs/toolkit";


//!!Redux Toolkit
export const wsConnect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
export const wsConnecting = createAction('WS_CONNECTION_SUCCESS');
export const wsOpen = createAction('WS_CONNECTION_OPEN');
export const wsMessage = createAction<{}, 'WS_MESSAGE'>('WS_MESSAGE');
export const wsClose = createAction('WS_CONNECTION_CLOSED');
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsError = createAction<string, 'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR');


export type TWSConnectActions = ReturnType<typeof wsConnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsDisconnect>
    | ReturnType<typeof wsError>;



