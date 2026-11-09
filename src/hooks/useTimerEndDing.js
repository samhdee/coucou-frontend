import {useEffect, useRef} from "react";

export default function useTimerEndDing(type, hasEnded) {
    const audioRef = useRef(null);

    // Précharger le son une seule fois
    useEffect(() => {
        if (!type || !hasEnded) {
            return
        }

        const timer_ding_filename = type === 'task' ? 'task-ended-ding' : 'pause-ended-ding'
        const audio = new Audio(`/sounds/${timer_ding_filename}.mp3`)
        audio.loop = false
        audioRef.current = audio

        // Nettoyage : coupe le son quand le composant se démonte
        return () => {
            audioRef.current = null
        }
  }, [type])

    useEffect(() => {
        if (!hasEnded || !audioRef.current) {
            return
        }

        const audio = audioRef.current
        audio.currentTime = 0
        audio.play().catch((err) => {
            if (err.name !== 'AbortError') {
                console.error('Impossible de jouer le son :', err)
            }
        })
    }, [hasEnded])
}