import {Link, useParams} from "react-router";
import {useState} from "react";
import {Container} from "react-bootstrap";

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import ViewEndedTimer from "./components/ViewEndedTimer.jsx";
import {useTimer} from "./hooks/useTimer.js";
import {useToggleTimer} from "./hooks/useToggleTimer.js";

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

    if (isLoading) {
        return <div>Chargement…</div>
    }

    if (error) {
        return <div className="alert alert-danger">Impossible de récupérer le timer.</div>
    }

    if (hasEnded) {
        return <ViewEndedTimer data={data} />
    }

    const handleToggleStatus = () => {
        toggleTimer.mutate(data.status === 'running' ? 'pause' : 'start')
    }

    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            {data.status === 'running'
                ? <ViewRunningTimer
                    key={data.id }
                    data={data}
                    handleStatusChange={handleToggleStatus}
                    handleEndTimer={handleEndTimer}
                />
                : <ViewPausedTimer
                    key={data.id}
                    data={data}
                    handleStatusChange={handleToggleStatus}
                />
            }
        </Container>
    )
}
