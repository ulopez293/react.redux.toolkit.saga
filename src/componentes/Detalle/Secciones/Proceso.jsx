import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function Proceso({ mandamiento }) {
    const lineStyle = {
        width: '100%',
        textAlign: 'center',
        borderBottom: '1px solid #000',
        lineHeight: '0.1em',
        margin: '10px 0 20px',
    }
    const textLineStyle = { background: '#fff', padding: '0 10px', }
    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
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
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={12} sx={{ mb: 3 }}>
                    <Typography variant="subtitle3"
                        gutterBottom component="div"
                        sx={lineStyle}>
                        <span style={textLineStyle}>
                            Cumplimiento del mandato
                        </span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fecha de prescripción:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.fecha_prescripcion}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fecha de cumplimiento:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.fecha_cumplimiento}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Oficion de cumplimiento:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.oficio_cumple}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={12} sx={{ mb: 3 }}>
                    <Typography variant="subtitle3"
                        gutterBottom component="div"
                        sx={lineStyle}>
                        <span style={textLineStyle}>
                            Cancelación del proceso
                        </span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Fecha:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.fecha_cancelacion}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Motiv:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.motivo_cancelacion}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Oficio:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.oficio_cancelacion}
                    </Typography>
                </Grid>
                <Grid item md={12} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Observaciones:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.observaciones}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Proceso de extradición:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.proceso_extradicion}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Proceso