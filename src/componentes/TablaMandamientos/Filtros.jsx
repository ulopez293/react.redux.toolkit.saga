import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

import useFetchData from '../../hooks/useFetchData'

function Filtros({ mandamientosDatos }) {
    const [busqueda, setBusqueda] = useState({
        unidad: '', estatus: '', region: ''
    })
    const [catalogos, setCatalogos] = useFetchData('catalogos/mandamientos_filtros')

    const handleChange = (event) => {
        //setAge(event.target.value)
        setBusqueda(event.target.value)
        console.log(event.target.value)
    }

    if (catalogos == null) return
    return (
        <>
            <Divider />
            <Grid container>
                <Grid item xs={3}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="unidad_label">Unidad</InputLabel>
                        <Select id="unidad_select" labelId='unidad_label' value={busqueda} onChange={handleChange}>
                            <MenuItem defaultValue=""><em>None</em></MenuItem>
                            {catalogos.catUnidades.map(unidad => <MenuItem key={unidad.id} value={unidad.nombre}>{unidad.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Estatus</InputLabel>
                        <Select value={busqueda} onChange={handleChange}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            {catalogos.catEstatus.map(estatus => <MenuItem key={estatus.id} value={estatus.nombre}>{estatus.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Region</InputLabel>
                        <Select value={busqueda} onChange={handleChange}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            {catalogos.catRegiones.map(region => <MenuItem key={region.id} value={region.nombre}>{region.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2, mt: 2 }} />
        </>
    )
}

export default Filtros