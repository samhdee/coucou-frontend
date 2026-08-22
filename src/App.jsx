import {useState} from 'react'
import "../styles/app.scss"
import {createTimer, storeTimerDuration} from "./api.js";
import {redirect, useNavigate} from "react-router";
import {Container} from "react-bootstrap";

function App() {
    const [duration, setDuration] = useState(0);
    const [endTime, setEndTime] = useState(null);
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();

    const handleDurationChange = (e) => {
        setDuration(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (endTime === 0) {
            return
        }

        const response = await createTimer(duration)
        navigate(`/timer/${response.uuid}`)
    }

    return (
        <Container>
            <div className="form-group">
                <input
                    type="number"
                    className="form-control"
                    value={duration}
                    onChange={handleDurationChange}
                    disabled={disabled}
                />
            </div>

            <button className="mt-3 btn btn-primary" onClick={handleSubmit} disabled={disabled}>Submit</button>
        </Container>
    )
}

export default App
