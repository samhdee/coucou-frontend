import {getData, postData} from "./api.js";

export async function createTimer(duration, status, type) {
    return await postData('timer', {value: duration, status: status, type: type});
}

export async function storeTimerDuration(durationInMinutes) {
    return await postData('past-timers', {duration: durationInMinutes});
}

export async function getTimer(id) {
    return await getData(`timer/${id}`);
}

export async function getAllDurations() {
    return await getData('timer/durations');
}

export async function createSevenByNine() {
    return await getData('seven-by-nine');
}
