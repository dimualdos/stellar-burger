

const _url = 'https://norma.nomoreparties.space/api';

export const getResourse = async () => {
    let res = await fetch(`${_url}/ingredients`);

    if(!res.ok) {
        throw new Error(`Could not fetch ${_url}, status: ${res.status}`);
    }
    return await res.json();
}

