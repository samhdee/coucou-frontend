import { Link, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useQuery, useQueryClient } from '@tanstack/react-query'

import ViewRunningTimer from "./components/ViewRunningTimer.jsx";
import ViewPausedTimer from "./components/ViewPausedTimer.jsx";
import { useSevenByNine } from "./hooks/useSevenByNine.js";
import { useToggleTimer } from "./hooks/useToggleTimer.js";

export default function SevenByNine() {
    const params = useParams()
    const queryClient = useQueryClient()
    const {data, isLoading, error} = useSevenByNine(params.id)
    const toggleTimer = useToggleTimer(data?.currentTimer.id)

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

    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            {data.currentTimer.status === 'running'
                ? <ViewRunningTimer data={data.currentTimer} handleStatusChange={handleStatusChange} />
                : <ViewPausedTimer data={data.currentTimer} handleStatusChange={handleStatusChange} />
            }
        </Container>
    )
}