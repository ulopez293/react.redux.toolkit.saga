import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginacion({ cantidadPaginas }) {
    const handleChangePage = (event, value) => {
        console.log(value)
    }

    return (
        <Stack spacing={4} sx={{ m: 5, mt: 3 }}>
            <Pagination 
                count={10000}
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
