import { useEffect, useState } from 'react'

export function useCountdown(timer) {
    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        if (!timer?.status === 'running') {
            return
        }

        const interval = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(interval)
    }, [timer?.status === 'running', timer?.endsAt])

    const endsAt = timer?.endsAt ? new Date(timer.endsAt).getTime() : null

    const remainingSeconds= timer?.status === 'running' && endsAt
        ? Math.max(0, Math.round((endsAt - now) / 1000))
        : timer?.remainingAtPause ?? 0
    const hasEnded = timer?.status === 'running' && endsAt !== null && now >= endsAt

    return { remainingSeconds, hasEnded }
}