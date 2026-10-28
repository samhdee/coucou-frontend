import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useToggleTimer(id) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (status) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/timer/${id}/${status}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!res.ok) {
                throw new Error('Mise à jour impossible')
            }

            return res.json()
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['timer', id], data)
        },
        onerror: (error) => {
            console.error(error)
        }
    })
}
