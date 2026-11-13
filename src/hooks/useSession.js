import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {getData} from "../libs/api.js";

export function useSession(id, isRunning) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['session', id],
        queryFn: () => getData(`session/${id}`)
    })

    useEffect(() => {
        const url = new URL(import.meta.env.VITE_HUB_URL)
        url.searchParams.append('topic', `session/${id}`)
        const es = new EventSource(url)

        es.onmessage = (event) => {
            queryClient.setQueryData(['session', id], JSON.parse(event.data))
        }

        return () => es.close()
    }, [id, queryClient, isRunning])

    return query
}
