import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getTimer} from "./api.js";
import {Container} from "react-bootstrap";

export default function ViewTimer() {
    let params = useParams();
    const [now, setNow] = useState(Date.now())
    const [endTime, setEndTime] = useState(Date.now())

    useEffect(() => {
        getTimer(params.uuid).then(response => setEndTime(new Date(response.end_time).getTime()));

        const timer = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const remainingSeconds = Math.max(0, Math.round((endTime - now) / 1000));
    const minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    if (seconds <= 9) {
        seconds = '0' + seconds;
    }

    return (
        <Container>
            <div className="mt-3">{minutes}:{seconds}</div>
        </Container>
    )
}