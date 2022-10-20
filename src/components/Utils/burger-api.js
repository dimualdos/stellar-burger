

const _BASE_URL = 'https://norma.nomoreparties.space/api';

export const getResourse = async () => {
    const res = await fetch(`${_BASE_URL}/ingredients`);

    if(!res.ok) {
        throw new Error(`Could not fetch ${_BASE_URL}, status: ${res.status}`);
    }
    return await res.json();
}

