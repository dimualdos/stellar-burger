
import { expect, test } from '@jest/globals';
import { initialState } from "./auth";
import { authReducer } from "./auth";

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    // UPDATE_USER_DATA_REQUEST,
    // UPDATE_USER_DATA_FAILED,
    // UPDATE_USER_DATA_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    USER_LOGOUT
} from '../constants/auth';



describe("Redux auth store", () => {


    test("Should return the initial state", () => {
        expect(authReducer(undefined, { type: null })).toEqual(initialState)
    });


    test('should handle USER_LOGOUT', () => {
        const state = {
            ...initialState,
            data: null
        };
        expect(authReducer(initialState, {
            type: USER_LOGOUT
        })).toEqual(state)
    });

    test('should handle REGISTER_USER_REQUEST', () => {
        const state = {
            ...initialState,
            registerUserRequest: true,
            registerUserError: false,
        }
        expect(authReducer(initialState, { type: REGISTER_USER_REQUEST })).toEqual(state)
    });

    it('should handle REGISTER_USER_SUCCESS', () => {
        const state = {
            ...initialState,
            data: {},
            registerUserRequest: false,
            registerUserFailed: false
        };
        expect(authReducer(initialState, { type: REGISTER_USER_SUCCESS, data: { name: 'name', email: 'email' } })).toEqual(state)
    });

    test('should handle REGISTER_USER_FAILED', () => {
        const state = {
            ...initialState,
            registerUserRequest: false,
            registerUserFailed: true
        };
        expect(authReducer(initialState, { type: REGISTER_USER_FAILED })).toEqual(state)
    });

    test('should handle LOGIN_USER_REQUEST', () => {
        const state = {
            ...initialState,
            loginUserRequest: true,
        };
        expect(authReducer(initialState, { type: LOGIN_USER_REQUEST })).toEqual(state)
    });

    test('should handle LOGIN_USER_SUCCESS', () => {
        const state = {
            ...initialState,
            data: {
                email: "email",
                name: "name",
                password: "",
            },
            loginUserRequest: false,
            loginUserFailed: false,
        };
        expect(authReducer(initialState,
            { type: LOGIN_USER_SUCCESS, data: { name: 'name', email: 'email' } })).toEqual(state)
    });

    it('should handle LOGIN_USER_FAILED', () => {
        const state = {
            ...initialState,
            loginUserRequest: false,
            loginUserFailed: true,
        };
        expect(authReducer(initialState, { type: LOGIN_USER_FAILED })).toEqual(state)
    });



    // it('should handle UPDATE_USER_DATA_REQUEST', () => {
    //     const state = {
    //         ...initialState,
    //         userDataRequest: true
    //     };
    //     expect(authReducer(initialState, { type: UPDATE_USER_DATA_REQUEST })).toEqual(state)
    // });

    // test('should handle UPDATE_USER_DATA_SUCCESS', () => {
    //     const state = {
    //         ...initialState,
    //         userDataRequest: false,
    //         userDataFailed: false,
    //         data: {
    //             email: "email",
    //             name: "name",
    //             password: "",
    //         }
    //     };
    //     expect(authReducer(initialState,
    //         { type: UPDATE_USER_DATA_SUCCESS, data: { name: 'name', email: 'email' } })).toEqual(state)
    // });

    // test('should handle UPDATE_USER_DATA_FAILED', () => {
    //     const state = {
    //         ...initialState,
    //         userDataRequest: false,
    //         userDataFailed: true
    //     };
    //     expect(authReducer(initialState, { type: UPDATE_USER_DATA_FAILED })).toEqual(state)
    // });


    test('should handle RESET_PASSWORD_REQUEST', () => {
        const state = {
            ...initialState,
            resetPasswordRequest: true,
        };
        expect(authReducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual(state)
    });

    test('should handle RESET_PASSWORD_SUCCESS', () => {
        const state = {
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            passwordData: "messages",
        };
        expect(authReducer(initialState,
            { type: RESET_PASSWORD_SUCCESS, payload: 'messages' })).toEqual(state)
    });

    test('should handle RESET_PASSWORD_FAILED', () => {
        const state = {
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
            passwordData: null,
        };
        expect(authReducer(initialState, { type: RESET_PASSWORD_FAILED })).toEqual(state)
    });


    test('should handle GET_NEW_PASSWORD_REQUEST', () => {
        const state = {
            ...initialState,
            newPasswordRequest: true,

        };
        expect(authReducer(initialState, { type: GET_NEW_PASSWORD_REQUEST })).toEqual(state)
    })
    test('should handle GET_NEW_PASSWORD_SUCCESS', () => {
        const state = {
            ...initialState,
            newPasswordRequest: false,
            newPasswordFailed: false,
            newPasswordData: 'changed',
        };
        expect(authReducer(initialState, { type: GET_NEW_PASSWORD_SUCCESS, payload: 'changed' })).toEqual(state)
    });

    test('should handle GET_NEW_PASSWORD_FAILED', () => {
        const state = {
            ...initialState,
            newPasswordRequest: false,
            newPasswordFailed: true,
            newPasswordData: null,
        };
        expect(authReducer(initialState, { type: GET_NEW_PASSWORD_FAILED })).toEqual(state)
    });

    test('should handle REFRESH_TOKEN_REQUEST', () => {
        const state = {
            ...initialState,
            refreshTokenRequest: true
        };
        expect(authReducer(initialState, { type: REFRESH_TOKEN_REQUEST })).toEqual(state)
    });

    test('should handle REFRESH_TOKEN_SUCCESS', () => {
        const state = {
            ...initialState,
            data: {
                email: "email",
                name: "name",
            },
            refreshTokenRequest: false,
            refreshTokenFailed: false
        };
        expect(authReducer(initialState, { type: REFRESH_TOKEN_SUCCESS, payload: { name: 'name', email: 'email' } })).toEqual(state)
    })
    test('should handle REFRESH_TOKEN_FAILED', () => {
        const state = {
            ...initialState,
            refreshTokenRequest: false,
            refreshTokenFailed: true
        };
        expect(authReducer(initialState, { type: REFRESH_TOKEN_FAILED })).toEqual(state)
    })
})

