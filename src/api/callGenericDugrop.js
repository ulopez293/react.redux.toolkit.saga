import server from '../server'

const callGenericDugrop = async (url, metodo, body) => {
    try {
        const response = await fetch(server.dugrop + url, {
            method: metodo,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json()
        if (response.ok) return json
    } catch (error) { console.log(error) }
}

export default callGenericDugrop