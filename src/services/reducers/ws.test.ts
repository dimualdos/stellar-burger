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
        })).toEqual({
            connectionError: "", messages: {
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            }, orders: null, status: undefined, success: false
        })
    });

    test('should handle wsOpen', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsOpen,
            status: WebsocketStatus.ONLINE
        })).toEqual({
            connectionError: "", messages: {
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            }, orders: null, status: "ONLINE", success: false
        })
    });


    test('should handle wsError', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsError,
            status: WebsocketStatus.ONLINE
        })).toEqual({
            connectionError: undefined, messages: {
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            }, orders: null, status: "OFFLINE", success: false
        })
    })

    test('should handle wsClose', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsClose,
            status: WebsocketStatus.OFFLINE
        })).toEqual({
            connectionError: '', messages: {
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            }, orders: null, status: "OFFLINE", success: false
        })
    })

    test('should handle wsMessage', () => {

        expect(rootSocetReducerFeed(initialState, {
            type: wsMessage,
            status: WebsocketStatus.ONLINE
        })).toEqual({ connectionError: '', messages: undefined, orders: null, status: "OFFLINE", success: false })
    })
})

