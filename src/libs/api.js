const API_URL = import.meta.env.VITE_API_URL;

export async function postData(uri, data) {
    return (await fetch(`${API_URL}/${uri}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })).json();
}

export async function getData(uri) {
    const res = await fetch(`${API_URL}/${uri}`);

    if (!res.ok) {
        throw new Error('Timer introuvable');
    }

    return res.json();
}
