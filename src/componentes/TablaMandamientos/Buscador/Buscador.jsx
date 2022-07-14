import SearchIcon from '@mui/icons-material/Search'
import Search from './Search'
import StyledInputBase from './StyledInputBase'
import SearchIconWrapper from './SearchIconWrapper'

function Buscador() {
    return (
        <Search sx={{ mt: 3 }}>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper sx={{ display: 'inline' }}>
                <SearchIcon />
            </SearchIconWrapper>
        </Search>
    )
}

export default Buscador