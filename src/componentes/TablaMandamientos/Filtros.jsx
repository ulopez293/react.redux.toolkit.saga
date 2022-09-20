import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import Badge from "@mui/material/Badge"

import Buscador from './Buscador/Buscador'

import { useSelector } from 'react-redux'

const defaultValuesBusqueda = { id_unidad: '', id_estatus: '', id_region: '', id_fiscal: '' }

function Filtros({ actualizarTablaPorFiltro, showCarrito, catalogos }) {
    const checks = useSelector((state) => state.check.checks)
    const [busqueda, setBusqueda] = useState(defaultValuesBusqueda)

    let user = useSelector((state) => state.login.user)
    useEffect(() => {
        if (user == undefined) {
            dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: false })
        }
    }, [])

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
                    {(user?.dato_fiscal?.id_region != null) ? null
                        : <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Region</InputLabel>
                            <Select value={busqueda.id_region} onChange={handleChange} name="id_region">
                                <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                                {catalogos.catRegiones.map((region, idAuxReg) => <MenuItem key={idAuxReg} value={region.id}>{region.nombre}</MenuItem>)}
                            </Select>
                        </FormControl>}
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Unidad</InputLabel>
                        <Select value={busqueda.id_unidad} onChange={handleChange} name="id_unidad">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catUnidades.map((unidad,idAuxUni) => <MenuItem key={idAuxUni} value={unidad.id}>{unidad.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Fiscal</InputLabel>
                        <Select value={busqueda.id_fiscal} onChange={handleChange} name="id_fiscal">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catFiscales.map((fiscal,idAuxFis) => <MenuItem key={idAuxFis} value={fiscal.id}>{fiscal.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Estatus</InputLabel>
                        <Select value={busqueda.id_estatus} onChange={handleChange} name="id_estatus">
                            <MenuItem value=""><em>Buscar Filtro:</em></MenuItem>
                            {catalogos.catEstatus.map((estatus,idAuxEsta) => <MenuItem key={idAuxEsta} value={estatus.id}>{estatus.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Buscador actualizarTablaPorFiltro={actualizarTablaPorFiltro} />
                </Grid>
                <Grid item xs={2}>
                    <Badge color="secondary" badgeContent={checks.length} sx={{ mt: 3, cursor: 'pointer' }}>
                        <DriveFileMoveIcon onClick={showCarrito} sx={{ fontSize: 'xx-large' }} />
                    </Badge>
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2, mt: 2 }} />
        </>
    )
}

export default Filtros