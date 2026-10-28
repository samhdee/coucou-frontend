import {useState} from 'react'
import {useNavigate} from "react-router";
import {Container} from "react-bootstrap";

import "../styles/app.scss"

import {createTimer} from "./libs/api_create_timer.js";
import { useFetch } from './hooks/useFetch.js';

function CreateTimer() {
    const [inputs, setInputs] = useState({type: 'task'})
    const [loading, data, errors] = useFetch('timers_preset')
    const navigate = useNavigate();

    const handleChange = (e) => {
        const target = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(values => ({...values, [target.name]: value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (inputs.durationInMinutes === 0 || !inputs.durationInMinutes) {
            return
        }

        const response = await createTimer(
            inputs.durationInMinutes * 60,
            inputs.isPauseChecked ? 'paused' : 'running',
            inputs.type,
        )
        navigate(`/timer/${response.id}`)
    }

    const handleSelectPreset = async (duration, type) => {
        const response = await createTimer(duration, 'running', type)
        navigate(`/timer/${response.id}`)
    }

    return (
        <Container className="mx-auto py-3 w-25">
            {errors && <div className='alert alert-danger'>Erreur lors du chargement des pré-sets</div>}

            <div className="mb-4">
                <p>Pré-sets :</p>

                {data && data.map(item => (
                    <button
                        key={item.id}
                        className="me-2 btn btn-sm btn-primary"
                        onClick={() => handleSelectPreset(item.value, item.type)}
                    >
                        {item.type === 'task' ? 'Tâche' : 'Pause'} : {item.value / 60}
                    </button>
                ))}
            </div>

            <div className="form-group">
                <select name="type" className="form-select" onChange={handleChange}>
                    <option value="task">Tâche</option>
                    <option value="pause">Pause</option>
                </select>
            </div>

            <div className="mt-3 form-group">
                <input
                    type="number"
                    name="durationInMinutes"
                    className="form-control"
                    value={inputs.durationInMinutes}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-3 form-group">
                <label className="me-1 form-label" htmlFor="form-pause-check">Démarrer en pause ?</label>
                <input
                    id="form-pause-check"
                    type="checkbox"
                    name="isPauseChecked"
                    className="form-inline-check"
                    onChange={handleChange}
                    checked={inputs.isPauseChecked}
                />
            </div>

            <button className="mt-3 btn btn-primary" onClick={handleSubmit}>Submit</button>
        </Container>
    )
}

export default CreateTimer
