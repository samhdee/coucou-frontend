import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons';

export default function ViewRunningTimer({ data, handleStatusChange, handleEndTimer }) {
    const [now, setNow] = useState(Date.now())

    const endTime = new Date(data.endsAt).getTime()
    const remainingSeconds = Math.max(0, Math.round((endTime - now) / 1000))
    const minutes = Math.floor(remainingSeconds / 60)
    let seconds = remainingSeconds % 60

    if (seconds <= 9) {
        seconds = '0' + seconds
    }

    useEffect(() => {
        if (minutes === 0 && seconds === '00') {
            handleEndTimer()
        }
    }, [minutes, seconds])

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
        <div className="mt-3 text-center">
            {data.type === 'pause'
                ? <div>C’est la pause</div>
                : <div>Tâche en cours</div>
            }

            <div id="decrementing-timer">{minutes}:{seconds}</div>

            <button className="btn btn-sm btn-primary" onClick={handleClick}>
                <FontAwesomeIcon icon={faPause} />
            </button>
        </div>
    )
}
