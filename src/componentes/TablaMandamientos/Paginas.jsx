import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FileOpenIcon from '@mui/icons-material/FileOpen'

function Paginas({ cambiarPagina, cantidadPaginas}) {
    return (
        <Box component="div" className="scrolly" sx={{ display: 'block', height: '45px', width: '100%', overflowX: 'scroll', margin: '20px' }}>
            {Array.apply(null, Array(cantidadPaginas)).map((element, id) => {
                return <Button key={id} size="x-small" sx={{ display: 'contents' }}
                    onClick={cambiarPagina}>
                    {id + 1} <FileOpenIcon sx={{ fontSize: '15px', mr: 1 }} />
                </Button>
            })}
        </Box>
    )
}

export default Paginas