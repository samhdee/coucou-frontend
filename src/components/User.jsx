import { useState } from 'react'
import {Link, useLocation} from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../auth/context/AuthContext';

export default function User() {
    const {user, loading, logout} = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)
    const location = useLocation()

    const handleClick = e => {
        setShowDropdown(!showDropdown)
    }

    return (
        <div id="user-bar" className="container">
            {user ? (
                <>
                    <div>
                        <a href="#" onClick={handleClick}>
                            <img
                                id="user-avatar"
                                src={`${import.meta.env.VITE_DISCORD_CDN_URL}/${user.discordId}/${user.avatar}`}
                                alt="Avatar du compte Discord"
                            />
                        </a>
                    </div>

                    <div id="user-dropdown" className={showDropdown ? 'show-dropdown' : ''}>
                        <div>{user.username}</div>

                        <div>
                            <Link to={`/dashboard`}>Mon compte</Link>
                        </div>

                        <button className="btn btn-sm btn-primary" onClick={logout}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    </div>
                </>
                )
                : <a
                    href={`${import.meta.env.VITE_API_URL}/auth/discord?redir=${location.pathname}`}
                    className="btn btn-sm btn-primary"
                >
                    Connexion
                </a>
        }
        </div>
    )
}