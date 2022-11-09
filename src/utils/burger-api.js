

const _BASE_URL = 'https://norma.nomoreparties.space/api';

const request = async (url, option) => {
    const res = await fetch(url, option);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}


export const getResourse = async () => {
    const res = await request(`${_BASE_URL}/ingredients`);
    return await res
}



export const postOrder = async (data) => {
    const res = await request(`${_BASE_URL}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    return await res
}
