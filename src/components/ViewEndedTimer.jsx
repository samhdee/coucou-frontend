import {Link} from "react-router";
import {Container} from "react-bootstrap";

import ViewTimersPresets from "./ViewTimersPresets";

export default function ViewEndedTimer({data}) {
    return (
        <Container className="py-3">
            <Link to={{ pathname: "/" }}>Retour</Link>

            <div id="ended-timer" className="mt-3 text-center">
                <div className="decrementing-timer">0:00</div>

                {data.type === 'pause'
                    ? <>
                        <p>On reprend ?</p>
                        <ViewTimersPresets type="task" />
                    </>
                    : <>
                        <p>Une petite pause ?</p>
                        <ViewTimersPresets type="pause" />
                    </>
                }
            </div>
        </Container>
    )
}
