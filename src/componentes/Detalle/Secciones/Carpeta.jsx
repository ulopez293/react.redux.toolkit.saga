import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { catalogoSexo } from '../../../mocks/catalogoSexo'

function Carpeta({ mandamiento }) {
    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={12}>
                    <Typography sx={{ mb: 2 }} variant="subtitle2" gutterBottom component="div">
                        <strong>Nombre del Imputado:</strong>
                    </Typography>
                    <Typography sx={{ mb: 2 }} variant="subtitle2" gutterBottom>
                        <strong>CI: </strong> {mandamiento.apaterno} {mandamiento.amaterno} {mandamiento.nombre}
                    </Typography>
                    <Typography sx={{ mb: 2 }} variant="subtitle2" gutterBottom>
                        <strong>PPA: </strong> {mandamiento.imputado_ppa}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Alias:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.alias}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Sexo:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        ({mandamiento.id_sexo}) {catalogoSexo[mandamiento.id_sexo]}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Edad:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.edad}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Estatura:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.estatura}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Peso:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {mandamiento.peso}
                    </Typography>
                </Grid>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Anteojos:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        ({mandamiento.id_uso_anteojos}) {(mandamiento.id_uso_anteojos=='N')?'NO':'SI'}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                <Grid item md={4} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <strong>Nacionalidad:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        ({mandamiento.id_nacionalidad}) {mandamiento.nacionalidad}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Carpeta