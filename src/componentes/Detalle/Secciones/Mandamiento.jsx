import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function Mandamiento({ mandamiento }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={12}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Municipio:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.municipio}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Juzgado:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.juzgado}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>No causa:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.no_causa}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Oficio:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.oficio_juzgado}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Tipo cuantía:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.cuantia}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Mandamiento