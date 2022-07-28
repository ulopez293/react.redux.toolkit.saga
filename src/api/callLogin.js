import server from '../server'

const callLogin = async (credentials) => {
    try {
        const body = JSON.stringify(credentials)
        const response = await fetch(server.dugrop + 'login', {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json()
        if (response.ok) return json
    } catch (error) { console.log(error) }
}

export default callLogin