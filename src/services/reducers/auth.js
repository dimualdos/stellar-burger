
import {
    AUTH_CHEKED,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,

    UPDATE_USER_REQUEST,
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESS,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,

    USER_LOGOUT

} from '../actions/auth';

export const initialState = {
    isAuthCheked: false,

    data: null,

    registerUserRequest: false,
    registerUserError: null,

    loginUserRequest: false,
    loginUserError: null,

    updateUserRequest: false,
    updateUserError: null,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    passwordData: null,

    newPasswordRequest: false,
    newPasswordFailed: false,
    newPasswordData: null
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CHEKED: {
            return {
                ...state,
                isAuthCheked: true
            };
        }
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
                registerUserError: null,
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
                data: action.payload,
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

        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                userDataRequest: true,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: false,
                data: {
                    ...state.data,
                }
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true,
            }
        }

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

        default: {
            return state
        }
    }
}

