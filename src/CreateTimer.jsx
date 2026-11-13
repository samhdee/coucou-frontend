import {useState} from 'react'
import {useNavigate} from "react-router";
import {Container} from "react-bootstrap";

import ViewTimersPresets from './components/ViewTimersPresets.jsx';
import { createSession, createSevenByNine } from "./libs/api_create_timer.js";
import CreateTimerForm from "./components/CreateTimerForm.jsx";

function CreateTimer() {
    const navigate = useNavigate();

    const handleSubmit = async (inputs) => {
        if (inputs.durationInMinutes === 0 || !inputs.durationInMinutes) {
            return
        }

        const response = await createSession(
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
        <Container id="create-timer-wrapper" className="mx-auto py-3">
            <ViewTimersPresets/>

            <div className="mt-4">
                <p>7x9 :</p>

                <div>
                    <button className="btn btn-primary" onClick={handleSevenByNineSubmit}>
                        Lancer
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <CreateTimerForm propsHandleSubmit={handleSubmit}/>
            </div>
        </Container>
    )
}

export default CreateTimer
