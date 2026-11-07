import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function ViewPausedTimer({ remainingSeconds, handleStatusChange }) {
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = String(remainingSeconds % 60).padStart(2, '0')

    const handleClick = e => {
        e.preventDefault()
        handleStatusChange('running')
    }

    return (
        <div className="mt-3 text-center decrementing-timer fs-2">
            <div className="clignote">{minutes}:{seconds}</div>

            <button className="btn btn-sm btn-success" onClick={handleClick}>
                <FontAwesomeIcon icon={faPlay} />
            </button>
        </div>
    )
}
