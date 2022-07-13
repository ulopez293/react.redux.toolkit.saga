import { useState, useEffect } from 'react'
import api from "../api/api"

const useFetchData = (BASE_URL = '') => {
    const [fetch_data, setFetchData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            let datos = await api(BASE_URL, "GET")
            setFetchData(datos)
        }
        fetchData()
    }, [BASE_URL])

    return [fetch_data, setFetchData]
}

export default useFetchData