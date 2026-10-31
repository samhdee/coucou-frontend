import { useMutation, useQueryClient } from '@tanstack/react-query'

import { patchData } from '../libs/api.js'

export function useEndTimer(sessionId) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (timerId) => {
            return await patchData(`seven-by-nine/${timerId}/next`)
        },
        onSuccess: (data) => {
            if (!data?.currentTimer) {
                // structure inattendue → on force un refetch pour repartir propre
                queryClient.invalidateQueries({ queryKey: ['sevenByNine', sessionId] })
                return
            }

            // ⬇️ data = la réponse complète du back, même forme que useSevenByNine
            queryClient.setQueryData(['sevenByNine', sessionId], data)
        },
        onError: (error) => {
            console.error(error)
        },
    })
}