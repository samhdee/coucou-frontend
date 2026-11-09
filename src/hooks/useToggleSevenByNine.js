import { useMutation, useQueryClient } from '@tanstack/react-query'
import {patchData} from "../libs/api.js";

export function useToggleSevenByNine(id) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (action) => {
            const res = await patchData(`seven-by-nine/${id}/${action}`)

            if (!res.ok) {
                throw new Error('Mise à jour impossible')
            }

            return res.json()
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['seven-by-nine', id], data)
        },
        onerror: (error) => {
            console.error(error)
        }
    })
}
