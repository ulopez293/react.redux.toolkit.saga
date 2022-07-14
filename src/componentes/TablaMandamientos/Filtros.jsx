import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

import Buscador from './Buscador/Buscador'

import useFetchData from '../../hooks/useFetchData'

function Filtros({ cambiarPagina }) {
    const [busqueda, setBusqueda] = useState({ unidad: '', estatus: '', region: '', fiscal: '' })
    const [catalogos, setCatalogos] = useFetchData('catalogos/mandamientos_filtros')

    const handleChange = (event) => {
        const defaultValues = { unidad: '', estatus: '', region: '' }
        setBusqueda({ ...defaultValues, [event.target.name]: event.target.value })

    }

    if (catalogos == null) return
    return (
        <>
            <Divider />
            <Grid container>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Unidad</InputLabel>
                        <Select value={busqueda.unidad} onChange={handleChange} name="unidad">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catUnidades.map(unidad => <MenuItem key={unidad.id} value={unidad.id}>{unidad.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Estatus</InputLabel>
                        <Select value={busqueda.estatus} onChange={handleChange} name="estatus">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catEstatus.map(estatus => <MenuItem key={estatus.id} value={estatus.id}>{estatus.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Region</InputLabel>
                        <Select value={busqueda.region} onChange={handleChange} name="region">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catRegiones.map(region => <MenuItem key={region.id} value={region.id}>{region.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Fiscal</InputLabel>
                        <Select value={busqueda.fiscal} onChange={handleChange} name="region">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Buscador />
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2, mt: 2 }} />
        </>
    )
}

export default Filtros