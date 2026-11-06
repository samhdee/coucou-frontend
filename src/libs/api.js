const API_URL = import.meta.env.VITE_API_URL;

export async function postData(uri, data) {
    return (await fetch(`${API_URL}/${uri}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })).json();
}

export async function getData(uri) {
    const res = await fetch(`${API_URL}/${uri}`, {credentials: 'include'});

    if (!res.ok) {
        throw new Error('Timer introuvable');
    }

    return res.json();
}

export async function patchData(uri, data = {}) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${uri}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error('Impossible de terminer le timer')
    }

    return res.json()
}
