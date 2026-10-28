import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";

import ViewRunningTimer from "./ViewRunningTimer.jsx";
import ViewPausedTimer from "./ViewPausedTimer.jsx";
import {useTimer} from "./hooks/useTimer.js";
import {getData} from "./libs/api.js";
import {useToggleTimer} from "./hooks/useToggleTimer.js";

export default function ViewTimer() {
    let params = useParams()
    const { data, isLoading, error } = useTimer(params.id)
    const toggleTimer = useToggleTimer(params.id)

    if (isLoading) {
        return <div>Chargement…</div>
    }

    if (error) {
        return <div className="alert alert-danger">Impossible de récupérer le timer.</div>
    }

    const handleToggleStatus = () => {
        console.log(data.status === 'running' ? 'pause' : 'start')
        toggleTimer.mutate(data.status === 'running' ? 'pause' : 'start')
    }

    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            {data.status === 'running'
                ? <ViewRunningTimer data={data} handleStatusChange={handleToggleStatus} />
                : <ViewPausedTimer data={data} handleStatusChange={handleToggleStatus} />
            }
        </Container>
    )
}
