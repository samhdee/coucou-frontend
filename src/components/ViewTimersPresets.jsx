import { useParams, useNavigate } from "react-router";
import { useQueryClient } from '@tanstack/react-query'

import { useFetch } from '../hooks/useFetch.js';
import { createTimer } from "../libs/api_create_timer.js";

export default function ViewTimersPresets({type}) {
    const params = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const options_fetch = type
        ? {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'type': type})
        }
        : {method: 'GET'}
    const [loading, data, errors] = useFetch('timers_preset', options_fetch)

    const handleSelectPreset = async (duration, type) => {
        createTimer(duration, 'running', type).then(response => {
            queryClient.invalidateQueries({queryKey: ['session', params.id]})
            navigate(`/session/${response.id}`)
        })
    }

    if (loading) {
        return <div>Chargement des pré-sets</div>
    }

    return (
        <div id="timers-presets-wrapper" className="mb-4">
            {data &&data.length > 0 && data.map(item => (
                <button
                    key={item.id}
                    className={`mt-2 me-2 btn btn-sm preset-${item.type}`}
                    onClick={() => handleSelectPreset(item.value, item.type)}
                >
                    {item.type === 'task' ? 'Tâche' : 'Pause'} : {item.value / 60}
                </button>
            ))}
        </div>
    )
}