import {usePresence} from "../hooks/usePresence.js";
import ViewDiscordAvatar from "./ViewDiscordAvatar.jsx";

export default function ViewAttendants({id, type}) {
    const attendants = usePresence(type, id)

    return (
        <div id="attendants-wrapper">
            <div id="attendants-title">Présent.e.s sur ce coucou :</div>

            {attendants.map((attendant, index) => (
                <div className="attendant mt-1" key={index}>
                    {attendant.user
                        ? <>
                            <ViewDiscordAvatar user={attendant.user} width={40} />
                            <span className="ms-1">{attendant.user.username}</span>
                        </>
                        : <span className="guest-attendant">Invité.e</span>}
                </div>
            ))}
        </div>
    )
}