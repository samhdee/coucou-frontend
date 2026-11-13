import {Link, useParams} from "react-router";
import {useState} from "react";
import {Container} from "react-bootstrap";

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import ViewEndedTimer from "./components/ViewEndedTimer.jsx";
import {useSession} from "./hooks/useSession.js";
import {useToggleTimer} from "./hooks/useToggleTimer.js";
import BackButton from "./components/BackButton.jsx";
import {useCountdown} from "./hooks/useCountdown.js";
import ViewAttendants from "./components/ViewAttendants.jsx";

export default function ViewTimerPage() {
    const {id} = useParams();
    return <ViewSession key={id} id={id} />
}

function ViewSession({ id }) {
    const [isLocked, setIsLocked] = useState(true);
    const { data, isLoading, error } = useSession(id)
    const toggleTimer = useToggleTimer(id)
    const { remainingSeconds, hasEnded } = useCountdown(data?.currentTimer)

    const handleUnlockClick = e => {
        e.preventDefault()
        setIsLocked(false)
    }

    if (isLoading) {
        return <div>Chargement…</div>
    }

    if (error) {
        return <div className="alert alert-danger">Impossible de récupérer le timer.</div>
    }

    if (isLocked) {
        return <div className="text-center">
            <button className="btn btn-primary text-center" onClick={handleUnlockClick}>Rejoindre</button>
        </div>
    }

    if (hasEnded) {
        return <ViewEndedTimer timer={data.currentTimer} />
    }

    const handleToggleStatus = () => {
        toggleTimer.mutate(data.currentTimer.status === 'running' ? 'pause' : 'start')
    }

    return (
        <Container className="py-3">
            <BackButton />

            <ViewAttendants id={data.id} type="session" />

            {data.currentTimer && data.currentTimer.status === 'running'
                ? <ViewRunningTimer
                    key={data.currentTimer.id }
                    remainingSeconds={remainingSeconds}
                    type={data.currentTimer.type}
                    handleStatusChange={handleToggleStatus}
                />
                : <ViewPausedTimer
                    key={data.currentTimer.id}
                    remainingSeconds={remainingSeconds}
                    handleStatusChange={handleToggleStatus}
                />
            }
        </Container>
    )
}
