import { expect, test } from '@jest/globals';
import {
    rootSocetReducerFeed,
    WebsocketStatus,
    initialState
} from './ws-rootreduser';

import {
    wsError,
    wsClose,
    wsMessage,
    wsConnect,
    wsOpen,
} from '../actions/ws-actions';



describe('rootSocetReducerFeed reducer', () => {
    test('should return the initial state', () => {
        expect(rootSocetReducerFeed(initialState, { type: '' })).toEqual(initialState)
    });


    test('should handle wsConnect', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsConnect,
            status: WebsocketStatus.CONNECTING
        })).toEqual({ connectionError: "", messages: {}, status: "CONNECTING..." })
    });

    test('should handle wsOpen', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsOpen,
            status: WebsocketStatus.ONLINE
        })).toEqual({ connectionError: "", messages: {}, status: "ONLINE" })
    });


    test('should handle wsError', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsError,
            status: WebsocketStatus.ONLINE
        })).toEqual({ connectionError: undefined, messages: {}, status: "OFFLINE" })
    })

    test('should handle wsClose', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsClose,
            status: WebsocketStatus.OFFLINE
        })).toEqual({ connectionError: '', messages: {}, status: "OFFLINE" })
    })

    test('should handle wsMessage', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsMessage,
            status: WebsocketStatus.ONLINE
        })).toEqual({ connectionError: '', messages: undefined, status: "OFFLINE" })
    })
})

