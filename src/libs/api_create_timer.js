import {getData, postData} from "./api.js";

export async function createSession(duration, status, type) {
    return await postData('session', {value: duration, status: status, type: type});
}

export async function sessionCreateNextTimer(session_id, fromTimer, duration, type) {
    return await postData(`session/${session_id}/timer/next`, {fromTimer: fromTimer, value: duration, type: type});
}

export async function storeTimerDuration(durationInMinutes) {
    return await postData('past-timers', {duration: durationInMinutes});
}

export async function getTimer(id) {
    return await getData(`session/${id}`);
}

export async function getAllDurations() {
    return await getData('session/durations');
}

export async function createSevenByNine() {
    return await getData('seven-by-nine');
}
