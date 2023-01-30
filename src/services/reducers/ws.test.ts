import { expect, test } from '@jest/globals';
import {
    rootSocetReducerFeed,
    rootSocetReducerProfileOrders,
    WebsocketStatus,
    WebsocketStatus1,
    initialState,
    initialState1
} from './ws-rootreduser';

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


describe('rootSocetReducerProfileOrdersreducer', () => {
    test('should return the initial state', () => {
        expect(rootSocetReducerProfileOrders(initialState1,
            { type: '' })).toEqual(initialState1)
    });


    test('should handle wsConnect', () => {

        expect(rootSocetReducerProfileOrders(initialState1, {
            type: wsConnectProfile,
            status: WebsocketStatus1.CONNECTING
        })).toEqual({ connectionError: "", messages1: {}, status: "CONNECTING..." })
    });

    test('should handle wsOpen', () => {

        expect(rootSocetReducerProfileOrders(initialState1, {
            type: wsOpenProfile,
            status: WebsocketStatus1.ONLINE
        })).toEqual({ connectionError: "", messages1: {}, status: "ONLINE" })
    });


    test('should handle wsError', () => {

        expect(rootSocetReducerProfileOrders(initialState1, {
            type: wsErrorProfile,
            status: WebsocketStatus1.ONLINE
        })).toEqual({ connectionError: undefined, messages1: {}, status: "OFFLINE" })
    })

    test('should handle wsClose', () => {

        expect(rootSocetReducerProfileOrders(initialState1, {
            type: wsCloseProfile,
            status: WebsocketStatus1.OFFLINE
        })).toEqual({ connectionError: '', messages1: {}, status: "OFFLINE" })
    })

    test('should handle wsMessage', () => {

        expect(rootSocetReducerProfileOrders(initialState1, {
            type: wsMessageProfile,
            status: WebsocketStatus1.ONLINE
        })).toEqual({ connectionError: '', messages1: undefined, status: "OFFLINE" })
    })
})

