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
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'

import TablaAccionesPaginacion from "./TablaAccionesPaginacion"
import Paginas from './Paginas'
import Filtros from './Filtros'
import BuscadorPagina from './Buscador/BuscadorPagina'
import Paginacion from './Paginacion'


function TablaMandamientosVista(props) {
    const {
        checkAll,
        numeroRegistros,
        filasVacias,
        triggerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        desplegarFilas,
        cambiarPagina,
        actualizarTablaPorFiltro,
        showCarrito,
        volverCarrito,
        enviarBus,
        handleCheckALL,
        cantidadPaginas,
        consumeRedux,
        filtros,
        mandamientos,
        numeroDeFilasPorPagina,
        pagina,
        triggerFirstPage,
        triggerRestore,
        ultimaRutaAPI,
        cambiarPaginaCallback
    } = props
    const stylesHeadCell = { padding: 1, fontWeight: 'bold', width: '10%', fontSize: 'small' }
    return (
        <div align="center">
            {consumeRedux ? <Box sx={{ mt: 3, mb: 3 }} >
                <Button variant="contained" size="large"
                    onClick={volverCarrito}
                    sx={{ bgcolor: 'secondary.main', mr: 3 }} >Volver</Button>
                <Button onClick={enviarBus} variant="contained" size="large">Enviar al Bus</Button>
            </Box> : <Filtros catalogos={filtros} actualizarTablaPorFiltro={actualizarTablaPorFiltro} showCarrito={showCarrito} />}
            <TableContainer component={Paper} align="center">
                <Table aria-label="custom pagination table" size="small">
                    <TableHead>
                        <TableRow>
                            {consumeRedux ? <TableCell /> : <>
                                <TableCell sx={{ backgroundColor: (checkAll.some(item => item == ultimaRutaAPI)) ? '#00ffa550' : '#fc058f50' }}>
                                    <Checkbox
                                        color="primary"
                                        checked={checkAll.some(item => item == ultimaRutaAPI)}
                                        onChange={handleCheckALL}
                                    />
                                </TableCell>
                            </>}
                            <TableCell><MenuIcon sx={{ fontSize: '21px' }} /></TableCell>
                            <TableCell sx={stylesHeadCell} align="center">No</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Región</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Unidad</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Proceso</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Fecha Proceso</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Imputado</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Carpeta</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Fecha carpeta</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Delitos</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Estado</TableCell>
                            <TableCell sx={stylesHeadCell} align="center">Estatus</TableCell>
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
                    <TableFooter><TableRow></TableRow></TableFooter>
                </Table>
            </TableContainer>
            {/* <Grid container sx={{ mb: 3, mt: 3 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TablePagination
                                        sx={{ justifyContent: "left", display: 'flex' }}
                                        rowsPerPageOptions={[5, 15, 50, 100, {label: 'all', value:-1}]}
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
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4}>
                    <BuscadorPagina cambiarPagina={cambiarPagina} cantidadPaginas={cantidadPaginas} />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid> */}
            {consumeRedux ? <></> : <>
                <Paginacion cantidadPaginas={cantidadPaginas} cambiarPaginaCallback={cambiarPaginaCallback} />
                <Paginas cambiarPagina={cambiarPagina} cantidadPaginas={cantidadPaginas} />
                <Typography variant="subtitle2" gutterBottom component="div" sx={{ m: 3 }}>
                    Pagina Actual: {mandamientos.current_page} | Registros Actuales: {mandamientos.data.length} | Total de Paginas: {cantidadPaginas}
                    | Total de Registros: {numeroRegistros}
                </Typography>
            </>}
        </div>
    )
}

export default TablaMandamientosVista