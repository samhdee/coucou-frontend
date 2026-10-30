import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useSevenByNine(id, isRunning) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['sevenByNine', id],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/seven-by-nine/${id}`)

            if (!res.ok) {
                throw new Error('Timer introuvable')
            }

            return res.json()
        },
    })

    useEffect(() => {
        const url = new URL(import.meta.env.VITE_HUB_URL)
        url.searchParams.append('topic', `timer/${id}`)
        const es = new EventSource(url)

        es.onmessage = (event) => {
            queryClient.setQueryData(['sevenByNine', id], JSON.parse(event.data))
        }

        return () => es.close()
    }, [id, queryClient, isRunning])

    return query
}
