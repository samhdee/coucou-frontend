import button from "bootstrap/js/src/button.js";
import {useState} from "react";

export default function CreateTimerForm({ propsHandleSubmit }) {
    const [inputs, setInputs] = useState({type: 'task'})

    const handleChange = (e) => {
        const target = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInputs(values => ({...values, [target.name]: value}))
    }

    const handleSubmit = e => {
        e.preventDefault()
        propsHandleSubmit(inputs)
    }

    return <div id="create-timer-form">
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
}