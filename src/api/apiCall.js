import server from "../server"

export default async (metodo, rutaAPI, sistem, cuerpo) => {
    let url = server[sistem] + rutaAPI
    let cabeceras = {
        method: metodo,
        headers: { 'Content-Type': 'application/json' }
    }
    if (cuerpo!=undefined) cabeceras.body = JSON.stringify(cuerpo)
    let request = new Request(url, cabeceras)
    return await fetch(request).then(async response => {
        const data = await response.json()
        if (!response.ok) {
            throw new Error('Respuesta de red OK pero respuesta HTTP no OK')
        }
        return data
    }).catch(function (error) {
        console.log('Hubo un problema con la petición:' + error.message)
    })
}