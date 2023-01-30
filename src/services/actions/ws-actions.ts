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


export const wsConnectProfile = createAction<string, 'WS_CONNECT_PROFILE'>('WS_CONNECT_PROFILE');
export const wsConnectingProfile = createAction('WS_CONNECTION_SUCCESS_PROFILE');
export const wsOpenProfile = createAction('WS_CONNECTION_OPEN__PROFILE');
export const wsMessageProfile = createAction<{}, 'WS_MESSAGE_PROFILE'>('WS_MESSAGE_PROFILE');
export const wsCloseProfile = createAction('WS_CONNECTION_CLOSED_PROFILE');
export const wsDisconnectProfile = createAction('WS_DISCONNECT_PROFILE');
export const wsErrorProfile = createAction<string, 'WS_CONNECTION_ERROR_PROFILE'>('WS_CONNECTION_ERROR_PROFILE');


export type TWSConnectActionsProfileOrders = ReturnType<typeof wsConnectProfile>
    | ReturnType<typeof wsConnectingProfile>
    | ReturnType<typeof wsOpenProfile>
    | ReturnType<typeof wsMessageProfile>
    | ReturnType<typeof wsCloseProfile>
    | ReturnType<typeof wsDisconnectProfile>
    | ReturnType<typeof wsErrorProfile>;

