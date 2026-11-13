import {usePresence} from "../hooks/usePresence.js";
import ViewDiscordAvatar from "./ViewDiscordAvatar.jsx";

export default function ViewAttendants({id}) {
    const attendants = usePresence('seven-by-nine', id)

    return (
        <div id="attendants-wrapper">
            Présent.e.s sur ce coucou :

            {attendants.map((attendant, index) => (
                <div className="attendant mt-1" key={index}>
                    {attendant.user
                        ? <>
                            <ViewDiscordAvatar user={attendant.user} width={40} />
                            <span className="ms-1">{attendant.user.username}</span>
                        </>
                        : 'Invité.e'}
                </div>
            ))}
        </div>
    )
}