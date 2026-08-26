import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const emptyObject = {}

export function useFetch(url, options = emptyObject) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/${url}`, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...options.headers
            },
        })
        .then(r => r.json())
        .then(response => {
            setLoading(false)
            setData(response)
        })
        .catch(e => {
            console.error(e)
            setErrors(e)
        })
        .finally(() => setLoading(false))
    }, [])

    return [loading, data, errors]
}