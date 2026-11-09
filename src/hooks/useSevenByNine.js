import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useSevenByNine(id, isRunning) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['seven-by-nine', id],
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
        url.searchParams.append('topic', `seven-by-nine/${id}`)
        const es = new EventSource(url)

        es.onmessage = (event) => {
            queryClient.setQueryData(['seven-by-nine', id], JSON.parse(event.data))
        }

        return () => es.close()
    }, [id, queryClient, isRunning])

    return query
}
