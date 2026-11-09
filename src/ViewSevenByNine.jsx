import {Link, useParams} from "react-router";
import {useEffect, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import {useQueryClient} from '@tanstack/react-query'

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import {useSevenByNine} from "./hooks/useSevenByNine.js";
import {useEndSevenByNineTimer} from "./hooks/useEndSevenByNineTimer.js";
import BackButton from "./components/BackButton.jsx";
import {useCountdown} from "./hooks/useCountdown.js";
import {useToggleSevenByNine} from "./hooks/useToggleSevenByNine.js";
import ViewEndedTimer from "./components/ViewEndedTimer.jsx";
import useTimerEndDing from "./hooks/useTimerEndDing.js";

export default function SevenByNine() {
    const params = useParams()
    const queryClient = useQueryClient()
    const timerHasEndedRef = useRef(false)
    const [isLocked, setIsLocked] = useState(true);
    const {data, isLoading, error} = useSevenByNine(params.id)
    const toggleTimer = useToggleSevenByNine(params.id)
    const endTimer = useEndSevenByNineTimer()
    const { remainingSeconds, hasEnded } = useCountdown(data?.currentTimer)
    useTimerEndDing(data?.currentTimer.type, hasEnded)

    const handleUnlockClick = e => {
        e.preventDefault()
        setIsLocked(false)
    }

    const timer_id = data?.currentTimer.id

    useEffect(() => {
        timerHasEndedRef.current = false
    }, [timer_id])

    // Start/pause du timer
    const handleStatusChange = () => {
        const action = data.currentTimer.status === 'running' ? 'pause' : 'start'
        toggleTimer.mutate(action)
    }

    // Fin du timer
    const handleEndTimer = () => {
        if (timerHasEndedRef.current || !data.id || !data.currentTimer) {
            return
        }

        timerHasEndedRef.current = true

        endTimer.mutate({sevenByNineId: data.id, fromPosition: data.currentTimer.position}, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['seven-by-nine', params.id]})
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

    if (isLocked) {
        return <div className="text-center">
            <button className="btn btn-primary text-center" onClick={handleUnlockClick}>Rejoindre</button>
        </div>
    }

    const last_drawn_value = data.drawnValues[Object.keys(data.drawnValues).pop()];

    return (
        <Container className="py-3">
            <BackButton />

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
                    remainingSeconds={remainingSeconds}
                    handleStatusChange={handleStatusChange}
                    type={data.currentTimer.type}
                    handleEndTimer={handleEndTimer}
                />
                : <ViewPausedTimer
                    key={data.currentTimer.position}
                    remainingSeconds={remainingSeconds}
                    handleStatusChange={handleStatusChange}
                />
            }
        </Container>
    )
}