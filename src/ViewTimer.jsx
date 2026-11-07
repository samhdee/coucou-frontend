import {Link, useParams} from "react-router";
import {useState} from "react";
import {Container} from "react-bootstrap";

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import ViewEndedTimer from "./components/ViewEndedTimer.jsx";
import {useTimer} from "./hooks/useTimer.js";
import {useToggleTimer} from "./hooks/useToggleTimer.js";
import BackButton from "./components/BackButton.jsx";

export default function ViewTimerPage() {
    const {id} = useParams();
    return <ViewTimer key={id} id={id} />
}

function ViewTimer({ id }) {
    const [hasEnded, setHasEnded] = useState(false)
    const { data, isLoading, error } = useTimer(id)
    const toggleTimer = useToggleTimer(id)

    const handleEndTimer = () => {
        setHasEnded(true)
    }

    if (isLoading || !data.currentTimer) {
        return <div>Chargement…</div>
    }

    if (error) {
        return <div className="alert alert-danger">Impossible de récupérer le timer.</div>
    }

    if (hasEnded) {
        return <ViewEndedTimer data={data.currentTimer} />
    }

    const handleToggleStatus = () => {
        toggleTimer.mutate(data.currentTimer.status === 'running' ? 'pause' : 'start')
    }

    return (
        <Container className="py-3">
            <BackButton />

            {data.currentTimer && data.currentTimer.status === 'running'
                ? <ViewRunningTimer
                    key={data.currentTimer.id }
                    data={data.currentTimer}
                    handleStatusChange={handleToggleStatus}
                    handleEndTimer={handleEndTimer}
                />
                : <ViewPausedTimer
                    key={data.currentTimer.id}
                    data={data.currentTimer}
                    handleStatusChange={handleToggleStatus}
                />
            }
        </Container>
    )
}
