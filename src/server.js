
const configuracionServidor = {
    //host: "http://127.0.0.1:8000/api/",
    host: import.meta.env.VITE_API_URL
    //host: (window.location.origin) ? '' : ''
    //host: "http://192.108.24.197:8046/api/"
}

export default configuracionServidor