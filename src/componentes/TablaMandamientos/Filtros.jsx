import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'

import Buscador from './Buscador/Buscador'

import useFetchData from '../../hooks/useFetchData'

const defaultValuesBusqueda = { id_unidad: '', estatus: '', id_region: '', id_fiscal: '' }

function Filtros({ actualizarTablaPorFiltro }) {
    const [busqueda, setBusqueda] = useState(defaultValuesBusqueda)
    const [catalogos, ] = useFetchData('catalogos/mandamientos_filtros')

    if (catalogos == null) return

    const handleChange = (event) => {
        setBusqueda({ ...defaultValuesBusqueda, [event.target.name]: event.target.value })
        const itResetTable = (!!event.target.value) ? false : true
        actualizarTablaPorFiltro(event.target.name, event.target.value, itResetTable)
    }

    return (
        <>
            <Divider />
            <Grid container>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Unidad</InputLabel>
                        <Select value={busqueda.id_unidad} onChange={handleChange} name="id_unidad">
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
                        <Select value={busqueda.id_region} onChange={handleChange} name="id_region">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catRegiones.map(region => <MenuItem key={region.id} value={region.id}>{region.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Fiscal</InputLabel>
                        <Select value={busqueda.id_fiscal} onChange={handleChange} name="id_fiscal">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catFiscales.map(fiscal => <MenuItem key={fiscal.id} value={fiscal.id}>{fiscal.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Buscador actualizarTablaPorFiltro={actualizarTablaPorFiltro} />
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2, mt: 2 }} />
        </>
    )
}

export default Filtros