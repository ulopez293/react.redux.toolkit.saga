import { useState, useEffect } from "react"

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button"

import AcordeonWrapper from "./AcordeonWrapper/AcordeonWrapper"
import Carpeta from "./Secciones/Carpeta"
import Mandamiento from "./Secciones/Mandamiento"
import Proceso from "./Secciones/Proceso"
import Delitos from "./Secciones/Delitos"
import Alerta from "./Alerta/Alerta"

import { sagaActions } from "../../sagaActions"

import api from "../../api/api"

import { useDispatch, useSelector } from 'react-redux'


function Detalle() {
    const dispatch = useDispatch()
    const detalle = useSelector((state) => state.detalle.detalle)
    const [mandamiento, setMandamiento] = useState(null)

    useEffect(() => {
        if (detalle.activo) {
            const actualizaMandamiento = async () => {
                let dato = await api(`mandamiento/${detalle.id}`, "GET")
                setMandamiento(dato)
            }
            actualizaMandamiento()
        }
    }, [detalle])

    if (mandamiento == null) return ''

    const regresar = () => dispatch({ type: sagaActions.CAMBIO_DETALLE_SAGA , payload: { activo: false, id: '' } })

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={12}>
                    <Alerta mandamiento={mandamiento} />
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={12}>
                    <AcordeonWrapper titulo={`CARPETA: ${mandamiento.no_averiguacion}`} >
                        <Carpeta mandamiento={mandamiento} />
                    </AcordeonWrapper>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={6}>
                    <AcordeonWrapper titulo={`MANDAMIENTO: ${mandamiento.no_mandato}`} >
                        <Mandamiento mandamiento={mandamiento} />
                    </AcordeonWrapper>
                </Grid>
                <Grid item md={6}>
                    <AcordeonWrapper titulo={`PROCESO: ${mandamiento.no_proceso}`} >
                        <Proceso mandamiento={mandamiento} />
                    </AcordeonWrapper>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={12}>
                    <AcordeonWrapper titulo={`DELITOS: `} >
                        <Delitos mandamiento={mandamiento} />
                    </AcordeonWrapper>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3, textAlign: 'center' }}>
                <Grid item md={12}>
                    <Button onClick={regresar} variant="contained" color="error">regresar</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Detalle