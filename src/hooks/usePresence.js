import {useEffect, useState} from "react";
import {getData} from "../libs/api.js";

export function usePresence(type, seance_id) {
    const [attendants, setAttendants] = useState([])

    useEffect(() => {
        if (!seance_id) {
            return
        }

        let cancelled = false

        const fetchPresence = async () => {
            getData(`${type}/${seance_id}/presence`).then(data => {
                setAttendants(data)
            })
        }

        fetchPresence()

        const interval = setInterval(() => fetchPresence(), 30000)

        return () => {
            cancelled = true
            clearInterval(interval)
        }
    }, [type, seance_id])

    return attendants;
}