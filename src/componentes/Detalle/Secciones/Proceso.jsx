import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function Proceso({ mandamiento }) {
    return (
        <Box sx={{ flexGrow: 1, m:2 }}>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fecha libramiento:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(mandamiento.fecha_libramiento.split(" ")[0].replaceAll("-", "/")))} {mandamiento.fecha_libramiento.split(" ")[1]}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fuero:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.fuero_proceso}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Tipo de mandato:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.tipo_mandato}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>No averiguación:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.no_averiguacion}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fecha captura:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(mandamiento.fecha_captura.split(" ")[0].replaceAll("-", "/")))} {mandamiento.fecha_captura.split(" ")[1]}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fecha recepción:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    {new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(mandamiento.fecha_recepcion.split(" ")[0].replaceAll("-", "/")))} {mandamiento.fecha_recepcion.split(" ")[1]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Tipo de proceso:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.tipo_proceso}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}></Grid>
                <Grid item md={4} sx={{ mb: 3 }}></Grid>
            </Grid>
        </Box>
    )
}

export default Proceso