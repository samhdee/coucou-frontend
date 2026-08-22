const API_URL = import.meta.env.VITE_API_URL;

export async function createTimer(durationInMinutes) {
    const res = await fetch(`${API_URL}/timer`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({duration: durationInMinutes}),
    });

    return res.json();
}

export async function storeTimerDuration(durationInMinutes) {
    const res = await fetch(`${API_URL}/past-timers`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({duration: durationInMinutes}),
    });

    return res.json();
}

export async function getTimer(uuid) {
    const res = await fetch(`${API_URL}/timer/${uuid}`);

    if (!res.ok) {
        throw new Error('Timer introuvable');
    }

    return res.json();
}