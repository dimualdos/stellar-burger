import { registerUserRequest, loginRequest, getUserRequest, logoutRequest, resetPass, recoveryPass, fetchWithRefresh } from '../../utils/burger-api';
import { _BASE_URL } from '../../utils/burger-api';
import { deleteCookie, setCookie, getCookie } from '../../utils/cooke';

export const REGISTER_USER_REQUEST = 'REGISTER/USER/REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER/USER/SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER/USER/FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER__SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const UPDATE_USER_DATA_REQUEST = 'UPDATE/USER/DATA/REQUEST';
export const UPDATE_USER_DATA_FAILED = 'UPDATE/USER/DATA/FAILED';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE/USER/DATA/SUCCESS';



export const RESET_PASSWORD_REQUEST = 'RESET/PASSWORD/REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET/PASSWORD/SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET/PASSWORD/FAILED';

export const GET_NEW_PASSWORD_REQUEST = 'GET_NEW/PASSWORD/REQUEST';
export const GET_NEW_PASSWORD_SUCCESS = 'GET_NEW/PASSWORD/SUCCESS';
export const GET_NEW_PASSWORD_FAILED = 'GET/NEW/PASSWORD/FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH/TOKEN/REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH/TOKEN/SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH/TOKEN/FAILED';

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

export const updateToken = () => {
    return async (dispatch) => {
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


export const getUserData = (methodType, userData) => {
    return async (dispatch) => {
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
    return async (dispatch) => {
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
                    console.log(res)
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

