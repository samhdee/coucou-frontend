import {useEffect} from "react";

export default function useTimerEndDing(type, hasEnded) {
    // Précharger le son une seule fois
    useEffect(() => {
        if (!type || !hasEnded) return

        const timer_ding_filename = type === 'task' ? 'task-ended-ding' : 'pause-ended-ding'
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
        }
  }, [type, hasEnded])
}