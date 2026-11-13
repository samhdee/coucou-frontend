import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {getData} from "../libs/api.js";

export function useSevenByNine(id, isRunning) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['seven-by-nine', id],
        queryFn: () => getData(`seven-by-nine/${id}`)
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
