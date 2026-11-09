import { useMutation, useQueryClient } from '@tanstack/react-query'
import {patchData} from "../libs/api.js";

export function useToggleTimer(id) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (action) => {
            const res = await patchData(`session/${id}/${action}`)

            if (!res.ok) {
                throw new Error('Mise à jour impossible')
            }

            return res.json()
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['session', id], data)
        },
        onerror: (error) => {
            console.error(error)
        }
    })
}
