import {useQuery} from '@tanstack/react-query'

export function useTimersPreset(type) {
    return useQuery({
        queryKey: ['timers_preset', id],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/timers_preset`)

            if (!res.ok) {
                throw new Error('Timers presets introuvable')
            }

            return res.json()
        },
    })
}
