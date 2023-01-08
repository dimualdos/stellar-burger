import { getCookie, setCookie } from './cooke';

export const _BASE_URL: string = 'https://norma.nomoreparties.space/api';
export const WS_ORDERS_FEED: string = 'wss://norma.nomoreparties.space/orders/all';
export const WS_ORDERS_USER: string = 'wss://norma.nomoreparties.space/orders';

const request = async (url: RequestInfo | URL, option?: RequestInit | undefined) => {
    const res = await fetch(url, option);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}


export const getResourse = async () => {
    const res = await request(`${_BASE_URL}/ingredients`);
    return await res;
}

export const refreshToken = async () => {
    const res = await request(`${_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
    return await res;
};

export const fetchWithRefresh = async (url: RequestInfo | URL, options?: any) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                Promise.reject(refreshData)
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            setCookie('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export const loginRequest = async (form: string) => {
    const res = await request(`${_BASE_URL}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });

    return await res;
    // .then(checkResponse)
    //    
};

export const postOrder = (data: string) => {
    return fetchWithRefresh(`${_BASE_URL}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: getCookie('accessToken')
        },

        body: JSON.stringify(data)
    })
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        });
}

export const getOrderByNumber = async (number: number) => {
    const res = await request(`${_BASE_URL}/orders/${number}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res;
}

export const getUserRequest = async () => {
    return fetchWithRefresh(`${_BASE_URL}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        });

}


export const registerUserRequest = async (form: string) => {
    const res = await request(`${_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form),
    });
    return await res;
};


export const logoutRequest = async () => {
    const res = await request(`${_BASE_URL}/auth/logout`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
    return await res;
}

export const resetPass = async (data: string) => {
    const res = await request(`${_BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    return await res
}

export const recoveryPass = async (data: string) => {
    const res = await request(`${_BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    return await res
}



