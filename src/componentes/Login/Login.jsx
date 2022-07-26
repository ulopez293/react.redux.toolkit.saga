import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../sagaActions'


const theme = createTheme()

export default function Login() {
    let auth = useSelector((state) => state.login.login)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    
    if (auth) return

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: true })
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
        navigate("/mandamientos", { replace: true })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        padding:5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <img src="http://sircinet.fiscaliaveracruz.gob.mx/CI/public/img/FGE_Favion-300x300.png"
                        alt="Logo" width={150} />
                    <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Usuario | Correo"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="token"
                            label="Token"
                            type="text"
                            id="token"
                            autoComplete="current-token"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ingresar
                        </Button>
                        <Grid container style={{textAlign:'center', display:'block'}}>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    ¿Olvidó la contraseña?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}