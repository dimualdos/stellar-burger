
import { TUserActions } from '../actions/auth';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_FAILED,
    UPDATE_USER_DATA_RESET,
    UPDATE_USER_DATA_SUCCESS,
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

export type TInitialStateAuth = {
    data: any,
    registerUserRequest: boolean,
    registerUserError: boolean | string,

    loginUserRequest: boolean,
    loginUserError: boolean | string,
    loginUserFailed: boolean,

    updateUserRequest: boolean,
    updateUserError: boolean | string,

    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    passwordData: null | string,

    refreshTokenRequest: boolean,
    refreshTokenFailed: boolean,

    newPasswordRequest: boolean,
    newPasswordFailed: boolean,
    newPasswordData: null | string,
    registerUserFailed: boolean,
    userDataRequest: boolean,
    userDataFailed: boolean,

    success: boolean
}

export const initialState: TInitialStateAuth = {
    data: null,

    registerUserRequest: false,
    registerUserError: false,

    loginUserRequest: false,
    loginUserError: false,
    loginUserFailed: false,

    updateUserRequest: false,
    updateUserError: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    passwordData: null,

    refreshTokenRequest: false,
    refreshTokenFailed: false,


    newPasswordRequest: false,
    newPasswordFailed: false,
    newPasswordData: null,
    registerUserFailed: false,
    userDataRequest: false,
    userDataFailed: false,

    success: false
}


export const authReducer = (state = initialState, action: TUserActions): TInitialStateAuth => {
    switch (action.type) {
        case USER_LOGOUT: {
            return {
                ...state,
                data: null,
            };
        }
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerUserRequest: true,
                registerUserError: false,
            };
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                data: {
                    ...state.data,
                },
                registerUserRequest: false,
                registerUserFailed: false
            }
        }

        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerUserRequest: false,
                registerUserFailed: true
            }
        }

        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginUserRequest: true,
            }
        }

        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                data: {
                    ...state.data,
                    name: action.data.name,
                    email: action.data.email,
                    password: ''
                },
                loginUserRequest: false,
                loginUserFailed: false,
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginUserRequest: false,
                loginUserFailed: true,
            }
        }
        //? Update User data
        case UPDATE_USER_DATA_REQUEST: {
            return {
                ...state,
                userDataRequest: true,
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: false,
                data: {
                    ...state.data,
                    name: action.data.name,
                    email: action.data.email,
                    password: ''
                },
                success: true
            }
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true,
            }
        }

        case UPDATE_USER_DATA_RESET: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: false,
                success: false
            }
        }



        //? reset pass

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                passwordData: action.payload,

            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                passwordData: null,
            }
        }

        case GET_NEW_PASSWORD_REQUEST: {
            return {
                ...state,
                newPasswordRequest: true,
            }
        }

        case GET_NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                newPasswordRequest: false,
                newPasswordFailed: false,
                newPasswordData: action.payload,
            }
        }

        case GET_NEW_PASSWORD_FAILED: {
            return {
                ...state,
                newPasswordRequest: false,
                newPasswordFailed: true,
                newPasswordData: null,
            }
        }

        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                refreshTokenRequest: false,
                refreshTokenFailed: false
            }
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true
            }
        }

        default: {
            return state
        }
    }
}

