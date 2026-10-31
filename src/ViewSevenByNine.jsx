import {Link, useParams} from "react-router";
import {useEffect, useRef} from "react";
import {Container} from "react-bootstrap";
import {useQueryClient} from '@tanstack/react-query'

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import {useSevenByNine} from "./hooks/useSevenByNine.js";
import {useToggleTimer} from "./hooks/useToggleTimer.js";
import {useEndTimer} from "./hooks/useEndTimer.js";

export default function SevenByNine() {
    const params = useParams()
    const queryClient = useQueryClient()
    const timerHasEndedRef = useRef(false)
    const {data, isLoading, error} = useSevenByNine(params.id)
    const toggleTimer = useToggleTimer(data?.currentTimer.id)
    const endTimer = useEndTimer()

    const timer_id = data?.currentTimer.id

    useEffect(() => {
        timerHasEndedRef.current = false
    }, [timer_id])

    // Start/pause du timer
    const handleStatusChange = () => {
        toggleTimer.mutate(data.currentTimer.status === 'running' ? 'pause' : 'start', {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['sevenByNine', params.id]})
            },
        })
    }

    // Fin du timer
    const handleEndTimer = () => {
        if (timerHasEndedRef.current || !data.id || !data.currentTimer) {
            return
        }

        timerHasEndedRef.current = true

        endTimer.mutate({sevenByNineId: data.id, fromPosition: data.currentTimer.position}, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['sevenByNine', params.id]})
            },
            onError: () => {
                timerHasEndedRef.current = false // permet de réessayer si l'appel a échoué
            },
        })
    }

    if (isLoading) {
        return <div>Chargement…</div>
    }

    if (error) {
        return <div className="alert alert-danger">Erreur lors du chargement</div>
    }

    const last_drawn_value = data.drawnValues[Object.keys(data.drawnValues).pop()];

    return (
        <Container className="py-3">
            <Link to={{pathname: "/"}}>Retour</Link>

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
                    key={data.currentTimer.position}
                    data={data.currentTimer}
                    handleStatusChange={handleStatusChange}
                    handleEndTimer={handleEndTimer}
                />
                : <ViewPausedTimer
                    key={data.currentTimer.position}
                    data={data.currentTimer}
                    handleStatusChange={handleStatusChange}
                />
            }
        </Container>
    )
}