import type { Middleware } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

import type { RootState } from '../types/index';

export type TwsActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsMessage: ActionCreatorWithPayload<{}>,
    wsClose: ActionCreatorWithoutPayload,
    disconnect: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
}


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
                        dispatch(wsError(event.code.toString()))
                    }

                    if (isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }
                }

                if (disconnect.match(action)) {
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

