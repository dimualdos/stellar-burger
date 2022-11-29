import { registerUserRequest, loginRequest, getUserRequest, logoutRequest, resetPass, recoveryPass } from '../../utils/burger-api';
import { deleteCookie, setCookie, getCookie } from '../../utils/cooke';


export const AUTH_CHEKED = 'AUTH/CHEKED';

export const REGISTER_USER_REQUEST = 'REGISTER/USER/REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER/USER/SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER/USER/FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER__SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE/USER/REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE/USER_/FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE/USER/SUCCESS';



export const RESET_PASSWORD_REQUEST = 'RESET/PASSWORD/REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET/PASSWORD/SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET/PASSWORD/FAILED';

export const GET_NEW_PASSWORD_REQUEST = 'GET_NEW/PASSWORD/REQUEST';
export const GET_NEW_PASSWORD_SUCCESS = 'GET_NEW/PASSWORD/SUCCESS';
export const GET_NEW_PASSWORD_FAILED = 'GET/NEW/PASSWORD/FAILED';

export const USER_LOGOUT = 'USER/LOGOUT';



export const loginUser = (userData) => {
    return async (dispatch) => {
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

export const checkUserAuth = () => {
    return (dispatch) => {
        if (getCookie('accessToken')) {
            getUserRequest()
                .finally(() => {
                    dispatch({ type: AUTH_CHEKED });
                })
        } else {
            dispatch({ type: AUTH_CHEKED })
        }
    }
}


export const logoutAuth = () => async (dispatch) => {
    try {
        await logoutRequest();
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch({ type: USER_LOGOUT });
    } catch {
        alert('Ошибка выхода из личного кабинета');
    }
}

export const registerUser = (data) => async (dispatch) => {
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



export const restorePassword = (form) => {
    return async (dispatch) => {
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

export const getNewPassword = (data) => {
    return async (dispatch) => {
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

