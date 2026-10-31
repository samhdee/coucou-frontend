import { Link, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useQuery, useQueryClient } from '@tanstack/react-query'

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import { useSevenByNine } from "./hooks/useSevenByNine.js";
import { useToggleTimer } from "./hooks/useToggleTimer.js";
import { useEndTimer } from "./hooks/useEndTimer.js";

export default function SevenByNine() {
    const params = useParams()
    const queryClient = useQueryClient()
    const {data, isLoading, error} = useSevenByNine(params.id)
    const toggleTimer = useToggleTimer(data?.currentTimer.id)
    const endTimer = useEndTimer()

    if (isLoading) {
        return <div>Chargement…</div>
    }

    if (error) {
        return <div className="alert alert-danger">Erreur lors du chargement</div>
    }

    const handleStatusChange = () => {
        toggleTimer.mutate(data.currentTimer.status === 'running' ? 'pause' : 'start', {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['sevenByNine', params.id] })
            },
        })
    }

    const handleEndTimer = () => {
        endTimer.mutate(data.id)
    }

    const last_drawn_value = data.drawnValues[Object.keys(data.drawnValues).pop()];

    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            <div className="mt-3 text-center">
                En cours : {data.currentTimer.type === 'task'
                ? <>
                    tâche <span className="fw-bold">{data.countTasks}/7</span>
                </>
                : <>
                    pause <span className="fw-bold">{data.countTasks}/6</span>
                </>
            }
            </div>

            <div id="drawn-value-wrapper" className="mt-3 border rounded-1 mx-auto text-center">
                Tirage : n°<span className="fw-bold fs-3">{last_drawn_value}</span> !
            </div>

            {data.currentTimer.status === 'running'
                ? <ViewRunningTimer
                    data={data.currentTimer}
                    handleStatusChange={handleStatusChange}
                    handleEndTimer={handleEndTimer}
                />
                : <ViewPausedTimer
                    data={data.currentTimer}
                    handleStatusChange={handleStatusChange}
                />
            }
        </Container>
    )
}