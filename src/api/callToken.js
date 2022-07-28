import server from '../server'

const callToken = async (credentials) => {
    try {
        const body = JSON.stringify({ login: credentials.login })
        const response = await fetch(server.dugrop + 'get-token', {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json()
        if (response.ok) return json
    } catch (error) { console.log(error) }
}

export default callToken