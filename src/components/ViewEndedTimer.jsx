import {useEffect, useRef} from "react";
import {Link, useLocation} from "react-router";
import {Container} from "react-bootstrap";

import ViewTimersPresets from "./ViewTimersPresets";
import CreateTimerForm from "./CreateTimerForm.jsx";
import {sessionCreateNextTimer} from "../libs/api_create_timer.js";
import {useQueryClient} from "@tanstack/react-query";
import useTimerEndDing from "../hooks/useTimerEndDing.js";

export default function ViewEndedTimer({timer}) {
    const queryClient = useQueryClient()
    const location = useLocation()
    useTimerEndDing(timer.type, true)

    const handleNewTimerSubmit = inputs => {
        const rx = /\/session\/(\d*)/g
        const arr = rx.exec(location.pathname)

        sessionCreateNextTimer(arr[1], timer.id, inputs.durationInMinutes * 60, inputs.type).then(response => {
            queryClient.invalidateQueries({queryKey: ['session', arr[1]]})
        })
    }

    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            <div id="ended-timer" className="mt-3 text-center">
                <div className="decrementing-timer">0:00</div>

                {timer.type === 'pause'
                    ? <>
                        <p>On reprend ?</p>
                        <ViewTimersPresets type="task" from_timer={timer.id} />
                    </>
                    : <>
                        <p>Une petite pause ?</p>
                        <ViewTimersPresets type="pause" from_timer={timer.id} />
                    </>
                }

                <CreateTimerForm propsHandleSubmit={handleNewTimerSubmit} />
            </div>
        </Container>
    )
}
