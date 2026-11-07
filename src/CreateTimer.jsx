import {useState} from 'react'
import {useNavigate} from "react-router";
import {Container} from "react-bootstrap";

import ViewTimersPresets from './components/ViewTimersPresets.jsx';
import { createTimer, createSevenByNine } from "./libs/api_create_timer.js";

function CreateTimer() {
    const [inputs, setInputs] = useState({type: 'task'})
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
        navigate(`/session/${response.id}`)
    }

    const handleSevenByNineSubmit = async e => {
        e.preventDefault()
        createSevenByNine().then(response => navigate(`/seven-by-nine/${response.id}`))
    }

    return (
        <Container id="view-timer-wrapper" className="mx-auto py-3 w-25">
            <ViewTimersPresets />

            <div className="mt-4">
                <p>7x9 :</p>

                <div>
                    <button className="btn btn-primary" onClick={handleSevenByNineSubmit}>
                        Lancer
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <p>Nouveau timer :</p>

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

                <button className="mt-3 btn btn-primary" onClick={handleSubmit}>Lancer</button>
            </div>
        </Container>
    )
}

export default CreateTimer
