import {useEffect, useRef} from "react";
import {Link, useLocation} from "react-router";
import {Container} from "react-bootstrap";

import ViewTimersPresets from "./ViewTimersPresets";
import CreateTimerForm from "./CreateTimerForm.jsx";
import {sessionCreateNextTimer} from "../libs/api_create_timer.js";
import {useQueryClient} from "@tanstack/react-query";

export default function ViewEndedTimer({data}) {
    const audioRef = useRef(null)
    const queryClient = useQueryClient()
    const location = useLocation()

    // Précharger le son une seule fois
    useEffect(() => {
        const timer_ding_filename = data.type === 'task' ? 'task-ended-ding' : 'pause-ended-ding'
        const audio = new Audio(`/sounds/${timer_ding_filename}.mp3`)
        audio.loop = false

        audio.play()
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    console.error('Impossible de jouer le son :', err)
                }
            })

        // Nettoyage : coupe le son quand le composant se démonte
        return () => {
          audio.pause()
          audio.currentTime = 0
        };
      }, [])

    const handleNewTimerSubmit = inputs => {
        const rx = /\/session\/(\d*)/g
        const arr = rx.exec(location.pathname)

        sessionCreateNextTimer(arr[1], data.id, inputs.durationInMinutes * 60, inputs.type).then(response => {
            queryClient.invalidateQueries({queryKey: ['session', arr[1]]})
        })
    }

    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            <div id="ended-timer" className="mt-3 text-center">
                <div className="decrementing-timer">0:00</div>

                {data.type === 'pause'
                    ? <>
                        <p>On reprend ?</p>
                        <ViewTimersPresets type="task" from_timer={data.id} />
                    </>
                    : <>
                        <p>Une petite pause ?</p>
                        <ViewTimersPresets type="pause" from_timer={data.id} />
                    </>
                }

                <CreateTimerForm propsHandleSubmit={handleNewTimerSubmit} />
            </div>
        </Container>
    )
}
