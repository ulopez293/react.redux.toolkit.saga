import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

function Alerta({ mandamiento }) {
    // const requeridos = [
    //     'nombre', 'apaterno', 'amaterno', 'edad', 'id_sexo'
    // ]

    // const mostrarAlertas = () => {
    //     let alertas = []
    //     for (const key in mandamiento) {
    //         if (mandamiento[key] == null || mandamiento[key] == '' || mandamiento[key] == 'N') {
    //             if (requeridos.includes(key)){
    //                 alertas.push(<Alert key={key} severity="error">{key} - este campo es requerido</Alert>)
    //             }
    //         }
    //     }
    //     return alertas
    // }

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {mandamiento.errors.map(error => {
                return <Alert key={error.id} severity="error">{error.error}</Alert>
            })}
        </Stack>
    )
}

export default Alerta