import SearchIcon from '@mui/icons-material/Search'
import Search from './Search'

import TextField from '@mui/material/TextField '
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

function BuscadorPagina({ cambiarPagina, cantidadPaginas }) {

    const isNumber = (num) => !isNaN(num)

    const search = (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        if (!isNumber(e.target.value)) return
        if (parseInt(e.target.value) > cantidadPaginas) return
        cambiarPagina(e.target.value)
    }

    const handleClick = (e) => {
        let input = e.currentTarget.parentNode.parentNode.querySelector("input")
        if (!isNumber(input.value)) return
        if (parseInt(input.value) > cantidadPaginas) return
        cambiarPagina(input.value)
    }

    return (
                    <Search>
                        <TextField
                            fullWidth
                            id="standard-bare"
                            variant="standard"
                            placeholder="# de página"
                            InputProps={{
                                'aria-label': 'search',
                                endAdornment: (
                                    <IconButton onClick={handleClick}>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                            label="Ir a página..."
                            size="small"
                            onKeyPress={search}
                            sx={{ color: 'inherit' }}
                        />
                    </Search>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container>
        //         <Grid item xs={5}></Grid>
        //         <Grid item xs={2}>
        //         </Grid>
        //         <Grid item xs={5}></Grid>
        //     </Grid>
        // </Box>
    )
}

export default BuscadorPagina