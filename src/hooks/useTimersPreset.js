import {useQuery} from '@tanstack/react-query'
import {getData} from "../libs/api.js";

export function useTimersPreset(type) {
    return useQuery({
        queryKey: ['timers_preset', type],
        queryFn: async () => {
            const res = await getData(`timers_preset`)

            if (!res.ok) {
                throw new Error('Timers presets introuvable')
            }

            return res.json()
        },
    })
}
