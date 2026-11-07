import {getData, postData} from "./api.js";

export async function createTimer(duration, status, type) {
    return await postData('session', {value: duration, status: status, type: type});
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
