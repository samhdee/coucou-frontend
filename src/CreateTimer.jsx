import {useState} from 'react'
import {useNavigate} from "react-router";
import {Container} from "react-bootstrap";

import "../styles/app.scss"

import {createTimer} from "./api.js";
import { useFetch } from './hooks/useFetch.js';

function CreateTimer() {
    const [duration, setDuration] = useState('')
    const [loading, data, errors] = useFetch('timer/durations')
    const navigate = useNavigate();

    const handleDurationChange = (e) => {
        setDuration(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (duration === 0 || !duration) {
            return
        }

        const response = await createTimer(duration)
        navigate(`/timer/${response.uuid}`)
    }

    const handleSelectPreset = async duration => {
        const response = await createTimer(duration)
        navigate(`/timer/${response.uuid}`)
    }

    return (
        <Container className="py-3">
            {errors && <div className='alert alert-danger'>Erreur lors du chargement des pré-sets</div>}

            <div className='mb-4'>
                <p>Pré-sets :</p>

                {data && data.map(item => (
                    <button
                        key={item.duration}
                        className="me-2 btn btn-sm btn-primary"
                        onClick={() => handleSelectPreset(item.duration)}
                    >
                        {item.duration}
                    </button>
                ))}
            </div>

            <div className="form-group">
                <input
                    type="number"
                    className="form-control"
                    value={duration}
                    onChange={handleDurationChange}
                />
            </div>

            <button className="mt-3 btn btn-primary" onClick={handleSubmit}>Submit</button>
        </Container>
    )
}

export default CreateTimer
