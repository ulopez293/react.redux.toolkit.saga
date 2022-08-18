import * as React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import './TablaMandamientos.css'

import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../sagaActions'

import TablaAccionesPaginacion from "./TablaAccionesPaginacion"
import Fila from "./Fila"
import Detalle from "../Detalle/Detalle"
import Paginas from './Paginas'
import Filtros from './Filtros'
import BuscadorPagina from './Buscador/BuscadorPagina'

import useFetchData from "../../hooks/useFetchData.jsx"
import api from "../../api/api"
import apiCall from '../../api/apiCall'

function TablaMandamientos({ filtros }) {
    const checks = useSelector((state) => state.check.checks)
    const dispatch = useDispatch()

    const detalle = useSelector((state) => state.detalle.detalle)

    const [cantidadPaginas, setCantidadPaginas] = React.useState(0)
    const [numeroRegistros, setNumeroRegistros] = React.useState(0)
    const [filasVacias, setFilasVacias] = React.useState(0)
    const [pagina, setPagina] = React.useState(0)
    const [numeroDeFilasPorPagina, setNumeroDeFilasPorPagina] = React.useState(5)
    const [triggerPage, setTriggerPage] = React.useState(false)
    const [mandamientos, setMandamientos] = useFetchData("mandamientos")

    const [itFilter, setItFilter] = React.useState(false)
    const [dataFilter, setDataFilter] = React.useState({ nameFilter: '', idFilter: '' })

    const [consumeRedux, setConsumeRedux] = React.useState(false)

    let user = useSelector((state) => state.login.user)

    React.useEffect(() => {
        if (user == undefined) {
            dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: false })
        }

        if (mandamientos != null) asignarDatosSetMandamientos(mandamientos)
        resetTable()
    }, [])

    const initialParameters = () => {
        if (mandamientos == null) return
        if (consumeRedux) {
            setCantidadPaginas(1)
            setNumeroRegistros(mandamientos.data.length)
            setFilasVacias(pagina > 0 ? Math.max(0, (1 + pagina) * numeroDeFilasPorPagina - mandamientos.data.length) : 0)
        } else {
            setCantidadPaginas(mandamientos.last_page)
            setNumeroRegistros(mandamientos.total)
            setFilasVacias(pagina > 0 ? Math.max(0, (1 + pagina) * numeroDeFilasPorPagina - mandamientos.data.length) : 0)
        }
    }

    React.useEffect(() => {
        const onReloadChangeReact = () => {
            if (mandamientos == null) return
            initialParameters()
            if (consumeRedux) {
                triggerRestore()
                triggerFirstPage()
                setTimeout(() => asignarDatosSetMandamientos({ data: checks }), 400)
                console.log("onreload code changes")
            }
        }
        onReloadChangeReact()
    }, [])

    React.useEffect(() => {
        if (mandamientos == null) return
        if (consumeRedux) {
            triggerRestore()
            triggerFirstPage()
            setTimeout(() => asignarDatosSetMandamientos({ data: checks }), 1)
        }
    }, [consumeRedux])

    React.useEffect(() => {
        initialParameters()
    }, [mandamientos])

    if (mandamientos == null) return

    const handleChangePage = (event, newPage) => setPagina(newPage)

    const handleChangeRowsPerPage = (event) => {
        setNumeroDeFilasPorPagina(parseInt(event.target.value, 10))
        setPagina(0)
        console.log("mostrar solo cantidad paginas", event.target.value)
    }

    const desplegarFilas = () => {
        return (numeroDeFilasPorPagina > 0
            ? mandamientos.data.slice(pagina * numeroDeFilasPorPagina, pagina * numeroDeFilasPorPagina + numeroDeFilasPorPagina)
            : mandamientos.data
        ).map((row) => (
            <Fila key={row.id} row={row} consumeRedux={consumeRedux} setMandamientos={asignarDatosSetMandamientos} />
        ))
    }

    const cambiarPaginaCallback = async (numberPage) => {
        if (itFilter) {
            triggerRestore()
            triggerFirstPage()
            const rutaFilter = `&${dataFilter.nameFilter}=${dataFilter.idFilter}`
            const filtroRegion = (user.dato_fiscal.id_region != null) ? `&id_region=${user.dato_fiscal.id_region}` : ''
            let datos = await api(`mandamientos?page=${numberPage}${rutaFilter}${filtroRegion}`, "GET")
            asignarDatosSetMandamientos(datos)
        } else {
            triggerRestore()
            triggerFirstPage()
            const filtroRegion = (user.dato_fiscal.id_region != null) ? `&id_region=${user.dato_fiscal.id_region}` : ''
            let datos = await api(`mandamientos?page=${numberPage}${filtroRegion}`, "GET")
            asignarDatosSetMandamientos(datos)
        }
    }

    const cambiarPagina = async (e) => {
        if (isNaN(e)) {
            cambiarPaginaCallback(e.currentTarget.textContent)
            return
        }
        cambiarPaginaCallback(e)
    }

    async function resetTable() {
        triggerRestore()
        triggerFirstPage()
        const filtroRegion = (user.dato_fiscal.id_region != null) ? `?id_region=${user.dato_fiscal.id_region}` : ''
        let datos = await api(`mandamientos${filtroRegion}`, "GET")
        asignarDatosSetMandamientos(datos)
        setItFilter(false)
    }

    function triggerFirstPage() { setTriggerPage(true) }
    function triggerRestore() { setTriggerPage(false) }

    function asignarDatosSetMandamientos(datos) {
        if (user == undefined) {
            dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: false })
        }
        if (user.dato_fiscal.id_region==null) {
            setMandamientos(datos)
            return
        }

        let nombreRegion = (filtros.catRegiones.find(element => element.id == user.dato_fiscal.id_region)).nombre
        let auxDatos = datos
        let arrayFilter = datos.data.filter(item => item.region == nombreRegion)
        auxDatos.data = arrayFilter
        setMandamientos(auxDatos)
    }

    const actualizarTablaPorFiltro = async (nombre, id, itResetTable) => {
        console.log("actualizar por filtro")
        if (itResetTable) {
            triggerRestore()
            triggerFirstPage()
            resetTable()
        } else {
            triggerRestore()
            triggerFirstPage()
            const filtroRegion = (user.dato_fiscal.id_region != null) ? `&id_region=${user.dato_fiscal.id_region}` : ''
            let datos = await api(`mandamientos?page=1&${nombre}=${id}${filtroRegion}`, "GET")
            asignarDatosSetMandamientos(await api(`mandamientos?page=1&${nombre}=${id}${filtroRegion}`, "GET"))
            setItFilter(true)
            setDataFilter({ nameFilter: nombre, idFilter: id })
        }
    }

    const removeAllChecks = () => {
        dispatch({ type: sagaActions.REMOVE_ALL_CHECKS_SAGA })
        if (consumeRedux) asignarDatosSetMandamientos({ data: [] })
    }

    const addAllChecksOfThePage = () => {
        mandamientos.data.map(mandamiento => dispatch({ type: sagaActions.ADD_CHECKS_SAGA, payload: mandamiento }))
    }

    const showCarrito = () => {
        if (checks.length == 0) return
        setConsumeRedux(true)
    }

    const volverCarrito = () => {
        resetTable()
        setConsumeRedux(false)
    }

    const enviarBus = async () => {
        let uuids = mandamientos.data.map(item => item.id)
        let body = { uuids: uuids }
        let response = await apiCall('POST', 'bus_mandato/send', 'host', body)
        try {
            if ('message' in response) {
                alert(response.message)
                resetTable()
                setConsumeRedux(false)
                removeAllChecks()
            }
        } catch (error) { 
            alert("Error al enviar registros")
            console.log(response)
            console.log(error) 
        }
    }

    if (detalle.activo) return <Detalle />
    return (
        <div align="center">
            {consumeRedux ? <Box sx={{ mt: 3, mb: 3 }} >
                <Button variant="contained" size="large"
                    onClick={volverCarrito}
                    sx={{ bgcolor: 'secondary.main', mr: 3 }} >Volver</Button>
                <Button onClick={enviarBus} variant="contained" size="large">Enviar al Bus</Button>
            </Box> : <Filtros catalogos={filtros} actualizarTablaPorFiltro={actualizarTablaPorFiltro} showCarrito={showCarrito} />}
            <TableContainer component={Paper} align="center">
                <Table aria-label="custom pagination table" sx={{ minWidth: 440 }} size="small">
                    <TableHead>
                        <TableRow>
                            {consumeRedux ? <TableCell /> : <>
                                <TableCell sx={{ backgroundColor: '#00ffa550' }}>
                                    <PlaylistAddCheckIcon onClick={addAllChecksOfThePage} sx={{ cursor: 'pointer', fontSize: 'x-large' }} />
                                </TableCell>
                            </>}
                            <TableCell sx={{ backgroundColor: '#fc058f50' }}>
                                <PlaylistRemoveIcon onClick={removeAllChecks} sx={{ cursor: 'pointer', fontSize: 'x-large' }} />
                            </TableCell>
                            <TableCell><MenuIcon sx={{ fontSize: '21px' }} /></TableCell>
                            <TableCell>No</TableCell>
                            <TableCell align="right">Región</TableCell>
                            <TableCell align="right">Unidad</TableCell>
                            <TableCell align="right">Proceso</TableCell>
                            <TableCell align="right">Fecha Proceso</TableCell>
                            <TableCell align="right">Imputado</TableCell>
                            <TableCell align="right">Carpeta</TableCell>
                            <TableCell align="center">Fecha carpeta</TableCell>
                            <TableCell align="right">Delitos</TableCell>
                            <TableCell align="right">Estatus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {desplegarFilas()}
                        {filasVacias > 0 && (
                            <TableRow style={{ height: 53 * filasVacias }}>
                                <TableCell colSpan={11} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 15, 50, 100]}
                                colSpan={3}
                                count={mandamientos.data.length}
                                rowsPerPage={numeroDeFilasPorPagina}
                                labelRowsPerPage={"Filas por Página:"}
                                page={pagina}
                                SelectProps={{ inputProps: { 'aria-label': 'rows per page' }, native: true }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={(subprops) => {
                                    return <TablaAccionesPaginacion {...subprops}
                                        triggerPage={triggerPage}
                                        triggerFirstPage={triggerFirstPage}
                                        triggerRestore={triggerRestore} />
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {consumeRedux ? <></> : <>
                <Paginas cambiarPagina={cambiarPagina} cantidadPaginas={cantidadPaginas} />
                <BuscadorPagina cambiarPagina={cambiarPagina} />
                <Typography variant="subtitle2" gutterBottom component="div" sx={{ m: 3 }}>
                    Pagina Actual: {mandamientos.current_page} | Registros Actuales: {mandamientos.data.length} | Total de Paginas: {cantidadPaginas} | Total de Registros: {numeroRegistros}
                </Typography>
            </>}
        </div>
    )
}

export default TablaMandamientos