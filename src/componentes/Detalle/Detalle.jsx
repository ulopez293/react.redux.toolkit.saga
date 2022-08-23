import { useState, useEffect } from "react"

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button"

//import AcordeonWrapper from "./AcordeonWrapper/AcordeonWrapper"
import Carpeta from "./Secciones/Carpeta"
import Mandamiento from "./Secciones/Mandamiento"
import Proceso from "./Secciones/Proceso"
import Delitos from "./Secciones/Delitos"
import Alerta from "./Alerta/Alerta"

import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'

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

    const regresar = () => dispatch({ type: sagaActions.CAMBIO_DETALLE_SAGA, payload: { activo: false, id: '' } })

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3} sx={{ mb: 1, textAlign: 'right' }} justifyContent="flex-end">
                <   Grid item md={10}></Grid>
                <Grid item md={2}>
                    <Button onClick={regresar} variant="contained" color="error">regresar</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={12}>
                    <Alerta mandamiento={mandamiento} />
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={6}>
                    <ListItem sx={{ background: 'green', color: 'white' }}>
                        <ListItemText primary={`CARPETA: ${mandamiento.no_averiguacion}`} />
                    </ListItem>
                    <Carpeta mandamiento={mandamiento} />
                </Grid>
                <Grid item md={6}>
                    <ListItem sx={{ background: 'green', color: 'white' }}>
                        <ListItemText primary={`MANDAMIENTO: ${mandamiento.no_mandato}`} />
                    </ListItem>
                    <Mandamiento mandamiento={mandamiento} />
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={12}>
                    <ListItem sx={{ background: 'green', color: 'white' }}>
                        <ListItemText primary={`PROCESO: ${mandamiento.no_proceso}`} />
                    </ListItem>
                    <Proceso mandamiento={mandamiento} />
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item md={12}>
                    <ListItem sx={{ background: 'green', color: 'white' }}>
                        <ListItemText primary={`DELITOS: `} />
                    </ListItem>
                    <Delitos mandamiento={mandamiento} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Detalle