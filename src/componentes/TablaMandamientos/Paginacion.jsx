import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginacion({ cantidadPaginas, cambiarPaginaCallback }) {
    const handleChangePage = (event, value) => {
        cambiarPaginaCallback(value)
    }

    return (
        <Stack spacing={4} sx={{ m: 5, mt: 3 }}>
            <Pagination 
                count={cantidadPaginas}
                onChange={handleChangePage}
                size="large"
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
            />
        </Stack>
    )
}
