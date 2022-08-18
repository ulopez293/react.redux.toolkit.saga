import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import FeedIcon from '@mui/icons-material/Feed'
import Checkbox from '@mui/material/Checkbox'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { sagaActions } from '../../sagaActions'

import { useDispatch, useSelector } from 'react-redux'

function Fila({ row, consumeRedux, setMandamientos }) {
    const checks = useSelector((state) => state.check.checks)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)

    const deplegarDetalle = (event) => {
        let identificador = event.currentTarget.attributes.identificador.value
        dispatch({ type: sagaActions.CAMBIO_DETALLE_SAGA, payload: { activo: true, id: identificador } })
    }

    const removeItem = (id) => {
        dispatch({ type: sagaActions.REMOVE_CHECKS_SAGA, payload: { id } })
        const filter = checks.filter(item => item.id !== id)
        setMandamientos({ data: filter })
    }

    const handleChecked = (event) => {
        if (event.target.checked) {
            dispatch({ type: sagaActions.ADD_CHECKS_SAGA, payload: row })
            return
        }
        dispatch({ type: sagaActions.REMOVE_CHECKS_SAGA, payload: { id: row.id } })
    }

    return (
        <React.Fragment>
            <TableRow sx={{
                '& > *': { borderBottom: 'unset' },
                backgroundColor: (row.estatus.toUpperCase() == "AUTORIZADO") ? 'white' : 
                (row.estatus.toUpperCase() == "ENVIADO") ? 'green' : (row.estatus.toUpperCase() == "PENDIENTE") ? 'yellow' : '#fc058f20'
            }}>
                <TableCell padding="checkbox" align="center" colSpan={2}>
                    {row.estatus.toUpperCase() == "AUTORIZADO" && !consumeRedux ?
                        <Checkbox
                            color="primary"
                            checked={checks.some(item => item.id === row.id)}
                            onChange={handleChecked} /> : null
                    }
                    {
                        consumeRedux ? <DeleteOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => removeItem(row.id)} /> : null
                    }
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.llave}</TableCell>
                <TableCell align="right">{row.region}</TableCell>
                <TableCell align="right">{row.unidad}</TableCell>
                <TableCell align="right">{row.no_mandato}</TableCell>
                <TableCell align="right">{row.fecha_oficio}</TableCell>
                <TableCell align="right">{row.nombre_imputado}</TableCell>
                <TableCell align="right">{row.carpeta_inv}</TableCell>
                <TableCell align="right">{row.carpeta_inv}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{row.estatus}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Button variant="contained"
                                identificador={row.id}
                                size='small' onClick={deplegarDetalle}>
                                <FeedIcon fontSize='small' sx={{ mr: '10px' }} />
                                Detalle
                            </Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

Fila.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        unidad: PropTypes.string.isRequired,
        no_mandato: PropTypes.string.isRequired,
        fecha_oficio: PropTypes.string,//.isRequired,
        nombre_imputado: PropTypes.string,//.isRequired,
        carpeta_inv: PropTypes.string.isRequired,
        estatus: PropTypes.string.isRequired
    }).isRequired,
}

export default Fila