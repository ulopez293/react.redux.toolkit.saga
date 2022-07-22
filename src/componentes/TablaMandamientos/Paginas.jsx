import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import range from 'array-range'

import { useState } from 'react'

function Paginas({ cambiarPagina, cantidadPaginas }) {
    const [rangos, setRangos] = useState({ inicio:1, fin:1000 })
    const [arrayRange, setArrayRange] = useState(range(1,1001))

    const anterior = () => {
        if (rangos.inicio == 1) return
        let inicio = rangos.inicio-1000
        const array = range(inicio, (inicio+1000))
        setArrayRange(array)
        const posicion = { inicio: inicio, fin: (inicio+1000)-1 }
        console.log(posicion)
        setRangos(posicion)
    }

    const siguiente = () => {
        if (!(cantidadPaginas > rangos.fin)) return
        const restante = cantidadPaginas - rangos.fin
        let inicio = rangos.fin+1
        let fin = (rangos.fin+restante)+1
        const array = range(inicio, fin)
        setArrayRange(array)
        const posicion = { inicio: inicio, fin: fin-1 }
        console.log(posicion)
        setRangos(posicion)
    }
    if (cantidadPaginas > 1000) {
        return (
            <Box component="div" className="scrolly" sx={{ display: 'block', height: '45px', width: '100%', overflowX: 'scroll', mt:2 }}>
                &nbsp;&nbsp;&nbsp;
                {
                    (rangos.inicio == 1) ? null :
                    <ArrowBackIosIcon onClick={anterior} sx={{ fontSize: '20px', color:'#1976d2', cursor:'pointer' }} />
                }
                {arrayRange.map((element) => {
                    return <Button key={element} size="x-small" sx={{ display: 'contents' }}
                        onClick={cambiarPagina}>
                        {element} <FileOpenIcon sx={{ fontSize: '15px' }} />&nbsp;&nbsp;
                    </Button>
                })}
                {
                    (!(1050 > rangos.fin)) ? null :
                    <ArrowForwardIosIcon onClick={siguiente} sx={{ fontSize: '20px', color:'#1976d2', cursor:'pointer'}} />
                }
                &nbsp;&nbsp;&nbsp;
            </Box>
        )
    }
    return (
        <Box component="div" className="scrolly" sx={{ display: 'block', height: '45px', width: '100%', overflowX: 'scroll', margin: '20px' }}>
            {Array.apply(null, Array(cantidadPaginas)).map((element, id) => {
                return <Button key={id} size="x-small" sx={{ display: 'contents' }}
                    onClick={cambiarPagina}>
                    {id + 1} <FileOpenIcon sx={{ fontSize: '15px', mr: 1 }} />&nbsp;
                </Button>
            })}
        </Box>
    )
}

export default Paginas