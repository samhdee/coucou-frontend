import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons';

export default function ViewRunningTimer({ remainingSeconds, type, handleStatusChange, handleEndTimer }) {
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = String(remainingSeconds % 60).padStart(2, '0')

    const handleClick = e => {
        e.preventDefault()
        handleStatusChange('paused')
    }

    useEffect(() => {
        if (minutes === 0 && seconds === '00') {
            handleEndTimer()
        }
    }, [minutes, seconds])

    return (
        <div className="mt-3 text-center">
            {type === 'pause'
                ? <div>C’est la pause</div>
                : <div>Tâche en cours</div>
            }

            <div className="decrementing-timer">{minutes}:{seconds}</div>

            <button className="btn btn-sm btn-primary" onClick={handleClick}>
                <FontAwesomeIcon icon={faPause} />
            </button>
        </div>
    )
}
