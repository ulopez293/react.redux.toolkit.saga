import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function Delitos({ mandamiento }) {
    const esNuloOVacio = (element) => (element == null || element == '') ? true : false
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>CLAVE</TableCell>
                        <TableCell align="right">ID_BUS</TableCell>
                        <TableCell align="right">NOMBRE</TableCell>
                        <TableCell align="right">ID_MODALIDAD</TableCell>
                        <TableCell align="right">PROPIEDADES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mandamiento.delitos.map((delito) => (
                        <TableRow key={delito.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ fontSize: 'smaller' }} component="th" scope="row">
                                {delito.clave}
                            </TableCell>
                            <TableCell sx={{ fontSize: 'smaller' }} align="right">{delito.id_delito}</TableCell>
                            <TableCell sx={{ fontSize: 'smaller' }} align="right">{delito.delito}</TableCell>
                            <TableCell sx={{ fontSize: 'smaller' }} align="right">{delito.id_modalidad}</TableCell>
                            <TableCell sx={{ fontSize: 'smaller' }} align="right">
                                {esNuloOVacio(delito.grado_consumacion) ? '' : <>
                                    <strong>Grado de consumación: </strong>
                                    {delito.grado_consumacion} <br/>
                                </>}
                                {esNuloOVacio(delito.calificacion_delito) ? '' : <>
                                    <strong>Calificación delito: </strong>
                                    {delito.calificacion_delito} <br/>
                                </>}
                                {esNuloOVacio(delito.forma_comision) ? '' : <>
                                    <strong>Forma de la comisión: </strong>
                                    {delito.forma_comision} <br/>
                                </>}
                                {esNuloOVacio(delito.forma_accion) ? '' : <>
                                    <strong>Forma de la acción: </strong>
                                    {delito.forma_accion} <br/>
                                </>}
                                {esNuloOVacio(delito.modalidad) ? '' : <>
                                    <strong>Modalidad: </strong>
                                    {delito.modalidad} <br/>
                                </>}
                                {esNuloOVacio(delito.instrumento_comision) ? '' : <>
                                    <strong>Instrumento de la comisión: </strong>
                                    {delito.instrumento_comision} <br/>
                                </>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Delitos