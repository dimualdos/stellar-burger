import { createAction } from "@reduxjs/toolkit";


//!!Redux Toolkit
export const wsConnect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
export const wsConnecting = createAction('WS_CONNECTION_SUCCESS');
export const wsOpen = createAction('WS_CONNECTION_OPEN');
export const wsMessage = createAction<Array<{}>, 'WS_MESSAGE'>('WS_MESSAGE');
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
export const wsMessageProfile = createAction<Array<{}>, 'WS_MESSAGE_PROFILE'>('WS_MESSAGE_PROFILE');
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






//!! Redux code
// export const wsConnect: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
// export const wsConnecting: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
// export const wsOpen: 'WS_CONNECTION_OPEN' = 'WS_CONNECTION_OPEN';
// export const wsMessage: 'WS_MESSAGE' = 'WS_MESSAGE';
// export const wsClose: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
// export const wsDisconnect: 'WS_DISCONNECT' = 'WS_DISCONNECT';
// export const wsError: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';

// export interface IwsStart {
//     readonly type: typeof wsConnect;
// }
// export interface IwsSuccess {
//     readonly type: typeof wsConnecting;
// }

// export interface IwsOpen {
//     readonly type: typeof wsOpen;
// }
// export interface IwsMessage {
//     payload: any;
//     readonly type: typeof wsMessage;
// }
// export interface IwsClosed {
//     readonly type: typeof wsClose;
// }
// export interface IwsDisconnect {
//     readonly type: typeof wsDisconnect;
// }
// export interface IwsError {
//     payload: any;
//     readonly type: typeof wsError;
// }

// export type TWSConnectActions =
//     | IwsStart
//     | IwsSuccess
//     | IwsMessage
//     | IwsOpen
//     | IwsClosed
//     | IwsDisconnect
//     | IwsError

// export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
// export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
// export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
// export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
// export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
// export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';


