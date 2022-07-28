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

import callToken from '../../api/callToken'
import callLogin from '../../api/callLogin'

const theme = createTheme()

export default function Login() {
    let auth = useSelector((state) => state.login.login)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [credentials, setCredentials] = React.useState({
        login: '', password: '', token: ''
    })
    const [isTokenCreated, setIsTokenCreated] = React.useState(null)
    const [messageToken, setMessageToken] = React.useState('(No generado)')

    React.useEffect(() => {
        if (auth) {
            navigate('/mandamientos')
            return
        }
    }, [])

    React.useEffect(() => {
        if (isTokenCreated == null) return
        (isTokenCreated.estatus) ? setMessageToken('(Generado)') : setMessageToken('(No se pudo generar)')
    }, [isTokenCreated])

    const handleSubmit = async (event) => {
        event.preventDefault()
        let user = await callLogin(credentials)
        if (user.hasOwnProperty('message')) {
            alert(user.message)
            return
        }
        if (!(Object.keys(user).length == 0)) {
            dispatch({ type: sagaActions.SET_LOGIN_DATA_USER, payload: user })
            dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: true })
            navigate("/mandamientos", { replace: true })
        }
    }

    const generarTokenBack = async (event) => {
        if (credentials.login.trim() == '') return
        if (isTokenCreated == null) {
            let data = await callToken(credentials)
            setIsTokenCreated(data)
            return
        }
        if (isTokenCreated.estatus > 0) return
        let data = await callToken(credentials)
        setIsTokenCreated(data)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        let newValues = { ...credentials, [name]: value }
        setCredentials({ ...newValues })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        paddingLeft: 8,
                        paddingRight: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <img src="http://sircinet.fiscaliaveracruz.gob.mx/CI/public/img/FGE_Favion-300x300.png"
                        alt="Logo" width={150} />
                    <Typography component="h1" variant="h5" sx={{ mt: 0 }}>
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4 }}>
                        <TextField
                            sx={{ mb: 1 }}
                            required
                            fullWidth
                            id="email"
                            label="Usuario | Correo"
                            name="login"
                            autoComplete="email"
                            autoFocus
                            variant="filled"
                            size="small"
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ mb: 1 }}
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            variant="filled"
                            size="small"
                            onClick={generarTokenBack}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ mb: 1 }}
                            required
                            fullWidth
                            name="token"
                            label={`Token ${messageToken}`}
                            type="text"
                            id="token"
                            autoComplete="current-token"
                            variant="filled"
                            size="small"
                            onClick={generarTokenBack}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 2 }}
                            sx={{ mt: 3, mb: 2, backgroundColor: 'peru' }}
                        >
                            Ingresar
                        </Button>
                        <Grid container style={{ textAlign: 'center', display: 'block' }}>
                            <Grid item>
                                <Link href="#" variant="body2" sx={{ color: 'black' }} >
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