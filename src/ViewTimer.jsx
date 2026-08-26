import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import { useFetch } from "./hooks/useFetch.js";

export default function ViewTimer() {
    let params = useParams()
    const [now, setNow] = useState(Date.now())
    const [loading, data, errors] = useFetch(`timer/${params.uuid}`, {method: 'GET'})

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [data])

    if (loading) {
        return <div>Chargement…</div>
    }

    if (errors) {
        return <div className="alert alert-danger">Impossible de récupérer le timer.</div>
    }

    const endTime = new Date(data.endTime).getTime()
    const remainingSeconds = Math.max(0, Math.round((endTime - now) / 1000));
    const minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    if (seconds <= 9) {
        seconds = '0' + seconds;
    }

    return (
        <Container className="py-3">
            <Link to={{pathname: "/"}}>Retour</Link>

            <div id="decrementing-timer" className="mt-3 text-center">
                {minutes}:{seconds}
            </div>
        </Container>
    )
}