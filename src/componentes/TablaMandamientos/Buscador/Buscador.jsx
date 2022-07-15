import SearchIcon from '@mui/icons-material/Search'
import Search from './Search'
import StyledInputBase from './StyledInputBase'
import SearchIconWrapper from './SearchIconWrapper'

function Buscador({ actualizarTablaPorFiltro }) {

    const search = (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        const itResetTable = (!!e.target.value) ? false : true
        actualizarTablaPorFiltro("search", e.target.value, itResetTable)
    }

    return (
        <Search sx={{ mt: 3 }}>
            <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={search}
            />
            <SearchIconWrapper sx={{ display: 'inline' }}>
                <SearchIcon />
            </SearchIconWrapper>
        </Search>
    )
}

export default Buscador