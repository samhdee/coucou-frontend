import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useToggleSevenByNine(id) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (action) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/seven-by-nine/${id}/${action}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            })

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
