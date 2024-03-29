import { registerUserRequest, loginRequest, getUserRequest, logoutRequest, resetPass, recoveryPass, fetchWithRefresh } from '../../utils/burger-api';
import { _BASE_URL } from '../../utils/burger-api';
import { deleteCookie, setCookie, getCookie } from '../../utils/cooke';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
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
} from '../constants/auth'

// Типизация экшенов
export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
}
export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly payload: string;
}
export interface ILoginUserFailedAction {
    readonly type: typeof LOGIN_USER_FAILED;
}

export interface IUdateUserRequestAction {
    readonly type: typeof UPDATE_USER_DATA_REQUEST;
}
export interface IUdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly user: Object;
}
export interface IUdateUserFailedAction {
    readonly type: typeof UPDATE_USER_DATA_FAILED;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
    readonly payload: string;
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetNewPasswordRequestAction {
    readonly type: typeof GET_NEW_PASSWORD_REQUEST;
}
export interface IGetNewPasswordSuccessAction {
    readonly payload: string;
    readonly type: typeof GET_NEW_PASSWORD_SUCCESS;
}
export interface IGetNewPasswordFailedAction {
    readonly type: typeof GET_NEW_PASSWORD_FAILED;
}

export interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
    payload: any;
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailedAction {
    readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IUserLogout {
    readonly type: typeof USER_LOGOUT;
}

export type TUserActions =
    | IRegisterUserRequestAction
    | IRegisterUserSuccessAction
    | IRegisterUserFailedAction
    | ILoginUserRequestAction
    | ILoginUserSuccessAction
    | ILoginUserFailedAction
    | IUdateUserRequestAction
    | IUdateUserSuccessAction
    | IUdateUserFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | IGetNewPasswordRequestAction
    | IGetNewPasswordSuccessAction
    | IGetNewPasswordFailedAction
    | IRefreshTokenRequestAction
    | IGetNewPasswordSuccessAction
    | IGetNewPasswordFailedAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailedAction
    | IUserLogout;

export const loginUser = (userData: string) => {
    return async (dispatch: (arg0: TUserActions) => void) => {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        loginRequest(userData)
            .then((res) => {
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie('accessToken', res.accessToken);
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: res.user,
                });
            })
            .catch((err) => {
                alert('Логин или пароль введён неверно');
                dispatch({
                    type: LOGIN_USER_FAILED
                })
            })

    }
}

export const updateToken = () => {
    return async (dispatch: (arg0: TUserActions) => void) => {
        try {
            dispatch({
                type: REFRESH_TOKEN_REQUEST
            });

            getUserRequest()
                .then((res) => {
                    dispatch({
                        type: REFRESH_TOKEN_SUCCESS,
                        payload: res.user
                    })
                })
        }
        catch (err) {
            dispatch({
                type: REFRESH_TOKEN_FAILED
            })
        }
    }
}

export const getUserData = (methodType: string, userData: Object) => {
    return async (dispatch: (arg0: TUserActions) => void) => {
        const accessToken = getCookie('accessToken');

        try {
            dispatch({
                type: UPDATE_USER_DATA_REQUEST
            });

            const data = await fetchWithRefresh(`${_BASE_URL}/auth/user`, {
                method: methodType,
                headers: {
                    'authorization': accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!data.success) throw new Error('');

            dispatch({
                type: UPDATE_USER_DATA_SUCCESS,
                user: data.user
            });
        }
        catch (err) {
            dispatch({
                type: UPDATE_USER_DATA_FAILED
            })
        }
    }
}

export const logoutAuth = () => {
    return async (dispatch: (arg0: TUserActions) => void) => {
        try {
            await logoutRequest();
            localStorage.clear();
            deleteCookie('accessToken');
            dispatch({ type: USER_LOGOUT });
        } catch {
            alert('Ошибка выхода из личного кабинета');
        }
    }
}

export const registerUser = (data: string) => async (dispatch: (arg0: TUserActions) => void) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST,
        });
        const res = await registerUserRequest(data);
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
            type: REGISTER_USER_SUCCESS
        })
    }
    catch (err) {
        dispatch({
            type: REGISTER_USER_FAILED
        })
    }
}

export const restorePassword = (form: string) => {
    return async (dispatch: (arg0: TUserActions) => void) => {
        try {
            dispatch({
                type: RESET_PASSWORD_REQUEST
            });
            resetPass(form)
                .then((res) => {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                        payload: res.message,
                    });
                })
        }
        catch (err) {
            dispatch({
                type: RESET_PASSWORD_FAILED
            });
        }
    }
}

export const getNewPassword = (data: string) => {
    return async (dispatch: (arg0: TUserActions) => void) => {
        try {
            dispatch({
                type: GET_NEW_PASSWORD_REQUEST
            });
            recoveryPass(data)
                .then((res) => {
                    dispatch({
                        type: GET_NEW_PASSWORD_SUCCESS,
                        payload: res.message,
                    });
                })

        }
        catch (err) {
            dispatch({
                type: GET_NEW_PASSWORD_FAILED
            })
        }
    }
}

