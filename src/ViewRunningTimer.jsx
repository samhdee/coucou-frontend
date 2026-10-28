import {useEffect, useState} from "react";

export default function ViewRunningTimer({ data, handleStatusChange }) {
    const [now, setNow] = useState(Date.now())

    const endTime = new Date(data.endsAt).getTime()
    const remainingSeconds = Math.max(0, Math.round((endTime - now) / 1000));
    const minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    if (seconds <= 9) {
        seconds = '0' + seconds;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [data])

    const handleClick = e => {
        e.preventDefault()
        handleStatusChange('paused')
    }

    return (
        <div id="decrementing-timer" className="mt-3 text-center">
            <div>{minutes}:{seconds}</div>
            <button className="btn btn-secondary" onClick={handleClick}>Pause</button>
        </div>
    )
}
