import SearchIcon from '@mui/icons-material/Search'
import Search from './Search'

import TextField from '@mui/material/TextField '
import IconButton from '@mui/material/IconButton'

function Buscador({ actualizarTablaPorFiltro }) {

    const search = (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        const itResetTable = (!!e.target.value) ? false : true
        actualizarTablaPorFiltro("search", e.target.value, itResetTable)
    }

    const handleClick = (e) => {
        let input = e.currentTarget.parentNode.parentNode.querySelector("input")
        const itResetTable = (!!input.value) ? false : true
        actualizarTablaPorFiltro("search", input.value, itResetTable)
    }

    return (
        <Search sx={{ mt: 0.3 }}>
            <TextField
                fullWidth
                id="standard-bare"
                variant="standard"
                placeholder="escribe..."
                InputProps={{
                    'aria-label': 'search',
                    endAdornment: (
                        <IconButton onClick={handleClick}>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                label="Buscar"
                size="small"
                onKeyPress={search}
                sx={{
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                        padding: '1',
                        paddingLeft: `calc(1em)`,
                        width: '20ch',
                    },
                }}
            />
        </Search>
    )
}

export default Buscador