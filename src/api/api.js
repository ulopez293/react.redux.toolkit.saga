import server from "../server"

function api(rutaAPI, metodo) {
    let url = server.host + rutaAPI
    let cabeceras = {
        method: metodo,
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    }
    let request = new Request(url, cabeceras)
    return fetch(request).then(async response => {
        const data = await response.json()
        if (!response.ok) {
            throw new Error('Respuesta de red OK pero respuesta HTTP no OK')
        }
        return data
    }).catch(function (error) {
        console.log('Hubo un problema con la petición:' + error.message)
    })
}

export default api