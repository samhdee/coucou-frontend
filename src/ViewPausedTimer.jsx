import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function ViewPausedTimer({ data, handleStatusChange }) {
    const minutes = Math.floor(data.remainingAtPause / 60);
    let seconds = data.remainingAtPause % 60;

    if (seconds <= 9) {
        seconds = '0' + seconds;
    }

    const handleClick = e => {
        e.preventDefault()
        handleStatusChange('running')
    }

    return (
        <div>
            <div id="decrementing-timer" className="mt-3 text-center">
                <div className="clignote">{minutes}:{seconds}</div>
                <button className="btn btn-sm btn-success" onClick={handleClick}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            </div>
        </div>
    )
}
