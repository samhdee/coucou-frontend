export default function ViewDiscordAvatar({user, width}) {
    return (
        <img
            className="user-avatar"
            src={`${import.meta.env.VITE_DISCORD_CDN_URL}/${user.discordId}/${user.avatar}`}
            alt="Avatar du compte Discord"
            width={width}
        />
    )
}