import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import apiCall from '../../api/apiCall'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function ForgotPassword() {
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let respuesta = await apiCall('POST', 'password-email', 'dugrop' ,{ email: email })
        if (respuesta == null || respuesta == undefined){
            alert("correo no enviado")
            return
        }
        alert(respuesta.estatus)
    }
    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div>
            <Grid container style={{ textAlign: 'center', display: 'block' }}>
                <Grid item>
                    <Box variant="body2" onClick={handleOpen}
                        sx={{ color: 'black', cursor: 'pointer' }} >
                        ¿Olvidó la contraseña?
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" sx={style} onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Restablecer mi contraseña
                    </Typography>
                    <TextField sx={{ mt: 3, mb: 3 }}
                        required
                        fullWidth
                        id="email"
                        label="Correo"
                        name="login"
                        autoComplete="email"
                        autoFocus
                        variant="filled"
                        onChange={handleChange}
                        size="small" />
                    <Button variant="contained" color='info' type="submit">
                        Enviar
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
