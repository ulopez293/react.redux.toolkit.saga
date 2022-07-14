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

import './TablaMandamientos.css'

import { useSelector } from 'react-redux'

import TablaAccionesPaginacion from "./TablaAccionesPaginacion"
import Fila from "./Fila"
import Detalle from "../Detalle/Detalle"
import Paginas from './Paginas'
import Filtros from './Filtros'

import useFetchData from "../../hooks/useFetchData.jsx"
import api from "../../api/api"
import { useState } from 'react'

function TablaMandamientos() {
    const detalle = useSelector((state) => state.detalle.detalle)

    const [cantidadPaginas, setCantidadPaginas] = React.useState(0)
    const [numeroRegistros, setNumeroRegistros] = React.useState(0)
    const [filasVacias, setFilasVacias] = React.useState(0)
    const [pagina, setPagina] = React.useState(0)
    const [numeroDeFilasPorPagina, setNumeroDeFilasPorPagina] = React.useState(5)
    const [mandamientos, setMandamientos] = useFetchData("mandamientos")

    React.useEffect(() => {
        if (mandamientos == null) return
        setCantidadPaginas(mandamientos.last_page)
        setNumeroRegistros(mandamientos.total)
        setFilasVacias(pagina > 0 ? Math.max(0, (1 + pagina) * numeroDeFilasPorPagina - mandamientos.data.length) : 0)
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
            <Fila key={row.id} row={row} />
        ))
    }

    const cambiarPagina = async (e) => {
        let datos = await api(`mandamientos?page=${e.currentTarget.textContent}`, "GET")
        setMandamientos(datos)
    }

    if (detalle.activo) return <Detalle />
    return (
        <div align="center">
            <Filtros mandamientosDatos={mandamientos.data} />
            <TableContainer component={Paper} align="center">
                <Table aria-label="custom pagination table" sx={{ minWidth: 440 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
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
                                rowsPerPageOptions={[]}
                                colSpan={3}
                                count={mandamientos.data.length}
                                rowsPerPage={numeroDeFilasPorPagina}
                                labelRowsPerPage={"Filas por Página:"}
                                page={pagina}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablaAccionesPaginacion}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Paginas cambiarPagina={cambiarPagina} cantidadPaginas={cantidadPaginas} />
            <Typography variant="subtitle2" gutterBottom component="div" sx={{ m: 3 }}>
                Pagina Actual: {mandamientos.current_page} | Registros Actuales: {mandamientos.data.length} | Total de Paginas: {cantidadPaginas} | Total de Registros: {numeroRegistros}
            </Typography>
        </div>
    )
}

export default TablaMandamientos