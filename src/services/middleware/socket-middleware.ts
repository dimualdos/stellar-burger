import type { Middleware } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

import type { RootState } from '../types/index';

export type TwsActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsMessage: ActionCreatorWithPayload<Array<{}>>,
    wsClose: ActionCreatorWithoutPayload,
    disconnect: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
}



// export const createSocketMiddleware = (wsUrl: string): Middleware => {
//     return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//         let socket: WebSocket | null = null;
//         let isConnected = false
//         let reconnectTimer = 0

//         return next => (action: { type: any; payload: any; }) => {
//             const { dispatch } = store;
//             const { type, payload } = action;


//             if (type === 'WS_CONNECTION_START') {
//                 isConnected = true;
//                 window.clearTimeout(reconnectTimer);
//                 // объект класса WebSocket
//                 socket = new WebSocket(wsUrl);
//             }


//             if (socket) {
//                 // функция, которая вызывается при открытии сокета
//                 socket.onopen = event => {
//                     dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
//                 };

//                 // функция, которая вызывается при ошибке соединения
//                 socket.onerror = event => {
//                     dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
//                 };

//                 // функция, которая вызывается при получения события от сервера
//                 socket.onmessage = event => {
//                     const { data } = event;
//                     dispatch({ type: 'WS_GET_MESSAGE', payload: data });
//                 };
//                 // функция, которая вызывается при закрытии соединения
//                 socket.onclose = event => {
//                     if (event.code !== 1000) {
//                         console.log('error')
//                         dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
//                     }


//                     if (isConnected) {
//                         dispatch({ type: 'WS_CONNECTION_START' })
//                         reconnectTimer = window.setTimeout(() => {
//                             dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event })
//                         }, 3000)
//                     }
//                 };

//                 if (type === 'WS_SEND_MESSAGE') {
//                     const message = payload;
//                     // функция для отправки сообщения на сервер
//                     socket.send(JSON.stringify(message));
//                 }
//                 if (disconnect.match(action)) {
//                     console.log('Websocket disconnect')
//                     window.clearTimeout(reconnectTimer)
//                     isConnected = false
//                     reconnectTimer = 0
//                     dispatch({ type: 'WS_CONNECTION_CLOSED' })
//                     socket.close()
//                 }


//             }

//             next(action);
//         };
//     }) as Middleware;
// };

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = ''
        let isConnected = false
        let reconnectTimer = 0

        return next => action => {
            const { dispatch } = store
            const {
                connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen
            } = wsActions

            if (connect.match(action)) {
                console.log('Websocket connect')
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
                window.clearTimeout(reconnectTimer)
                dispatch(wsConnecting())
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen())
                }

                socket.onerror = () => {
                    dispatch(wsError('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event
                    const parsedData = JSON.parse(data)
                    dispatch(wsMessage(parsedData))
                }

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        console.log('error')
                        dispatch(wsError(event.code.toString()))
                    }

                    if (isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }
                    // console.log('socket close')
                }

                if (disconnect.match(action)) {
                    console.log('Websocket disconnect')
                    window.clearTimeout(reconnectTimer)
                    isConnected = false
                    reconnectTimer = 0
                    dispatch(wsClose())
                    socket.close()
                }
            }

            next(action)
        }
    }
}


export const createSocketMiddlewareProfileOrders = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = ''
        let isConnected = false
        let reconnectTimer = 0

        return next => action => {
            const { dispatch } = store
            const {
                connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen
            } = wsActions

            if (connect.match(action)) {
                console.log('Websocket connect')
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
                window.clearTimeout(reconnectTimer)
                dispatch(wsConnecting())
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen())
                }

                socket.onerror = () => {
                    dispatch(wsError('Websocket error'))
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event
                    const parsedData = JSON.parse(data)
                    dispatch(wsMessage(parsedData))
                }

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        console.log('error')
                        dispatch(wsError(event.code.toString()))
                    }

                    if (isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }
                    // console.log('socket close')
                }

                if (disconnect.match(action)) {
                    console.log('Websocket disconnect')
                    window.clearTimeout(reconnectTimer)
                    isConnected = false
                    reconnectTimer = 0
                    dispatch(wsClose())
                    socket.close()
                }
            }

            next(action)
        }
    }
}
